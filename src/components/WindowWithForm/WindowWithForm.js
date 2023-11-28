import React from "react";
import { Link } from "react-router-dom";
import "./WindowWithForm.css";
import logo from "../../images/logo.svg";

function WindowWithForm({ title, children, buttonText, text, linkText, adress }) {
  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">{title}</h2>
      <form className="window__form">
        {children}
        <button className="window__form-submit-btn" type="submit">{buttonText}</button>
      </form>
      <p className="window__text">
        {text}
        <Link to={adress} className="window__link" type="button">{linkText}</Link>
      </p>
    </div>
  );
}

export default WindowWithForm;
