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
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {
			let target = event.target;

			if (target.matches('a') && !target.matches('.close-btn')) {
				event.preventDefault();
				const id = target.getAttribute('href');
				document.querySelector(id).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
				handlerMenu();
				return;

			} else if (target.matches('.close-btn')) {
				handlerMenu();
				return;
			}
			if (menu.classList.contains('active-menu')) {
				target = target.closest('.active-menu');
				if (!target) {
					handlerMenu();
				}
				return;
			}
			target = target.closest('.menu');

			if (target) {
				handlerMenu();
			}

		});

	};

	toggleMenu();

	// Scroll button
	const smoothScroll = () => {
		const mouseLink = document.querySelector('main>a');

		mouseLink.addEventListener('click', function(event) {
			event.preventDefault();
			const target = this.getAttribute('href');
			document.querySelector(target).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	smoothScroll();

	// Pop-up
	const togglePopup = function() {
		const popup = document.querySelector('.popup'),
			popupDialog = document.querySelector('.popup-content'),
			popupBtn = document.querySelectorAll('.popup-btn');
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

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				counter = -30;
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
				}
			}
		});
	};

	togglePopup();

	// Tabs
	const tabs = () => {
		const tabsHeader = document.querySelector('.service-header'),
			tab = document.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabsHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, index) => {
					if (item === target) {
						toggleTabContent(index);
					}
				});
			}

		});
	};

	tabs();
});
