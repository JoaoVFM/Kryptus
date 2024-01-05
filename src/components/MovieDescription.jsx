import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import Loading from "../components/Loading";

import Image1 from "../images/1.jpg";
import Image2 from "../images/2.jpg";
import Image3 from "../images/3.jpg";
import Image4 from "../images/4.jpg";
import Image5 from "../images/5.jpg";
import Image6 from "../images/6.jpg";

const MovieDescription = ({ movie, showLink = true }) => {
  const filmImages = useMemo(
    () => [null, Image1, Image2, Image3, Image4, Image5, Image6],
    []
  );

  const imageUrl = filmImages[movie.episode_id];

  return (
    <div className="movie-desc">
      {imageUrl ? <img src={imageUrl} alt={movie.title} /> : <Loading />}
      <h2>{movie.title}</h2>
      {showLink && (
        <Link
          to={`/movie/${movie.url.match(/\d+/)[0]}`}
          className="details-link"
        >
          Detalhes
        </Link>
      )}
    </div>
  );
};

export default MovieDescription;
