const headers = [
  [
    "motor_addressing.h",
    "Motor IDs and physical joints, URDF names, direction signs, and unit conversions.",
  ],
  [
    "motor_config.h",
    "Per-motor PID gains, current limits, and position limits pushed to firmware on startup.",
  ],
  ["moteus_protocol.h", "CAN-FD fields and frame types, unit conventions, and watchdog behaviour."],
  [
    "arm_commands.h",
    "P/V/S command codes and the MotorCommand structure passed from ROS to the CAN loop.",
  ],
  ["arm_telemetry.h", "The MotorTelem state decoded from each motor’s CAN reply during polling."],
];
export default function RoverSupportingWork() {
  return (
    <section id="contributions" className="case-section">
      <p className="label mb-3">03 / SUPPORTING ENGINEERING</p>
      <h2>The systems around those projects</h2>
      <p className="text-text-dim">
        Alongside HMI and RL, I’ve worked across the rover’s controls, embedded systems, and
        software organisation. These pieces connect the operator interface and autonomy work to the
        physical rover.
      </p>
      <div id="inverse-kinematics" className="study-subsection">
        <h3>From IK control to IK-driven task completion</h3>
        <p>
          I extended my arm-control work beyond commanding a pose toward completing tasks driven by
          IK. That includes inverse-Jacobian control, singularity handling, and the handoff from
          individual motions to a task sequence. In the RL project above, that progression becomes
          explicit: an IK-based approach, a learned correction, then a strike that preserves the
          state reached by the arm.
        </p>
      </div>
      <div id="gnss-mapping" className="study-subsection">
        <h3>GNSS mapping and pathing</h3>
        <p>
          I wrote the embedded GNSS mapping and pathing system and connected it to the operator
          workflow. The mission backend records the live track, tags labelled waypoints, tracks
          named route segments, and exports route maps. The HMI provides an embedded offline map and
          mission controls; ROS services manage recording and export underneath it.
        </p>
      </div>
      <details id="the-hardware-interface" className="study-code supporting-detail">
        <summary>The new arm hardware driver and PID tuning</summary>
        <div className="study-prose p-5">
          <p>
            I rewrote the arm hardware interface around a ROS 2 node running the CAN-FD
            communication loop for the Moteus motor controllers. The driver runs at 100 Hz. I also
            worked on PID tuning for the arm and organised the source so joint definitions, firmware
            settings, protocol details, commands, and telemetry have clear homes.
          </p>
          <dl className="space-y-4">
            {headers.map(([file, description]) => (
              <div key={file}>
                <dt>
                  <code>{file}</code>
                </dt>
                <dd className="text-text-dim mt-1 text-sm leading-relaxed">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>
      <details className="study-code supporting-detail">
        <summary>A reliable digital twin</summary>
        <div className="study-prose p-5">
          <p>
            I built the twin around measured arm feedback. It converts decoded axis positions into
            calibrated URDF joint states for RViz and control, so the model follows what the motors
            report. An optional comparison with simulated joint states publishes per-joint error for
            diagnosing discrepancies. Missing motor replies are skipped instead of becoming invented
            positions.
          </p>
        </div>
      </details>
      <details className="study-code supporting-detail">
        <summary>Docker, source organisation, and Morse code</summary>
        <div className="study-prose p-5">
          <p>
            I’ve also worked on Docker containers, source design, control, and repository
            organisation. The RL environments include CPU and GPU setups so development and training
            have defined dependencies. On the task side, I wrote Morse-code work that turns camera
            brightness timing into decoded symbols and messages, with a viewer in the HMI.
          </p>
          <p>
            I also built the team website and helped trace a competition arm failure to a concentric
            error in a high-load motor, contributing to the CAD fix.
          </p>
        </div>
      </details>
    </section>
  );
}
