// modules
import mobileHeight from './modules/mobile-height-adjust';
import slider from './modules/slider';
import menu from './modules/menu';
import footer from './modules/footer';
import chat from './modules/chat.js';
import result from './modules/result';
import form from './modules/form';
import social from './modules/social';
import loadPage from './modules/load-page';
import rules from './modules/rules';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();
loadPage();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
