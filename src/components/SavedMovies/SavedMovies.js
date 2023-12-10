import React, { useState, useEffect } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { filterMovies, filterMovieDuration } from "../../utils/utils";

function SavedMovies({ loggedIn, handleDeleteMovie, savedMovies }) {
  const [isNotFound, setIsNotFound] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);

  const [isShortFilm, setisShortFilm] = useState(false);


  function handleShortFilm() {
    setisShortFilm(!isShortFilm);
  };


  function searchMovies(query) {
    setSearchQuery(query);
  };


  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(
      isShortFilm ? filterMovieDuration(moviesCardList) : moviesCardList
    );
  }, [savedMovies, isShortFilm, searchQuery]);


  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        searchAndFilterMovies={searchMovies}
        handleCheckboxChange={handleShortFilm}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        isSavedItems={true}
        cards={filteredMovies}
        handleDeleteMovie={handleDeleteMovie}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
