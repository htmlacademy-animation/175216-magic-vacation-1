const RULES_HASH = `#rules`;

export default () => {
  const button = document.querySelector(`.rules__link`);
  const lastRule = document.querySelector(`.rules__list li:last-child p`);

  function addBtnAnimateClass() {
    button.classList.add(`rules__link--show`);
  }

  function removeBtnAnimateClass() {
    button.classList.remove(`rules__link--show`);
  }

  function controlBtnAnimateClass() {
    if (location.hash === RULES_HASH) {
      return lastRule.addEventListener(`animationend`, addBtnAnimateClass);
    }

    return removeBtnAnimateClass();
  }

  // init if the first visit page is #rules
  controlBtnAnimateClass();

  // listener for page changes
  window.addEventListener(`popstate`, function () {
    controlBtnAnimateClass();
  });
};
