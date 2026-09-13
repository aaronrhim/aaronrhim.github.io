import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../lib/dwindle.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { layout, split, remove, INITIAL_TREE } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

function verifyCoverage(tree, area) {
  const panes = layout(tree, area);
  assert.equal(new Set(panes.map((p) => p.id)).size, panes.length);
  assert.equal(
    panes.reduce((sum, p) => sum + p.width * p.height, 0),
    area.width * area.height
  );
  for (const p of panes) {
    assert.ok(p.width > 0 && p.height > 0);
    assert.ok(p.x >= area.x && p.y >= area.y);
    assert.ok(p.x + p.width <= area.x + area.width);
    assert.ok(p.y + p.height <= area.y + area.height);
    for (const q of panes) {
      if (p.id === q.id) continue;
      const overlapX = Math.min(p.x + p.width, q.x + q.width) - Math.max(p.x, q.x);
      const overlapY = Math.min(p.y + p.height, q.y + q.height) - Math.max(p.y, q.y);
      assert.ok(overlapX <= 0 || overlapY <= 0, "panels must not overlap");
    }
  }
}

test("splitting a panel and closing the new child restores the original layout", () => {
  for (const pane of layout(INITIAL_TREE)) {
    const changed = split(INITIAL_TREE, pane.id, { id: 9, name: "New module" });
    assert.equal(layout(changed).length, 4);
    assert.deepEqual(remove(changed, 9), INITIAL_TREE);
  }
});

test("closing either sibling reclaims the full parent rectangle", () => {
  const original = { id: 0, name: "Camera" };
  const changed = split(original, 0, { id: 1, name: "Map" });
  assert.deepEqual(remove(changed, 1), original);
  assert.deepEqual(remove(changed, 0), { id: 1, name: "Map" });
  assert.equal(remove(original, 0), null);
});

test("long-axis splitting uses the actual viewport dimensions", () => {
  const pane = { id: 0, name: "Camera" };
  const next = { id: 1, name: "Map" };
  assert.equal(split(pane, 0, next, { x: 0, y: 0, width: 800, height: 320 }).axis, "x");
  assert.equal(split(pane, 0, next, { x: 0, y: 0, width: 160, height: 320 }).axis, "y");
});

test("repeated additions and removals preserve coverage on phone and desktop", () => {
  for (const area of [
    { x: 0, y: 0, width: 320, height: 320 },
    { x: 0, y: 0, width: 800, height: 340 },
  ]) {
    let tree = INITIAL_TREE;
    let id = 3;
    for (let step = 0; step < 80; step++) {
      const panes = layout(tree);
      if (panes.length < 6)
        tree = split(tree, panes[step % panes.length].id, { id: id++, name: "Module" }, area);
      else tree = remove(tree, panes[step % panes.length].id);
      verifyCoverage(tree, area);
    }
  }
});
