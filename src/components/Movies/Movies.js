import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import moviesApi from "../../utils/MoviesApi";
import { filterMovies, filterMovieDuration } from "../../utils/utils";

function Movies({ loggedIn, handleDeleteMovie, handleSaveMovie, savedMovies }) {
  const [isShortFilm, setisShortFilm] = useState(false);
  const [isReqError, setisReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsMovies, setInitialCardsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [refreshMovies, setRefreshMovies] = useState(false);


  function handleShortFilm() {
    setisShortFilm(!isShortFilm);
    if (!isShortFilm) {
      if (filterMovieDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(filterMovieDuration(initialCardsMovies));
      } else {
        setFilteredMovies(filterMovieDuration(initialCardsMovies));
      }
    } else {
      setFilteredMovies(initialCardsMovies);
    }
    localStorage.setItem("shortMovies", !isShortFilm);
  };

  function updateMoviesList(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short);
    setInitialCardsMovies(moviesCardList);
    setFilteredMovies(short ? filterMovieDuration(moviesCardList) : moviesCardList);
    localStorage.setItem("movies", JSON.stringify(moviesCardList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  };

  function searchMovies(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortFilm);
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      updateMoviesList(movies, query, isShortFilm);
    } else {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((res) => {
          updateMoviesList(res, query, isShortFilm);
          setisReqError(false);
        })
        .catch((err) => {
          console.log(err);
          setisReqError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortFilm(true)
    } else {
      setisShortFilm(false)
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterMovieDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        searchAndFilterMovies={searchMovies}
        onFilterMovies={handleShortFilm}
        isShortFilm={isShortFilm}
        refreshMovies={bool => setRefreshMovies(bool)}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        isLoading={isLoading}
        isNotFound={isNotFound}
        isReqError={isReqError}
        cards={filteredMovies}
        isSavedItems={false}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        refreshMovies={refreshMovies}
        setRefreshMovies={() => setRefreshMovies(false)}
      />
      <Footer />
    </section>
  );
}

export default Movies;
