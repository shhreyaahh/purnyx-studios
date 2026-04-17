"use client";

import MovieCard from "./MovieCard";
import { useRef, useState, useEffect } from "react";

const Movies = () => {
  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeTab, setActiveTab] = useState("movies");

  const movies = [
    { id: 1, title: "MOVIE A", image: "/img1.jpg" },
    { id: 2, title: "MOVIE B", image: "/img2.jpg" },
    { id: 3, title: "MOVIE C", image: "/img3.jpg" },
    { id: 4, title: "MOVIE D", image: "/img4.jpg" },
    { id: 5, title: "MOVIE E", image: "/img5.jpg" },
    { id: 6, title: "MOVIE F", image: "/img6.jpg" },
    { id: 7, title: "MOVIE G", image: "/img7.jpg" },
  ];

  const tvShows = [
    { id: 1, title: "SHOW A", image: "/tv1.jpg" },
    { id: 2, title: "SHOW B", image: "/tv2.jpg" },
    { id: 3, title: "SHOW C", image: "/tv3.jpg" },
    { id: 4, title: "SHOW D", image: "/tv4.jpg" },
  ];

  const dataToShow = activeTab === "movies" ? movies : tvShows;

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
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // reset scroll when switching
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 });
    }
  };

  return (
    <section className="movies">

     <div className="movies-toggle">
  <button
    className={activeTab === "movies" ? "active" : ""}
    onClick={() => handleTabChange("movies")}
  >
    Films
  </button>

  <button
    className={activeTab === "tv" ? "active" : ""}
    onClick={() => handleTabChange("tv")}
  >
    TV Series
  </button>
</div>
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

        {/* MOVIES / TV ROW */}
        <div className="movies-row" ref={scrollRef}>
          {dataToShow.map((movie) => (
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

      {/* LOAD MORE */}
      <div className="load-more">
        <button>LOAD MORE</button>
      </div>

    </section>
  );
};

export default Movies;