/* eslint-disable strict */
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

export default slider;