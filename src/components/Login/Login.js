import React from "react";
import WindowWithForm from "../WindowWithForm/WindowWithForm";
import "../WindowWithForm/WindowWithForm.css";
import { useForm } from "../../hooks/useForm";
import { emailRegex } from "../../utils/constants";

function Login({ onLogin, isLoading }) {
  const { values, errors, isValid, handleChange } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <WindowWithForm
      title="Рады видеть!"
      buttonText="Войти"
      text="Ещё не зарегистрированы? "
      linkText="Регистрация"
      adress="/signup"
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isLoading={isLoading}
    >
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
        autoComplete="on"
        required
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="window__form-item-error window__form-item-error-log">{errors.password}</span>
    </WindowWithForm>
  );
}

export default Login;
