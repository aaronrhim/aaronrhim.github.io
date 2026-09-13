import Image from "next/image";
import HmiTryIt from "./HmiTryIt";
import { HMI_CODE } from "@/lib/hmi-code";

export default function HmiStudy() {
  return (
    <section id="hmi" className="case-section rover-study">
      <h2>1) Human-Machine Interface (HMI)</h2>
      <div className="study-prose">
        <p>
          In my eyes, an HMI is developed as a by-product and culmination of all the projects you’ve
          done down the line. It just so happened that while working on software for the arm —
          developing inverse kinematic controls, analyzing Moteus tview graphs, unplugging and
          re-plugging serial connections, and debugging motors — I happened to want a more intuitive
          interface where telemetry data I commonly view and commands I often send are all
          centralized in one place.
        </p>
        <p>
          This development led me down the “HMI rabbit hole” because I ended up integrating it for
          the other subsystems on our rover. This includes:
        </p>
        <ul>
          <li>Field testing sensor telemetry and motor control.</li>
          <li>Camera viewing.</li>
          <li>Multi-monitor setup.</li>
          <li>Task-oriented UI such as GNSS mapping and a persistent task manager.</li>
        </ul>
      </div>
      <figure className="my-8">
        <video
          controls
          playsInline
          preload="none"
          poster="/images/hmi-debug-poster.jpg"
          className="border-rule w-full rounded-none border"
          aria-label="HMI and robotic arm during bench testing, without audio"
        >
          <source src="/images/hmi-debug.mp4" type="video/mp4" />
          <a href="/images/hmi-debug.mp4">Download the testing video</a>.
        </video>
        <figcaption className="label mt-3">
          Testing and debugging while the arm is being built. Video presented without audio.
        </figcaption>
      </figure>
      <div id="hmi-architecture" className="study-subsection">
        <h3>Making room for the whole team</h3>
        <p>
          The old Glade interface was difficult for the team to extend. I rebuilt the HMI around a
          shared Qt module interface, so a subsystem can add a tool without changing the host. Each
          module implements <code>GuiModule</code>, registers through a <code>plugins.xml</code>{" "}
          descriptor, and is discovered at startup through ROS 2’s pluginlib.
        </p>
        <figure className="my-6">
          <a
            href="/images/hmi-architecture.png"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="System architecture. Open original image at full size."
          >
            <Image
              src="/images/hmi-architecture.png"
              width={1672}
              height={941}
              alt="Rover HMI architecture: ROS 2 topics, Qt host and event loop, and runtime discovery of 28 plugins."
              sizes="(max-width: 760px) 95vw, 834px"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="label mt-3">
            System architecture. Click to view full size.
          </figcaption>
        </figure>
        <p>
          Keeping ROS callbacks inside the Qt event loop lets modules update their widgets on the
          GUI thread. The module contract also includes keybindings, visibility, and save/restore
          hooks. Layout persistence therefore includes the state of the tools inside the panels, not
          just their positions. I added GitHub Actions checks around the core UI so the shared
          foundation can keep evolving as other people contribute.
        </p>
      </div>
      <HmiTryIt />
      <div id="panel-layout" className="study-subsection">
        <h3>Dwindle: a workspace that rearranges itself</h3>
        <p>
          I borrowed the dwindle idea from Hyprland. The layout is a binary tree: widgets live at
          the leaves, and each internal node describes a split. Adding a tool, resizing the
          workspace, and closing a panel all become operations on that tree.
        </p>
        <figure className="my-6">
          <a
            href="/images/hmi-dwindle.png"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dwindle algorithm. Open original image at full size."
          >
            <Image
              src="/images/hmi-dwindle.png"
              width={1672}
              height={941}
              alt="Dwindle panel layout alongside the binary space partition tree that defines its splits."
              sizes="(max-width: 760px) 95vw, 834px"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="label mt-3">
            Dwindle algorithm. Click to view full size.
          </figcaption>
        </figure>
        <h4>1. Split</h4>
        <p>
          Adding a panel replaces the target leaf with an internal node holding the old and new
          leaves. If no target is supplied, the implementation walks to the leftmost leaf. The line
          that makes this “dwindle” is the orientation choice: <code>height ≥ width</code> means
          top/bottom; otherwise the children go left/right. Cutting the longer dimension helps panes
          stay close to square as the tree deepens.
        </p>
        <CodeExcerpt title="Split implementation · dwindle_tree.cpp" code={HMI_CODE.split} />
        <h4>2. Geometry</h4>
        <p>
          The root receives the available rectangle. A recursive descent calculates a rectangle for
          each child and eventually assigns geometry to its widget. The default split ratio is 1, so
          multiplying the extent by <code>splitRatio / 2</code> gives a 50/50 split. The second
          child receives the remaining pixels, and the gap is applied at each leaf.
        </p>
        <CodeExcerpt title="Recursive geometry · dwindle_tree.cpp" code={HMI_CODE.geometry} />
        <p>
          The <code>max(min())</code> comment is worth keeping: <code>std::clamp</code> has
          undefined behaviour when its lower bound exceeds its upper bound. That happens here when a
          box shrinks below twice the minimum pane size. The nested operations avoid that invalid
          call; the UI still needs to handle cases where the available space cannot accommodate both
          minimum sizes.
        </p>
        <h4>3. Collapse</h4>
        <p>
          Removing a panel deletes the leaf and its parent. The sibling takes the parent’s slot in
          the tree and inherits its box, reclaiming the space from the panel that closed. The same
          operation works at the root and deeper in the tree.
        </p>
        <CodeExcerpt title="Sibling promotion · dwindle_tree.cpp" code={HMI_CODE.collapse} />
      </div>
      <div id="hmi-equations" className="study-subsection">
        <h3>The equations behind the layout</h3>
        <p>
          With parent width <code>w</code>, height <code>h</code>, ratio <code>r</code>, and minimum
          extent <code>m</code>, the same few equations describe splitting and resizing. The
          aspect-ratio bound applies to ideal equal splits once a pane enters the stated band;
          integer rounding, minimum sizes, and manual resizing need separate treatment.
        </p>
        <figure className="my-6">
          <a
            href="/images/hmi-equations.png"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Summary of equations. Open original image at full size."
          >
            <Image
              src="/images/hmi-equations.png"
              width={1200}
              height={881}
              alt="Original equation summary covering split geometry, leaf areas, smart splits, aspect ratios, and keyboard and mouse resizing."
              sizes="(max-width: 760px) 95vw, 834px"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="label mt-3">
            Summary of equations. Click to view full size.
          </figcaption>
        </figure>
      </div>
      <figure className="my-6">
        <a
          href="/images/hmi-competition.png"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="HMI being used at competition. Open original image at full size."
        >
          <Image
            src="/images/hmi-competition.png"
            width={2048}
            height={1535}
            alt="The HMI running on the rover operator station at competition, with a laptop, three-monitor suitcase, and controllers."
            sizes="(max-width: 760px) 95vw, 834px"
            className="h-auto w-full"
          />
        </a>
        <figcaption className="label mt-3">
          HMI being used at competition. Click to view full size.
        </figcaption>
      </figure>
      <div id="next-steps" className="study-subsection">
        <h3>Where I want to take the HMI next</h3>
        <p>
          My original roadmap included power-distribution and lighting telemetry over CAN, more
          science sensor telemetry and a visual roadmap, digital-twin reliability, visually
          intuitive inverse kinematic control, SLAM operator visualisation, and better BSP-based
          panel management.
        </p>
        <p>
          Since that draft, I’ve built a reliable telemetry-driven digital twin and progressed from
          IK control to IK-driven task completion. Those are part of the supporting systems below.
          The remaining HMI work is about bringing more of those capabilities into a clear operator
          workflow and continuing to improve panel management.
        </p>
      </div>
    </section>
  );
}
function CodeExcerpt({ title, code }: { title: string; code: string }) {
  return (
    <details className="study-code">
      <summary>{title}</summary>
      <pre>
        <code>{code}</code>
      </pre>
    </details>
  );
}
