
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

const MovieSearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const movieId = data.results[0].id;

          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
          const movieData = await movieResponse.json();
          setMovie(movieData);

          const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
          const creditsData = await creditsResponse.json();
          setCredits(creditsData);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (query) {
      fetchMovie();
    }
  }, [query]);

  if (!movie) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="bg-gray-800 text-white font-sans min-h-screen p-6">
      <div className="flex flex-col md:flex-row bg-gray-700 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row bg-gray-700 p-6 rounded-lg">
  <div className="md:w-2/3">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          className="w-full h-auto"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="md:w-2/3 md:pl-6 flex flex-col justify-center">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="mt-2 bg-gray-600 text-gray-150 px-2 py-1 rounded inline-block">Rating: {movie.vote_average}</p>
        <p className="mt-2 bg-gray-600 text-gray-150 px-2 py-1 rounded inline-block">Runtime: {movie.runtime} minutes</p>
        <p className="mt-2">Genre: {movie.genres.map((genre) => genre.name).join(', ')}</p>
        <p className="mt-2">Release Date: {movie.release_date}</p>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-2xl font-bold">Overview</h3>
      <p className="mt-2">{movie.overview}</p>
    </div>
  </div>
  
</div>


  <div
    className="w-full h-auto"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}
  />
</div>

      
      <div className="bg-gray-700 p-6 mt-6 rounded-lg">
        <h2 className="text-3xl font-bold">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-4">
          {credits && credits.cast.map((actor) => (
            <div key={actor.cast_id} className="text-center">
              <img
                className="w-full h-auto rounded-lg"
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p className="mt-2 font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-400">as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearchResults;
