"use client";

import MovieCard from "./MovieCard";
import { useRef, useState, useEffect } from "react";

const Movies = () => {
  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const movies = [
    { id: 1, title: "MOVIE A", image: "/img1.jpg" },
    { id: 2, title: "MOVIE B", image: "/img2.jpg" },
    { id: 3, title: "MOVIE C", image: "/img3.jpg" },
    { id: 4, title: "MOVIE D", image: "/img4.jpg" },
    { id: 5, title: "MOVIE E", image: "/img5.jpg" },
    { id: 6, title: "MOVIE F", image: "/img6.jpg" },
    { id: 7, title: "MOVIE G", image: "/img7.jpg" },
  ];

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <section className="movies">
      <h2 className="featured-heading">MOVIES</h2>

      <div className="movies-container">

        {/* LEFT BUTTON */}
        {showLeft && (
          <button
            className="scroll-btn left"
            onClick={() =>
              scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            ‹
          </button>
        )}

        {/* MOVIES ROW */}
        <div className="movies-row" ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* RIGHT BUTTON */}
        {showRight && (
          <button
            className="scroll-btn right"
            onClick={() =>
              scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            ›
          </button>
        )}

      </div>
    </section>
  );
};

export default Movies;