'use strict';
window.addEventListener('DOMContentLoaded', () => {
	// Таймер
	function countTimer() {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const	deadline = '17 december 2020',
				dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor((timeRemaining / 60 / 60));

			return { timeRemaining, hours, minutes, seconds };
		}

		function updateClock() {
			const timer = getTimeRemaining();

			if (timer.timeRemaining > 0) {
				timerHours.textContent = (timer.hours > 9) ? timer.hours : `0${timer.hours}`;
				timerMinutes.textContent = (timer.minutes > 9) ? timer.minutes : `0${timer.minutes}`;
				timerSeconds.textContent = (timer.seconds > 9) ? timer.seconds : `0${timer.seconds}`;
			} else {
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}
		updateClock();
		setInterval(updateClock, 1000);
	}

	countTimer();

	// Меню
	const toggleMenu = () => {
		const menuBtn = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li'),
			mouseLink = document.querySelector('main>a');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		menuBtn.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		mouseLink.addEventListener('click', function(event) {
			event.preventDefault();
			const target = this.getAttribute('href');
			document.querySelector(target).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});

		menuItems.forEach(item => item.addEventListener('click', event => {
			handlerMenu();
			event.preventDefault();
			const target = item.querySelector('a').getAttribute('href');
			document.querySelector(target).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}));

	};

	toggleMenu();

	// Pop-up
	const togglePopup = function() {
		const popup = document.querySelector('.popup'),
			popupDialog = document.querySelector('.popup-content'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			closePopup = document.querySelector('.popup-close');
		let counter = -30;

		const popupAnimate = function() {
			counter++;
			const popupInterval = requestAnimationFrame(popupAnimate);
			popupDialog.style.top = (counter < 11) ?  popupDialog.style.top =
			`${counter}%` : cancelAnimationFrame(popupInterval);
		};

		popupBtn.forEach(item => item.addEventListener('click', () => {
			popup.style.display = 'block';
			if (document.documentElement.clientWidth > 768) {
				popupAnimate();
			}
		}));
		closePopup.addEventListener('click', () => {
			popup.style.display = 'none';
			counter = -30;
		});
	};

	togglePopup();


});
