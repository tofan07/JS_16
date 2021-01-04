/* eslint-disable strict */
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

export default smoothScroll;
