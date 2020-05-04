// import throttle from 'lodash/throttle';

export const HOME_SCREEN_ID = 0;
export const STORY_SCREEN_ID = 1;
export const PRIZES_SCREEN_ID = 2;
export const RULES_SCREEN_ID = 3;
export const GAME_SCREEN_ID = 4;

const SLIDER_TIMEOUT = 600;

const sliderScreen = document.querySelector(`.screen--background-slider`);

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.prevScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChenged.bind(this);
  }

  init() {
    // временнно отключил переключение страниц по скролу, а то бесит
    // document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChenged();
    this.changePageDisplay();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChenged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeActiveScreenStatus() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeVisibilityDisplay() {
    this.prevScreen = Array.from(this.screenElements).findIndex(
        (screen) => screen.classList.contains(`active`)
    );

    const isSliderScreenActive =
      this.activeScreen === PRIZES_SCREEN_ID
      && this.prevScreen === STORY_SCREEN_ID;

    if (isSliderScreenActive) {
      sliderScreen.classList.add(`active`);

      setTimeout(() => {
        this.changeActiveScreenStatus();
        sliderScreen.style.zIndex = `0`;
      }, SLIDER_TIMEOUT);
    } else {
      sliderScreen.classList.remove(`active`);
      sliderScreen.style.zIndex = `1`;
      this.changeActiveScreenStatus();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
