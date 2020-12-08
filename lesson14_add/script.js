'use strict';
document.addEventListener('DOMContentLoaded', function() {

	function DomElement(selector, height, width, bg, fontSize, position) {
		this.selector = selector;
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.position = position;
	}
	
	DomElement.prototype.createElem = function() {
		const elemSelector = this.selector.slice(1);
		let newElem;
	
		if (this.selector.slice(0, 1) === '.') {
		newElem = document.createElement('div');
		newElem.classList.add(elemSelector);
		}
		if (this.selector.slice(0, 1) === '#') {
		newElem = document.createElement('p');
		newElem.setAttribute('id', elemSelector);
		}
	
		newElem.style.cssText = `
			height: ${this.height};
			width: ${this.width};
			background: ${this.bg};
			font-size: ${this.fontSize};
			position: ${this.position}`;
	
		document.body.prepend(newElem);
	};
	
	DomElement.prototype.addText = function(text) {
		let elem = document.querySelector(this.selector);
		elem.textContent = text;
	};
	
	
	const elem = new DomElement('.brown', '100px', '100px', 'brown', '', 'absolute');
	
	elem.createElem();
	
	let counterLeft = 0,
		counterTop = 0;
	
	window.addEventListener('keydown', function(event) {
		let square = document.querySelector('.brown');
		switch (event.key) {
			case 'ArrowRight':
					counterLeft += 10;
					square.style.left = counterLeft + 'px';
				break;
			case 'ArrowLeft':
					counterLeft = counterLeft - 10;
					square.style.left = counterLeft + 'px';
				break;
			case 'ArrowUp':
					counterTop = counterTop - 10;
					square.style.top = counterTop + 'px';
				break;
			case 'ArrowDown':
					counterTop += 10;
					square.style.top = counterTop + 'px';
				break;
			default:
				return;
		}
	});
});
