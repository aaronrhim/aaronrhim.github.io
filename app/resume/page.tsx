import React from "react";

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full gap-8">
      <h1 className="text-4xl text-ink">Resume</h1>
      <div className="w-full h-[800px] border rounded-xl overflow-hidden bg-card">
        <iframe
          src="/resume.pdf"
          width="100%"
          height="100%"
          className="border-none"
          title="Resume"
        ></iframe>
      </div>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-colors"
      >
        Download Resume
      </a>
    </div>
  );
}
