"use client";
import { useRef, useState } from "react";
import { AREA, INITIAL_TREE, layout, remove, split, type Tree } from "@/lib/dwindle";

const MODULES = ["Camera", "Arm telemetry", "GNSS map", "Task list"];
export default function HmiDemo() {
  const [tree, setTree] = useState<Tree>(INITIAL_TREE);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("Camera selected. Add a module to split this panel.");
  const nextId = useRef(3);
  const canvas = useRef<HTMLDivElement>(null);
  const panes = layout(tree);
  function add(name: string) {
    const pane = { id: nextId.current++, name };
    const bounds = canvas.current?.getBoundingClientRect();
    const area = bounds ? { x: 0, y: 0, width: bounds.width, height: bounds.height } : AREA;
    setTree((current) => split(current, selected, pane, area));
    setSelected(pane.id);
    setMessage(`${name} added and selected. ${panes.length + 1} panels open.`);
  }
  function close(id: number) {
    const next = remove(tree, id);
    if (!next) return;
    setTree(next);
    if (id === selected) setSelected(layout(next)[0].id);
    setMessage(`Panel removed. Its neighbour reclaims the space. ${panes.length - 1} panels open.`);
  }
  return (
    <div>
      <div className="hmi-shell">
        <div className="hmi-toolbar">
          <span className="label mr-auto">DWINDLE / INTERACTIVE STUDY</span>
          <button
            onClick={() => {
              setTree(INITIAL_TREE);
              setSelected(0);
              setMessage("Layout reset. Camera selected.");
            }}
          >
            Reset
          </button>
        </div>
        <div className="hmi-toolbar">
          {MODULES.map((name) => (
            <button key={name} disabled={panes.length >= 6} onClick={() => add(name)}>
              + {name}
            </button>
          ))}
        </div>
        <div ref={canvas} className="hmi-canvas" aria-label="Interactive panel layout">
          {panes.map((pane) => (
            <div
              key={pane.id}
              className="hmi-panel"
              style={{
                left: `${(pane.x / AREA.width) * 100}%`,
                top: `${(pane.y / AREA.height) * 100}%`,
                width: `${(pane.width / AREA.width) * 100}%`,
                height: `${(pane.height / AREA.height) * 100}%`,
              }}
            >
              <div className="hmi-panel-inner" data-selected={selected === pane.id}>
                <div className="hmi-panel-head">
                  <button
                    aria-pressed={selected === pane.id}
                    onClick={() => {
                      setSelected(pane.id);
                      setMessage(`${pane.name} selected. New modules will split this panel.`);
                    }}
                  >
                    {pane.name} <span className="sr-only">panel {pane.id + 1}</span>
                  </button>
                  <button
                    aria-label={`Close ${pane.name} panel ${pane.id + 1}`}
                    disabled={panes.length === 1}
                    onClick={() => close(pane.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="hmi-panel-content">
                  <PanelContent name={pane.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="label mt-3 min-h-9" role="status">
          {message}
        </p>
      </div>
      <p className="label mt-3">
        Browser recreation of the layout algorithm. Sample data, no rover connection. Select a panel
        title, then add a module. Up to six panels.
      </p>
    </div>
  );
}
function PanelContent({ name }: { name: string }) {
  if (name === "Camera")
    return (
      <div className="grain flex min-h-20 flex-col items-center justify-center gap-3 py-4">
        <span className="text-accent text-3xl" aria-hidden>
          ⌖
        </span>
        <span>CAM 01 · SAMPLE VIEW</span>
        <span>1280 × 720</span>
      </div>
    );
  if (name === "Arm telemetry")
    return (
      <div>
        <p>Sample joint positions</p>
        {["J1   +12.4°", "J2   −38.1°", "J3   +64.0°"].map((s) => (
          <div className="border-rule border-b py-1" key={s}>
            {s}
          </div>
        ))}
      </div>
    );
  if (name === "GNSS map")
    return (
      <div className="grain flex min-h-20 items-center justify-center">
        <span>⌖ Sample waypoint</span>
      </div>
    );
  return (
    <div>
      <div>01 / Check cameras</div>
      <div>02 / Inspect arm telemetry</div>
      <div>03 / Set waypoint</div>
    </div>
  );
}
