"use client";

import { useState } from "react";

const hostedSession = process.env.NEXT_PUBLIC_HMI_DEMO_URL;
const localSession = "http://localhost:6080/vnc.html?autoconnect=true&resize=scale";

export default function HmiTryIt() {
  const [open, setOpen] = useState(false);

  return (
    <div id="hmi-try-it" className="study-subsection">
      <h3>Try the HMI</h3>
      {!hostedSession && !open && (
        <p>
          Start the local session with <code>npm run hmi</code>, then connect below.
        </p>
      )}
      <div className="my-5 flex flex-wrap items-center gap-5">
        <button className="button-primary" type="button" onClick={() => setOpen(!open)}>
          {open ? "Close session" : hostedSession ? "Open HMI" : "Connect local HMI"}
        </button>
        {open && (
          <a href={hostedSession || localSession} target="_blank" rel="noopener noreferrer">
            Open in a new tab ↗
          </a>
        )}
      </div>
      {open && (
        <iframe
          src={hostedSession || localSession}
          title="Rover HMI — native ROS 2 application"
          className="hmi-session"
          allow="fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
}
