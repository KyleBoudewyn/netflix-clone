import React, { useState, useEffect } from 'react';
import './Rows.css';
import axios from './axios';

export default function Rows({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const baseUrl = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div className="row">
      <h2 className="">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                src={`${baseUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie?.name || movie?.title || movie?.original_name}
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                key={movie.id}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
