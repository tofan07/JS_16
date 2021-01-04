/* eslint-disable strict */
/* eslint-disable no-use-before-define */
const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		loader = `
        <section>
            <div class='sk-fading-circle'>
                <div class='sk-circle sk-circle-1'></div>
                <div class='sk-circle sk-circle-2'></div>
                <div class='sk-circle sk-circle-3'></div>
                <div class='sk-circle sk-circle-4'></div>
                <div class='sk-circle sk-circle-5'></div>
                <div class='sk-circle sk-circle-6'></div>
                <div class='sk-circle sk-circle-7'></div>
                <div class='sk-circle sk-circle-8'></div>
                <div class='sk-circle sk-circle-9'></div>
                <div class='sk-circle sk-circle-10'></div>
                <div class='sk-circle sk-circle-11'></div>
                <div class='sk-circle sk-circle-12'></div>
            </div>
            </section>
        `,
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem;';

	document.addEventListener('submit', event => {
		event.preventDefault();
		if (!localStorage.getItem('isValid')) {
			return;
		}
		let target = event.target;
		target = target.closest('form');

		target.appendChild(statusMessage);
		statusMessage.innerHTML = loader;

		const formData = new FormData(target);
		const body = {};

		formData.forEach((val, key) => {
			body[key] = val;
		});
		// eslint-disable-next-line no-use-before-define
		postData(body)
			.then(showSuccess)
			.then(target.reset())
			.catch(showError);

		localStorage.removeItem('isValid');
	});

	const showSuccess = response => {
		if (response.status !== 200) {
			throw new Error('network status not 200!');
		}

		statusMessage.textContent = successMessage;
		statusMessage.style.color = '#19b5fe';
	};

	const showError = error => {
		statusMessage.textContent = errorMessage;
		statusMessage.style.color = 'red';
		console.error(error);
	};

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
};

export default sendForm;