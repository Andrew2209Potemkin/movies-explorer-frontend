import React from "react";
import WindowWithForm from "../WindowWithForm/WindowWithForm";
import "../WindowWithForm/WindowWithForm.css";
import { useForm } from "../../hooks/useForm";
import { nameRegex, emailRegex } from "../../utils/constants";

function Register({ onRegister, isLoading }) {
  const { values, errors, isValid, handleChange } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  };

  return (
    <WindowWithForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      text="Уже зарегистрированы? "
      linkText="Войти"
      adress="/signin"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isLoading={isLoading}
    >
      <label className="window__form-label" htmlFor="username">Имя</label>
      <input
        className="window__form-item"
        id="username"
        type="text"
        name="name"
        placeholder="Имя"
        required
        onChange={handleChange}
        value={values.name || ""}
        pattern={nameRegex}
        minLength="2"
        maxLength="30"
      />
      <span className="window__form-item-error">{errors.name}</span>
      <label className="window__form-label" htmlFor="useremail">E-mail</label>
      <input
        className="window__form-item"
        id="useremail"
        type="email"
        name="email"
        placeholder="E-mail"
        required
        onChange={handleChange}
        value={values.email || ""}
        pattern={emailRegex}
      />
      <span className="window__form-item-error">{errors.email}</span>
      <label className="window__form-label" htmlFor="userpassword">Пароль</label>
      <input
        className="window__form-item"
        id="userpassword"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="window__form-item-error">{errors.password}</span>
    </WindowWithForm>
  );
}

export default Register;
