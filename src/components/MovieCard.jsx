"use client";
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-img">
        <img src={movie.image} alt={movie.title} />
      </div>

      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;