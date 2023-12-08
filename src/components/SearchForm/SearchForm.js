import React, { useEffect, useState } from "react";
import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";


function SearchForm({ isShortFilm, searchAndFilterMovies, onFilterMovies }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);

  function onSubmit(evt) {
    evt.preventDefault();
    if (search.length === 0) {
      setIsSearchError(true);
    } else {
      setIsSearchError(false);
      searchAndFilterMovies(search);
    }
  };

  function handleChange(evt) {
    setSearch(evt.target.value);
  };

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const isSearch = localStorage.getItem("movieSearch");
      setSearch(isSearch);
    }
  }, [location])

  return (
    <section className="search">
      <div className="search__wrapper">
        <form
          className="search__form"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="search__container">
            <input
              className="search__form-item"
              placeholder="Фильм"
              type="text"
              name="film"
              required
              onChange={handleChange}
              value={search || ""}
            />
            <button className="search__submit-btn" type="submit" />
          </div>
          <div className="search__form-item-container">
            <span className={`search__form-item-error ${isSearchError && 'search__form-item-error_active'}`}>Нужно ввести ключевое слово</span>
          </div>
        </form>
        <FilterCheckbox
          onFilterMovies={onFilterMovies}
          isShortFilm={isShortFilm}
        />
        <div className="search__line"></div>
      </div>
    </section>
  );
}

export default SearchForm;
