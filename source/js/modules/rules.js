export default () => {
  const button = document.querySelector(`.rules__link`);
  const lastRule = document.querySelector(`.rules__list li:last-child`);

  lastRule.addEventListener(`animationend`, function () {
    button.classList.add(`rules__link--show`);
  });
};
