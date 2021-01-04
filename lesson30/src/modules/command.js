/* eslint-disable strict */
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

export default command;