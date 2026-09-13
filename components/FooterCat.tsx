"use client";

import Image from "next/image";
import { useRef } from "react";

export default function FooterCat() {
  const audioRef = useRef<HTMLAudioElement>(null);

  function meow() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Leave the button available to retry if playback is interrupted.
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={meow}
        aria-label="Play a meow"
        className="shrink-0 cursor-pointer rounded-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <Image
          src="/images/footer-cat.png"
          alt=""
          width={80}
          height={80}
          sizes="80px"
          className="h-20 w-20"
        />
      </button>
      <audio ref={audioRef} src="/audio/meow.wav" preload="none" />
    </>
  );
}
