'use strict';
window.addEventListener('DOMContentLoaded', () => {
	// Timer
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

	// Menu
	const toggleMenu = () => {
		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {
			let target = event.target;

			if (target.matches('a') && !target.matches('.close-btn') && target.classList === undefined) {

				event.preventDefault();
				const id = target.getAttribute('href');
				document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
				handlerMenu();
				return;

			} else if (target.matches('.close-btn')) {
				handlerMenu();
				return;
			}

			if (menu.classList.contains('active-menu')) {
				target = target.closest('.active-menu');
				if (!target) { handlerMenu(); }
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
	const togglePopup = () => {
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
					counter = -30;
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

	// Slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dotsWrap = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const addDots = () => {
			slide.forEach(() => {
				const dot = document.createElement('li');
				dot.classList.add('dot');
				dotsWrap.append(dot);
			});
			dotsWrap.querySelector('.dot').classList.add('dot-active');
		};

		addDots();

		const dot = document.querySelectorAll('.dot');

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;

			if (currentSlide === slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		};

		const startSlide = (time = 1500) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};


		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			const target = event.target;
			if (target.matches('.portfolio-btn') ||
			target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			const target = event.target;
			if (target.matches('.portfolio-btn') ||
			target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);
	};

	slider();

	// Calc
	const calc = (price = 100) => {

		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSqare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		let count = 0;

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			let testNum;

			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSqare.value;
			let totalInterval = false;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
				testNum = total / 500;
			}

			totalInterval = setInterval(() => {
				if (total < 1000) {
					if (count < total) {
						count++;
						totalValue.textContent = Math.floor(count);
					} else if (count > total) {
						count--;
						totalValue.textContent = Math.floor(count);
					} else {
						totalValue.textContent = Math.floor(total);
						clearInterval(totalInterval);
					}
				} else {
					if (count >= 0 && count <= (total - 500)) {
						count += testNum;
						totalValue.textContent = Math.floor(count);

					} else if (count >= total + 500) {
						count -= testNum;
						totalValue.textContent = Math.floor(count);

					} else if (count > total || count < total + 500 || count < total ||
						count > total - 500 || count <= 0) {
						totalValue.textContent = Math.floor(total);
						clearInterval(totalInterval);

					} else {
						totalValue.textContent = 0;
						count = 0;
					}
				}
			}, 1);

		};


		calcBlock.addEventListener('input', event => {
			const target = event.target;
			if (!target.matches('select')) {
				target.value = target.value.replace(/[\D]/, '');
			}
		});

		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});


	};

	calc(100);

	// Command section
	const command = () => {
		const commandWrapper = document.getElementById('command');

		let imageSrc,
			currentImage;

		commandWrapper.addEventListener('mouseover', event => {
			let target = event.target;

			target = target.closest('img');

			if (target) {
				imageSrc = target.getAttribute('src');
				currentImage = target;
				target.src = target.dataset.img;
			} else if (currentImage) {
				currentImage.src = imageSrc;
			}
		});
	};

	command();
});
