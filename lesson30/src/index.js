'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import command from './modules/command';
import sendForm from './modules/sendForm';

// Timer
countTimer();
// Menu
toggleMenu();
// Scroll button
smoothScroll();
// Pop-up
togglePopup();
// Tabs
tabs();
// Slider
slider();
// Calculator
calc(100);
// Command section
command();
// send-ajax-form
sendForm();
