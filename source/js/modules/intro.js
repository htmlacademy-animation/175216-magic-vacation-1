import CharacterAnimationBuilder from './character-animation-builder';

export default () => {
  const title = new CharacterAnimationBuilder({
    cssSelectorToFindAnimateNode: `.intro__title`,
    cssPropToAnimate: `transform`,
    cssTransitionPropTimer: 500,
  });

  const date = new CharacterAnimationBuilder({
    cssSelectorToFindAnimateNode: `.intro__date`,
    cssPropToAnimate: `transform`,
    cssTransitionPropTimer: 400,
    isSingleWord: true,
  });

  const message = document.querySelector(`.intro__message`);
  const label = document.querySelector(`.intro__label`);

  setTimeout(() => {
    title.runAnimation();
  }, 200);

  message.addEventListener(`animationend`, function () {
    label.classList.add(`animated`);
    date.runAnimation();
  });
};
