import React from "react";
import WindowWithForm from "../WindowWithForm/WindowWithForm";
import "../WindowWithForm/WindowWithForm.css";

function Login() {
  return (
    <WindowWithForm
      title="Рады видеть!"
      buttonText="Войти"
      text="Ещё не зарегистрированы? "
      linkText="Регистрация"
      adress="/signup"
    >
      <label className="window__form-label" htmlFor="useremail">E-mail</label>
      <input
        className="window__form-item"
        id="useremail"
        type="email"
        name="email"
        placeholder="E-mail"
        required
      />
      <span className="window__form-item-error">E-mail введен некорректно</span>
      <label className="window__form-label" htmlFor="userpassword">Пароль</label>
      <input
        className="window__form-item"
        id="userpassword"
        type="password"
        name="password"
        placeholder="Пароль"
        autoComplete="on"
        required />
      <span className="window__form-item-error window__form-item-error-log">Пароль должен содержать не менее 6 символов</span>
    </WindowWithForm>
  );
}

export default Login;
