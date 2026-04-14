"use client";

import { useEffect, useRef, useState } from "react";

export default function Featured() {
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateProgress = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollable = Math.max(rect.height - window.innerHeight, 1);
      const nextProgress = Math.min(
        Math.max(-rect.top / totalScrollable, 0),
        1
      );

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.001 ? nextProgress : current
      );
    };

    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = null;
      });
    };

    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      updateProgress();
    };

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoWindowStart = 0.2;
    const videoWindowEnd = 0.72;

    if (progress >= videoWindowStart && progress <= videoWindowEnd) {
      videoRef.current.play().catch(() => {});
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }, [progress]);

  const fullscreenPeakAt = 0.38;
  const fullscreenLeaveAt = 0.78;

  let morphProgress = 0;

  if (progress <= fullscreenPeakAt) {
    morphProgress = progress / fullscreenPeakAt;
  } else if (progress <= fullscreenLeaveAt) {
    morphProgress =
      1 - (progress - fullscreenPeakAt) / (fullscreenLeaveAt - fullscreenPeakAt);
  }

  const clampedMorph = Math.min(Math.max(morphProgress, 0), 1);
  const easedProgress = 1 - Math.pow(1 - clampedMorph, 3);
  const startWidth = viewport.width ? Math.min(800, viewport.width * 0.9) : 800;
  const startHeight = startWidth * (9 / 16);
  const fullscreenScale =
    viewport.width && viewport.height
      ? Math.max(viewport.width / startWidth, viewport.height / startHeight)
      : 1;
  const frameScale = 1 + (fullscreenScale - 1) * easedProgress;
  const frameBorder = 12 * (1 - easedProgress);
  const posterOpacity = Math.max(1 - easedProgress * 2.8, 0);
  const videoOpacity = Math.min(Math.max((easedProgress - 0.12) / 0.22, 0), 1);
  const frameGlow = 1 - easedProgress;

  return (
    <section className="featured-section">
      <div className="featured-text">
        <h1>Experience Cinema Like Never Before</h1>
        <p>Immersive visuals. Powerful sound. Pure entertainment.</p>
      </div>

      <div ref={trackRef} className="featured-track">
        <div className="featured-pin">
          <div
            className="tv tv-scroll"
            style={{
              width: `${startWidth}px`,
              height: `${startHeight}px`,
              transform: `scale(${frameScale})`,
              borderRadius: "0",
              borderWidth: `${frameBorder}px`,
              boxShadow: `0 ${20 + frameGlow * 45}px ${35 + frameGlow * 85}px rgba(0, 0, 0, ${
                0.18 + frameGlow * 0.22
              })`,
            }}
          >
            <div className="tv-screen-frame" style={{ opacity: 1 - easedProgress }} />
            <div
              className="tv-bezel"
              style={{
                opacity: frameGlow,
              }}
            />

            <img
              src="/image1.jpg"
              alt="Poster"
              className="poster"
              style={{ opacity: posterOpacity }}
            />

            <video
              ref={videoRef}
              src="/trailer.mp4"
              muted
              loop
              playsInline
              className="video"
              style={{ opacity: videoOpacity }}
            />
          </div>
          <div className="tv-stand" style={{ opacity: 1 - easedProgress }} />
        </div>
      </div>
    </section>
  );
}
