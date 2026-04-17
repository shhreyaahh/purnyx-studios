"use client";

import { useEffect, useRef, useState } from "react";

export default function Featured() {
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // ✅ MOVIES DATA
  
    const movies = [
  {
    id: 1,
    title: "Movie 1",
    image: "/image1.jpg",
    trailer: "/trailer1.mp4",
    genres: ["Action", "Drama", "Horror"],
    imdb: "#",
    photos: ["/p1.jpg", "/p3.jpg", "/p5.jpg", "/p7.jpg"]
  },
  {
    id: 2,
    title: "Movie 2",
    image: "/image2.jpg",
    trailer: "/trailer2.mp4",
    genres: ["Horror", "Thriller", "Romance"],
    imdb: "#",
    photos: ["/p2.jpg", "/p4.jpg", "/p6.jpg", "/p8.jpg"]
  },
  {
    id: 3,
    title: "Movie 3",
    image: "/image3.jpg",
    trailer: "/trailer3.mp4",
    genres: ["Comedy", "Romance", "Adventure"],
    imdb: "#",
    photos: ["/p1.jpg", "/p2.jpg", "/p3.jpg", "/p4.jpg"]
  },
  {
    id: 4,
    title: "Movie 4",
    image: "/image4.jpg",
    trailer: "/trailer4.mp4",
    genres: ["Sci-Fi", "Action", "Adventure"],
    imdb: "#",
    photos: ["/p5.jpg", "/p6.jpg", "/p7.jpg", "/p8.jpg"]
  }
];

  const [activeMovie, setActiveMovie] = useState(movies[0]);

  // ✅ RANDOM PHOTOS (4 out of 8)
  const allPhotos = [
    "/p1.jpg", "/p2.jpg", "/p3.jpg", "/p4.jpg",
    "/p5.jpg", "/p6.jpg", "/p7.jpg", "/p8.jpg"
  ];



  // ✅ SCROLL LOGIC
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

  // ✅ VIDEO CONTROL
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

  // ✅ ANIMATION VALUES
  const fullscreenPeakAt = 0.38;
  const fullscreenLeaveAt = 0.78;

  let morphProgress = 0;

  if (progress <= fullscreenPeakAt) {
    morphProgress = progress / fullscreenPeakAt;
  } else if (progress <= fullscreenLeaveAt) {
    morphProgress =
      1 - (progress - fullscreenPeakAt) /
      (fullscreenLeaveAt - fullscreenPeakAt);
  }

  const clampedMorph = Math.min(Math.max(morphProgress, 0), 1);
  const easedProgress = 1 - Math.pow(1 - clampedMorph, 3);

  // ✅ SMALLER TV (better proportion)
  const startWidth = viewport.width
    ? Math.min(700, viewport.width * 0.85)
    : 700;

  const startHeight = startWidth * (9 / 16);

  const fullscreenScale =
    viewport.width && viewport.height
      ? Math.max(
          viewport.width / startWidth,
          viewport.height / startHeight
        )
      : 1;

  const frameScale = 1 + (fullscreenScale - 1) * easedProgress;
  const frameBorder = 12 * (1 - easedProgress);
  const posterOpacity = Math.max(1 - easedProgress * 2.8, 0);
  const videoOpacity = Math.min(
    Math.max((easedProgress - 0.12) / 0.22, 0),
    1
  );
  const frameGlow = 1 - easedProgress;

  return (
<section className="featured-section fixes-section">

      {/* TEXT */}
      <div className="featured-text">
        <p className="small">New Release</p>
        <h2>{activeMovie.title}</h2>
        <p className="sub">Subheading</p>

        <div className="genres">
          {activeMovie.genres.map((g, i) => (
            <span key={i}>{g}</span>
          ))}
        </div>
      </div>

      {/* TV */}
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
              boxShadow: `0 ${20 + frameGlow * 45}px ${35 + frameGlow * 85}px rgba(0,0,0,${
                0.18 + frameGlow * 0.22
              })`,
            }}
          >
            <div className="tv-screen-frame" style={{ opacity: 1 - easedProgress }} />
            <div className="tv-bezel" style={{ opacity: frameGlow }} />

            <img
              src={activeMovie.image}
              alt="Poster"
              className="poster"
              style={{ opacity: posterOpacity }}
            />

            <video
              ref={videoRef}
              src={activeMovie.trailer}
              muted
              loop
              autoPlay
              playsInline
              className="video"
              style={{ opacity: videoOpacity }}
            />
          </div>

          <div className="tv-stand" style={{ opacity: 1 - easedProgress }} />
        </div>
      </div>

      {/* SMALL CARDS */}
      <div className="small-cards">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`small-card ${
              activeMovie.id === movie.id ? "active" : ""
            }`}
            onMouseEnter={() => setActiveMovie(movie)}
          >
            <img src={movie.image} alt={movie.title} />
          </div>
        ))}
      </div>

      {/* PHOTOS */}
      <div className="photos-header">
        <h3>| Photos</h3>
        <a href={activeMovie.imdb} target="_blank">
          <button className="imdb-btn">IMDb</button>
        </a>
      </div>


      <div className="photos-grid">
        <img src={activeMovie.photos[0]} alt="" />
        <img src={activeMovie.photos[1]} alt="" />
        <img src={activeMovie.photos[2]} alt="" />
        <img src={activeMovie.photos[3]} alt="" />
      </div>


    </section>
  );
}