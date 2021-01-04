/* eslint-disable strict */
const calc = (price = 100) => {

	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSqare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	let count = 0;

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		let testNum;

		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSqare.value;
		let totalInterval = false;

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
			testNum = total / 500;
		}

		totalInterval = setInterval(() => {
			if (total < 1000) {
				if (count < total) {
					count++;
					totalValue.textContent = Math.floor(count);
				} else if (count > total) {
					count--;
					totalValue.textContent = Math.floor(count);
				} else {
					totalValue.textContent = Math.floor(total);
					clearInterval(totalInterval);
				}
			} else {
				if (count >= 0 && count <= (total - 500)) {
					count += testNum;
					totalValue.textContent = Math.floor(count);

				} else if (count >= total + 500) {
					count -= testNum;
					totalValue.textContent = Math.floor(count);

				} else if (count > total || count < total + 500 || count < total ||
                    count > total - 500 || count <= 0) {
					totalValue.textContent = Math.floor(total);
					clearInterval(totalInterval);

				} else {
					totalValue.textContent = 0;
					count = 0;
				}
			}
		}, 1);

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