import React from "react";
import { Link } from "react-router-dom";
import "./WindowWithForm.css";
import logo from "../../images/logo.svg";

function WindowWithForm({
  title, children,
  buttonText, text,
  linkText, adress,
  onSubmit, isDisabled,
  isLoading
}) {
  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">{title}</h2>
      <form
        className="window__form"
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          className={isDisabled || isLoading
            ? "window__form-submit-btn window__form-submit-btn_inactive"
            : "window__form-submit-btn"}
          type="submit"
          disabled={isDisabled ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <p className="window__text">
        {text}
        <Link to={adress} className="window__link" type="button">{linkText}</Link>
      </p>
    </div>
  );
}

export default WindowWithForm;
