import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";
import { useLocation } from "react-router-dom";
import {
  wideScreenLimit,
  mediumScreenLimit,
  smallScreenLimit,
  screen,
} from "../../utils/constants";

function MoviesCardList({
  savedMovies,
  isLoading,
  isNotFound,
  isReqError,
  cards,
  isSavedItems,
  handleDeleteMovie,
  handleSaveMovie,
}) {
  const pathname = useLocation();
  const [quantityMovies, setQuantityMovies] = useState(0);

  function getMovies(savedMovies, card) {
    return savedMovies.find((movie) => movie.movieId === card.id);
  };

  function showMovies() {
    if (screen > 1180) {
      setQuantityMovies(12);
    } else if (screen > 767) {
      setQuantityMovies(8);
    } else {
      setQuantityMovies(5);
    }
  };

  function enlargeScreen() {
    if (screen > 1280) {
      setQuantityMovies(quantityMovies + wideScreenLimit);
    } else if (screen > 768) {
      setQuantityMovies(quantityMovies + mediumScreenLimit);
    } else {
      setQuantityMovies(quantityMovies + smallScreenLimit);
    }
  };

  useEffect(() => {
    showMovies()
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showMovies)
    }, 500)
  });

  return (
    <section className="card-list">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (<SearchError errorText={"Ничего не найдено"} />)}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <ul className="card-list__container">
              {cards.map((card) => (
                <MoviesCard
                  key={isSavedItems ? card._id : card.id}
                  saved={getMovies(savedMovies, card)}
                  card={card}
                  cards={cards}
                  isSavedItems={isSavedItems}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSaveMovie={handleSaveMovie}
                />))}
            </ul>
          ) : (
            <>
              <ul className="card-list__container">
                {cards.slice(0, quantityMovies).map((card) => (
                  <MoviesCard
                    key={isSavedItems ? card._id : card.id}
                    saved={getMovies(savedMovies, card)}
                    card={card}
                    cards={cards}
                    isSavedItems={isSavedItems}
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSaveMovie={handleSaveMovie}
                  />))}
              </ul>
              {cards.length > quantityMovies ? (
                <button
                  type="button"
                  className="card-list__more-btn"
                  onClick={enlargeScreen}
                >
                  Ещё
                </button>) : (
                ""
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList;
