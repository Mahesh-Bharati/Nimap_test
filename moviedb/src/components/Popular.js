import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Popular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1');
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching the movies: ", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
        {movies.map(movie => (
          <div key={movie.id} className="flex flex-col items-center text-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-4 max-w-xs"
            />
            <h2 className="text-white text-lg font-bold">{movie.title}</h2>
            <p className="text-gray-400">Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
