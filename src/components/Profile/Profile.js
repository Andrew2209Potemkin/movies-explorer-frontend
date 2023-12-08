import React, { useState, useEffect, useContext } from "react";
import "../Profile/Profile.css";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import { nameRegex, emailRegex } from "../../utils/constants";


function Profile({ onUpdateUser, loggedIn, isLoading, signOut }) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();
  const currentUser = useContext(CurrentUserContext);
  const [isValidForm, setIsValidForm] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      email: values.email,
      name: values.name,
    });
  };

  useEffect(() => {
    if (
      currentUser.email === values.email &&
      currentUser.name === values.name
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false)
    }
  }, [currentUser, values]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile__form-label">
            Имя
            <input
              className="profile__form-item"
              id="username"
              type="text"
              name="name"
              placeholder="Имя"
              required
              onChange={handleChange}
              value={values.name || ""}
              pattern={nameRegex}
            />
          </label>
          <span className="profile__form-item-error">{errors.name}</span>
          <div className="profile__form-line"></div>
          <label className="profile__form-label">
            E-mail
            <input
              className="profile__form-item"
              id="useremail"
              type="email"
              name="email"
              placeholder="E-mail"
              required
              onChange={handleChange}
              value={values.email || ""}
              pattern={emailRegex}
            />
          </label>
          <span className="profile__form-item-error">{errors.email}</span>
          <button
            className={
              !isValid || isLoading || isValidForm
                ? "profile__edit-btn window__form-submit-btn_inactive"
                : "profile__edit-btn"
            }
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__exit-btn"
            type="button"
            onClick={signOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>

  );
}

export default Profile;
