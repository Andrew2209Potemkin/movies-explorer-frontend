import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false);

  const changeLinkWeight = ({ isActive }) =>
    isActive
      ? "header__link-movies header__link-movies_active"
      : "header__link-movies"

  function handleOpenMenu() {
    setIsClicked(true);
  };

  function handleCloseMenu() {
    setIsClicked(false);
  };

  return (
    <>
      {!loggedIn ? (
        <header className="header">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__links-container">
            <Link to="/signup" className="header__link-auth">Регистрация</Link>
            <Link to="/signin" className="header__link-log">Войти</Link>
          </div>
        </header>
      ) : (
        <header className="header">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__wrapper">
            <div className="header__container">
              <NavLink to="/movies" className={changeLinkWeight}>Фильмы</NavLink>
              <NavLink to="/saved-movies" className={changeLinkWeight}>Сохраненные фильмы</NavLink>
            </div>
            <Link to="/profile" className="header__link-account">Аккаунт</Link>
          </div>
          <button className="header__menu-btn" type="button" onClick={handleOpenMenu} />
          {isClicked ? (<Navigation handleCloseMenu={handleCloseMenu} />) : ("")}
        </header>
      )}
    </>
  );
}

export default Header;
