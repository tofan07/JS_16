/* eslint-disable strict */
const toggleMenu = () => {
	const menu = document.querySelector('menu');

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	document.addEventListener('click', event => {
		let target = event.target;
		if (target.matches('a') && !target.matches('.close-btn') && target.classList.length === 0) {
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

export default toggleMenu;