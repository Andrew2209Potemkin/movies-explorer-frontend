const emailRegex = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}";
const nameRegex = "^[а-яА-ЯёЁa-zA-Z]+$";


const screen = window.innerWidth;

const wideScreenLimit = 3;
const mediumScreenLimit = 2;
const smallScreenLimit = 2;
const shortMovieDuration = 40;

export {
  emailRegex, nameRegex,
  screen, wideScreenLimit,
  smallScreenLimit, mediumScreenLimit,
  shortMovieDuration,
};
