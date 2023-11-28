import React from "react";
import "../Footer/Footer.css";

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__line"></div>
      <div className="footer__wrapper">
        <nav className="footer__links-list">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/Andrew2209Potemkin"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </nav>
        <p className="footer__author">©2023</p>
      </div>

    </section>
  );
}

export default Footer;
