'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const select = document.getElementById('cars'),
		output = document.getElementById('output');

	const getData = () => new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open('GET', './cars.json');
		request.setRequestHeader('Content-type', 'application/json');

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.status === 200) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			} else {
				reject(request.statusText);
			}
		});
		request.send();
	});

	const outputData = data => {
		data.cars.forEach(item => {
			console.log(item.brand, select.value);
			if (item.brand === select.value) {
				const { brand, model, price } = item;
				output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
			} else if (select.value === 'no') {
				output.innerHTML = 'выбери тачку';
			}
		});
	};

	select.addEventListener('change', () => {
		getData()
			.then(outputData)
			.catch(error => output.innerHTML = error);
	});

});
