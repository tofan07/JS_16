'use strict';

function DomElement(selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
	
	this.create = function() {
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
		font-size: ${this.fontSize};`;

	document.body.append(newElem);
	};
  this.addText = function(text) {
	let elem = document.querySelector(this.selector);
	elem.textContent = text;
  };
}

const elem = new DomElement('#brown', '250px', '500px', 'brown', '2rem');
const elem2 = new DomElement('.aqua', '350px', '800px', 'aqua', '1.5rem');

elem.create();
elem.addText('Привет мир!');

elem2.create();
elem2.addText('Учим ООП');
