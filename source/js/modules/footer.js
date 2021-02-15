export default () => {
  let footerTogglers = document.querySelectorAll(`.js-footer-toggler`);

  if (footerTogglers.length) {
    for (let i = 0; i < footerTogglers.length; i++) {
      footerTogglers[i].addEventListener(`click`, function () {
        let footer = footerTogglers[i].parentNode;
        if (footer.classList.contains(`screen__footer--full`)) {
          footer.classList.remove(`screen__footer--full`);
          footer.classList.add(`screen__footer--small`);
        } else {
          footer.classList.remove(`screen__footer--small`);
          footer.classList.add(`screen__footer--full`);
        }
      });
    }
  }
};
