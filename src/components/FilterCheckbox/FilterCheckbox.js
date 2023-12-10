import React from "react";
import "../FilterCheckbox/FilterCheckbox.css";

function FilterCheckbox({ onFilterMovies, isShortFilm }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__item"
        type="checkbox"
        onChange={onFilterMovies}
        checked={isShortFilm}
      />
      <span className="filter-checkbox__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
