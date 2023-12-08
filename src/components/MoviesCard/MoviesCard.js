import React from "react";
import "./MoviesCard.css";

function MoviesCard({ card, handleDeleteMovie, saved, handleSaveMovie, savedMovies, isSavedItems }) {

  function onDelete() {
    handleDeleteMovie(card);
  };

  function movieDurationConverter(duration) {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}ч${minutes}м`
  };

  function onCardClick() {
    if (saved) {
      handleDeleteMovie(savedMovies.filter((movie) => movie.movieId === card.id)[0]);
    } else {
      handleSaveMovie(card);
    }
  };

  return (
    <article className="card" key={card.id}>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__image"
          src={
            isSavedItems
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className="card__container">
        <h3 className="card__title">{card.nameRU}</h3>
        <p className="card__film-duration">{movieDurationConverter(card.duration)}</p>
      </div>
      {isSavedItems
        ? (
          <button
            type="button"
            className="card__save-btn card__save-btn_disactive"
            onClick={onDelete}
          >
            Сохранить
          </button>
        )
        : (
          <button
            type="button"
            className={`card__save-btn ${saved && 'card__save-btn_active'}`}
            onClick={onCardClick}
          >
            Сохранить
          </button>
        )}
    </article>
  );
}

export default MoviesCard;
