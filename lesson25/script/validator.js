'use strict';

// eslint-disable-next-line no-unused-vars
class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.elementsForm = [...this.form.elements].filter(item => item.tagName.
			toLowerCase() !== 'button' && item.type !== 'button');
		this.error = new Set();
	}

	init() {
		this.allpyStyle();
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
			if (this.error.size) {
				event.preventDefault();
			}
		});
	}

	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};

		if (this.method) {
			const method = this.method[elem.id];

			if (method) {
				return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
		}


		return true;
	}

	checkIt(event) {
		const target = event.target;

		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}
	showError(elem) {
		elem.classList.remove('success');
		elem.classList.add('error');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			return;
		}
		const errorDiv = document.createElement('div');
		const currentForm = elem.id.split('-')[0];

		errorDiv.textContent = 'Ошибка в этом поле';
		errorDiv.classList.add(`validator-error`, `${currentForm}-error`, `${elem.id}-error`);
		elem.insertAdjacentElement('afterend', errorDiv);
	}

	showSuccess(elem) {
		elem.classList.remove('error');
		elem.classList.add('success');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}

	allpyStyle() {
		const style = document.createElement('style');
		style.textContent = `
            input.success {
                border: 2px solid green
            }
            input.error {
                border: 2px solid red
            }
            .validator-error {
                font-size: 12px;
                font-family: sans-serif;
				color: red;
			}
			.form3-error {
				position: absolute;
				top: 0px;
				left: 20px;
				text-align: left;
			}
			.form2-error {
				position: absolute;
				top: 0px;
				left: 12%;
			}
			.form1-error {
				position: absolute;
				top: -30px;
				left: 12%;
			}
			.form2-message-error {
				top: 20px;
				left: 29px;
			}
        `;

		document.head.appendChild(style);
	}
	setPattern() {
		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
		}
		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w+\.\w{2,}$/;
		}
		if (!this.pattern.name) {
			this.pattern.name = /^[а-я]$/i;
		}
	}
}
