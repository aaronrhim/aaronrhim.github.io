export type Pane = { id: number; name: string };
export type Tree = Pane | { axis: "x" | "y"; first: Tree; second: Tree };
export type Box = { x: number; y: number; width: number; height: number };
export const AREA: Box = { x: 0, y: 0, width: 1000, height: 600 };
export function layout(tree: Tree, box: Box = AREA): (Pane & Box)[] {
  if ("id" in tree) return [{ ...tree, ...box }];
  const horizontal = tree.axis === "x";
  const first = {
    ...box,
    width: horizontal ? box.width / 2 : box.width,
    height: horizontal ? box.height : box.height / 2,
  };
  const second = {
    ...first,
    x: box.x + (horizontal ? first.width : 0),
    y: box.y + (horizontal ? 0 : first.height),
  };
  return [...layout(tree.first, first), ...layout(tree.second, second)];
}
export function split(tree: Tree, target: number, pane: Pane, box: Box = AREA): Tree {
  if ("id" in tree)
    return tree.id === target
      ? { axis: box.height >= box.width ? "y" : "x", first: tree, second: pane }
      : tree;
  const horizontal = tree.axis === "x";
  const first = {
    ...box,
    width: horizontal ? box.width / 2 : box.width,
    height: horizontal ? box.height : box.height / 2,
  };
  const second = {
    ...first,
    x: box.x + (horizontal ? first.width : 0),
    y: box.y + (horizontal ? 0 : first.height),
  };
  return {
    ...tree,
    first: split(tree.first, target, pane, first),
    second: split(tree.second, target, pane, second),
  };
}
export function remove(tree: Tree, id: number): Tree | null {
  if ("id" in tree) return tree.id === id ? null : tree;
  const first = remove(tree.first, id);
  const second = remove(tree.second, id);
  return first && second ? { ...tree, first, second } : (first ?? second);
}
export const INITIAL_TREE: Tree = {
  axis: "x",
  first: { id: 0, name: "Camera" },
  second: {
    axis: "y",
    first: { id: 1, name: "Arm telemetry" },
    second: { id: 2, name: "Task list" },
  },
};
