/* eslint-disable strict */
const calc = (price = 100) => {

	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSqare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		let testNum;

		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSqare.value;


		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
		}

		 // функция запуска анимации (итоговый каунтТотал мы узнаем ранее)
		 function animate({ duration, draw, timing }) {

			let start = performance.now();
	
			requestAnimationFrame(function animate(time) {
	
				let timeFraction = (time - start) / duration;
	
				if (timeFraction > 1) timeFraction = 1;
	
				let progress = timing(timeFraction)
	
				draw(progress);
	
				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}
	
			});
		}
	
		animate({
			// скорость анимации
			duration: 2000,
			// Функция расчёта времени
			timing(timeFraction) {
				return timeFraction;
			},
			// Функция отрисовки
			draw(progress) {
				// в ней мы и производим вывод данных
				totalValue.textContent = Math.floor(progress * total)
	
			}
		});

	};


	calcBlock.addEventListener('input', event => {
		const target = event.target;
		if (!target.matches('select')) {
			target.value = target.value.replace(/[\D]/, '');
		}
	});

	calcBlock.addEventListener('change', event => {
		const target = event.target;

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});


};

export default calc;