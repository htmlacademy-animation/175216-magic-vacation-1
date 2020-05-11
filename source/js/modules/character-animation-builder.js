/**
 * Class to apply single character animation to textContent
 * @param {string} cssSelectorToFindAnimateNode - selector to get node`s textContent.
 * @param {string} cssPropToAnimate - css prop to animate(transform, opacity, color etc...).
 * @param {number} cssTransitionPropTimer - time in milleseconds to animate prop
 * @param {string} wordSeparator - symbol to separate words in string
 * @param {boolean} isSingleWord - flag for world animation delay
 */

class CharacterAnimationBuilder {
  constructor({
    cssSelectorToFindAnimateNode,
    cssPropToAnimate,
    cssTransitionPropTimer,
    wordSeparator = ` `,
    isSingleWord = false,
  }) {
    this.cssSelectorToFindAnimateNode = cssSelectorToFindAnimateNode;
    this.cssTransitionPropTimer = cssTransitionPropTimer;
    this.cssPropToAnimate = cssPropToAnimate;
    this.wordSeparator = wordSeparator;
    this.isSingleWord = isSingleWord;

    this.element = document.querySelector(this.cssSelectorToFindAnimateNode);
    this.symbolCssTransitionDelay = 0;
    this.prePareText();
  }

  getCssTransitionDelay(wordIdx, letterIdx) {
    const letterNumber = letterIdx + 1;
    const delay = this.isSingleWord ? 0 : wordIdx * 200;

    let delta;

    switch (true) {
      case (letterNumber === 3):
      case (letterNumber === 5):
        delta = -25;
        break;
      case (letterNumber % 2 === 0):
      case (letterNumber % 4 === 0):
        delta = -50;
        break;
      default:
        delta = 60;
    }

    return delay + delta;
  }

  createElement({letter, wordIdx, letterIdx, wordLength}) {
    const isLastLetter = (letterIdx + 1) === wordLength;
    const custonLetter = document.createElement(`span`);
    custonLetter.classList.add(`character-animated__word__letter`, isLastLetter ? `last` : undefined);
    custonLetter.textContent = letter;
    custonLetter.style.transition = `${this.cssPropToAnimate} ${this.cssTransitionPropTimer}ms ease ${this.symbolCssTransitionDelay}ms`;
    this.symbolCssTransitionDelay = this.getCssTransitionDelay(wordIdx, letterIdx);
    return custonLetter;
  }

  prePareText() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(`character-animated`);

    const words = this.element.textContent.trim().split(this.wordSeparator);

    const content = words.reduce((generatedNodeFragment, word, wordIdx) => {
      const wordLength = word.length;
      const preparedWord = Array.from(word).reduce((generatedWordFragment, letter, letterIdx) => {
        const preparedLetter = this.createElement({letter, wordIdx, letterIdx, wordLength});
        generatedWordFragment.appendChild(preparedLetter);
        return generatedWordFragment;
      }, document.createDocumentFragment());

      const preparedWordWrapper = document.createElement(`span`);
      preparedWordWrapper.classList.add(`character-animated__word`);

      preparedWordWrapper.appendChild(preparedWord);
      generatedNodeFragment.appendChild(preparedWordWrapper);

      return generatedNodeFragment;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);

  }

  runAnimation() {
    if (!this.element) {
      return;
    }
    this.element.classList.add(`animated`);
  }

  destroyAnimation() {
    this.element.classList.remove(`animated`);
  }
}

export default CharacterAnimationBuilder;
