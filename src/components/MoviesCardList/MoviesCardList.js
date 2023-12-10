import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";

import {
  wideScreenLimit,
  mediumScreenLimit,
  smallScreenLimit
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
  refreshMovies,
  setRefreshMovies,
}) {

  const [quantityMovies, setQuantityMovies] = useState(0);
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", showMovies);
    return () => {
      window.removeEventListener("resize", showMovies);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getMovies(savedMovies, card) {
    return savedMovies.find((movie) => movie.movieId === card.id);
  };

  useEffect(() => {
    if (refreshMovies) {
      setRefreshMovies();
      showMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshMovies, setRefreshMovies])

  useEffect(() => {
    const handleResize = (event) => {
      setScreen(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    showMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  function showMovies() {
    if (screen >= 1280) {
      setQuantityMovies(12);
    }
    else if (screen >= 768 && screen < 1280) {
      setQuantityMovies(8);
    } else if (screen >= 320 && screen < 768) {
      setQuantityMovies(5);
    }
  };

  function enlargeScreen() {
    if (screen >= 1280) {
      setQuantityMovies(quantityMovies + wideScreenLimit);
    } else if (screen >= 768 && screen < 1280) {
      setQuantityMovies(quantityMovies + mediumScreenLimit);
    } else if (screen >= 320 && screen < 768) {
      setQuantityMovies(quantityMovies + smallScreenLimit);
    }
  };

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
          {isSavedItems ? (
            <>
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
                  />
                ))}
              </ul>
            </>
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
