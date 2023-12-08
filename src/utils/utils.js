import { shortMovieDuration } from "./constants";

function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    );
  })
  return moviesQuery
};

function filterMovieDuration(movies) {
  return movies.filter((movie) => movie.duration < shortMovieDuration)
};

export { filterMovies, filterMovieDuration};
