 "use client";
import { useState, useEffect } from "react";

const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // synced with animation

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={i === index ? "active" : ""}
          alt="hero"
        />
      ))}

      <button className="hero-btn left" onClick={() => setIndex((index - 1 + images.length) % images.length)}>
  ‹
</button>

<button className="hero-btn right" onClick={() => setIndex((index + 1) % images.length)}>
  ›
</button>

      <div className="hero-content hero-content--button-only">
        {/* <h1>Movie Title</h1>
        <p>Short description goes here</p> */}
        <button>Watch on App</button>
      </div>

      <div className="hero-curve">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path
      d="M0,0 C480,40 960,40 1440,0 L1440,120 L0,120 Z"
      fill="#0b0f1a"
    />
  </svg>
</div>

    </section>
  );
};

export default Hero;

