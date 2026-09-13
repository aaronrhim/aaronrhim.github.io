import HmiDemo from "./HmiDemo";
export default function HmiStudy() {
  return (
    <>
      <section id="hmi" className="case-section">
        <p className="label mb-3">01 / HUMAN–MACHINE INTERFACE</p>
        <h2>An interface that grew out of debugging</h2>
        <p className="text-text-dim">
          In my eyes, an HMI is a by-product of all the projects you’ve done along the way. While
          working on the arm, I kept switching between inverse kinematic controls, Moteus tview
          graphs, serial connections, and motor debugging. I wanted the telemetry I commonly viewed
          and the commands I often sent in one place.
        </p>
        <p className="text-text-dim">
          That led me down the “HMI rabbit hole.” What started with the arm became an interface for
          the other rover subsystems too: sensor telemetry and motor control for field testing,
          camera views, multiple monitors, GNSS mapping, and a persistent task manager.
        </p>
        <figure className="mt-7">
          <video
            controls
            playsInline
            preload="none"
            poster="/images/hmi-debug-poster.jpg"
            className="border-rule w-full rounded-sm border"
            aria-label="Silent footage of HMI testing and debugging while the arm is being built"
          >
            <source src="/images/hmi-debug.mp4" type="video/mp4" />
            Your browser does not support this video.{" "}
            <a href="/images/hmi-debug.mp4">Download the recording</a>.
          </video>
          <figcaption className="label mt-3">
            Testing and debugging while the arm is being built. Field-of-view recording, presented
            without audio.
          </figcaption>
        </figure>
      </section>
      <section id="panel-layout" className="case-section">
        <h2>A dashboard that makes room</h2>
        <p className="text-text-dim">
          The interface is built in Qt with selectable modules. I borrowed the dwindle idea from
          Hyprland: instead of giving every tool a fixed place, adding a module splits an existing
          panel. The layout is represented as a binary tree, with widgets at the leaves and splits
          at the internal nodes.
        </p>
        <div className="mt-6">
          <HmiDemo />
        </div>
        <div className="pipeline">
          <div>
            <strong>1. Split</strong>
            <span>
              Replace a leaf with two children. Split top/bottom when height ≥ width; otherwise
              split left/right.
            </span>
          </div>
          <div>
            <strong>2. Place</strong>
            <span>
              Walk the tree recursively, passing each child its share of the parent’s rectangle.
            </span>
          </div>
          <div>
            <strong>3. Reclaim</strong>
            <span>
              When a panel closes, its sibling takes the parent’s place and inherits the available
              area.
            </span>
          </div>
        </div>
        <p className="text-text-dim">
          The split direction follows the longer dimension, which helps avoid narrow panes. In the
          Qt implementation, the split ratio also controls how much space each child receives.
          Minimum pane sizes need care when the available space gets small; a layout heuristic alone
          cannot guarantee every module will fit.
        </p>
        <details className="border-rule mt-6 rounded-sm border p-4">
          <summary className="text-sm cursor-pointer">A detail from the C++ implementation</summary>
          <div className="mt-4 space-y-4">
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{`// Choose the split direction from the target panel.\nnewParent->splitTop =\n    (target->box.height() >= target->box.width());\n\n// Calculate the first child's width.\nint w0 = (int)(n->box.width() / 2.0f * n->splitRatio);\nw0 = std::max(min_pane_w_,\n    std::min(w0, n->box.width() - min_pane_w_));`}</code>
            </pre>
            <p className="text-text-dim">
              The nested <code>max/min</code> is deliberate. When a box becomes smaller than twice
              the minimum pane width, the lower and upper bounds cross. Passing those bounds to{" "}
              <code>std::clamp</code> would be invalid. The guard avoids that operation, though very
              small windows still need a layout policy for overflow.
            </p>
          </div>
        </details>
      </section>
    </>
  );
}
