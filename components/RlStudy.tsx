import Gallery from "./Gallery";
const steps = [
  ["Behaviour cloning", "10 / 435", "2.3%", "Imitate recorded IK demonstrations."],
  ["DAgger, all keys", "200 / 435", "46.0%", "Label states the policy actually visits."],
  [
    "DAgger + workspace tuning",
    "268 / 435",
    "61.6%",
    "Reposition the keyboard within the arm’s dexterous workspace.",
  ],
  [
    "Residual RL on IK",
    "428 / 435",
    "98.4%",
    "Learn bounded corrections with a success-aligned reward.",
  ],
];
export default function RlStudy() {
  return (
    <section id="reinforcement-learning" className="case-section rover-study">
      <h2>2) Reinforcement Learning (RL)</h2>
      <div className="study-prose">
        <p>
          A proper engineering design team (EDT) is driven by an ensemble of self-motivated
          students. I did not join UBC Rover because I had prior experience — nor did I join UBC
          Rover because I was very enthusiastic (although some say otherwise). I joined the team
          because of the software opportunities UBC Rover offers — most particularly, autonomy. In
          previous years, one of our members wrote IK-driven controls. I wanted to explore
          reinforcement learning as a possible R&D project for the team.
        </p>
        <p>
          The task I chose was keyboard typing with our custom 6-DOF arm. It gave the work a
          concrete objective: move the end effector over a particular key and complete a press. I
          own the RL project, from the simulation environment through the learning pipeline and
          evaluation.
        </p>
      </div>
      <figure className="my-8">
        <video
          controls
          playsInline
          preload="none"
          poster="/images/rl-typing-poster.jpg"
          className="border-rule bg-bg-raised max-h-[600px] w-full rounded-none border object-contain"
          aria-label="RL agent typing on a keyboard in simulation"
        >
          <source src="/images/rover4.mp4" type="video/mp4" />
          <a href="/images/rover4.mp4">Download the typing video</a>.
        </video>
        <figcaption className="label mt-3">
          RL agent typing on a keyboard in simulation. The recording selected in my portfolio draft.
        </figcaption>
      </figure>
      <div id="rl-simulation" className="study-subsection">
        <h3>First, build an arm the simulator understands</h3>
        <p>
          I started by porting the custom manipulator into MJCF for MuJoCo. That meant modelling
          visual and collision geometry, the kinematic chain, and actuators that did not have a
          one-to-one simulation equivalent. I was learning the stack while building the model, so
          the first experiment was a basic Soft Actor-Critic agent on a reach-and-lift task.
        </p>
        <p>
          That smaller task let me work through environment configuration, reward shaping, and the
          simulator’s failure modes before tackling the keyboard. The early work developed into a
          task pipeline in RoboSuite with explicit stages and success conditions.
        </p>
        <div className="my-6">
          <Gallery
            images={[
              {
                src: "/images/rover1.png",
                alt: "Early MuJoCo arm environment beside the training notebook",
              },
              {
                src: "/images/rover6.png",
                alt: "Early SAC training reward curve; this is training history, not the later keyboard success evaluation",
              },
            ]}
          />
        </div>
      </div>
      <div id="rl-learning" className="study-subsection">
        <h3>Learning from the states the arm actually reaches</h3>
        <p>
          In the later keyboard pipeline, behaviour cloning learned from demonstrations produced by
          a hand-coded IK expert. The problem was what happened once the learned policy made a small
          mistake: it reached states outside its training examples, then had to choose the next
          action from there. Good imitation on the demonstration data did not translate into good
          task completion.
        </p>
        <p>
          I used DAgger to collect states visited by the policy and label them with the expert’s
          action. That moved the all-key Approach result from 10/435 to 200/435 in the recorded run
          ledger. It addressed the distribution shift, but the remaining failures needed a different
          diagnosis.
        </p>
        <h4>A workspace problem hidden inside a learning problem</h4>
        <p>
          Some keys looked unreachable until I tested the keyboard’s position relative to the arm.
          Repositioning it brought more of the board into the dexterous workspace. With the keyboard
          offset tuned to (−0.10, −0.10), the DAgger result reached 268/435. The lesson was to
          inspect the physical setup before deciding another learning algorithm was needed.
        </p>
      </div>
      <div id="rl-residual" className="study-subsection">
        <h3>Let IK handle the motion; learn the correction</h3>
        <p>
          Imitation was still limited by the quality of the IK expert. From-scratch exploration also
          struggled: the action noise could move the end effector outside the roughly 4 mm success
          region. I changed the problem to learning a small correction around the live IK action.
        </p>
        <div className="study-formula">
          <code>a = clip(a_IK + 0.15 · residual, −1, 1)</code>
          <p className="label mt-3">
            Applied to the six joint actions in the Approach stage; the solenoid remains retracted.
          </p>
        </div>
        <p>
          The residual is bounded, and the actor head is zero-initialised so training starts near
          the IK baseline. The IK controller handles gross motion while the learned part refines the
          positioning. This also gives the pipeline a path toward hardware testing because the
          underlying control is already tied to the arm.
        </p>
        <h4>When a better reward curve meant a worse policy</h4>
        <p>
          The first residual run increased its dense reward while completing only 32/435 Approach
          trials. The policy had found a pose that collected reward without satisfying the task. I
          changed to a success-dominant reward, retaining collision and time penalties and weak
          potential-based shaping. The recorded final-checkpoint Approach evaluation then reached
          428/435.
        </p>
        <div className="overflow-x-auto">
          <table className="study-table">
            <caption>Approach-only evaluations · 87 keys × 5 trials · MuJoCo</caption>
            <thead>
              <tr>
                <th scope="col">Iteration</th>
                <th scope="col">Completion</th>
                <th scope="col">What changed</th>
              </tr>
            </thead>
            <tbody>
              {steps.map(([name, count, rate, why]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td className="whitespace-nowrap">
                    {count}
                    <span>{rate}</span>
                  </td>
                  <td>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="label mt-3">
          Recorded runs from LearnFlake’s engineering log, §38.3. These are successive development
          configurations, not a controlled single-variable benchmark.
        </p>
      </div>
      <div id="rl-task-completion" className="study-subsection">
        <h3>From reaching the key to completing the task</h3>
        <p>
          Approach success alone was not keyboard typing. I needed to hand the state reached by
          Approach directly to Strike. An earlier evaluator reset the environment between stages,
          discarding the positioning. The corrected chain switches the action mask in the same
          environment, holds the arm, bypasses the IK residual during Strike, and extends the
          solenoid.
        </p>
        <p>
          The contact-success thresholds also needed attention. I changed the simulated force
          threshold from 2.0 N to 0.6 N and the velocity threshold from 0.005 m/s to 0.02 m/s. With
          those conditions, an open-loop solenoid extension was sufficient for the recorded
          evaluation; Strike did not need a separate learned policy.
        </p>
        <div className="rl-result">
          <strong>429 / 435</strong>
          <div>
            <p>Successful Approach → Strike trials</p>
            <p className="label">98.6% · 87 keys, five trials per key · simulation only</p>
          </div>
        </div>
        <p>
          In that full-chain evaluation, 84 of 87 keys succeeded in all five trials, and 86 met the
          80% threshold. Each trial starts from home; there is no reset between Approach and Strike.
          This result does not measure continuous key-to-key typing or real-hardware performance.
        </p>
        <p>
          The next boundary is sim-to-real validation with the physical keyboard and arm. The
          bounded residual, action smoothing, and IK base make that a concrete engineering next
          step, but the simulation result is not evidence that the hardware task is already solved.
        </p>
        <p className="mt-5 text-sm">
          <a
            href="https://github.com/UBC-Snowbots/LearnFlake/blob/main/TRACKER.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Engineering log ↗
          </a>
          <span className="mx-4" aria-hidden>
            ·
          </span>
          <a
            href="https://github.com/UBC-Snowbots/LearnFlake/blob/main/results/m4_fullchain_v16b.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Per-key evaluation ↗
          </a>
        </p>
      </div>
    </section>
  );
}
