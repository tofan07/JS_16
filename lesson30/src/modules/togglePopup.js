/* eslint-disable strict */
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

export default togglePopup;