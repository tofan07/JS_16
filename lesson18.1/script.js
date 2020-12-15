'use strict';
window.addEventListener('DOMContentLoaded', () => {
	function showTime() {
		const title = document.querySelector('.title'),
			today = document.querySelector('.today'),
			time = document.querySelector('.time'),
			newYear = document.querySelector('.new-year');

		function getTime() {
			const	deadline = '1 january 2021',
				date = new Date(),
				dateStop = new Date(deadline).getTime(),
				dateNow = date.getTime(),
				day = date.toLocaleString("ru", { weekday: 'long' }),
				timeRemaining = (dateStop - dateNow) / 1000,
				daysRem = Math.floor((timeRemaining / 60 / 60 / 24)),
				currentTime = date.toLocaleString("en", {
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric'
				}),
				hours = (currentTime.split(':')[0] < 9) ? '0' + currentTime.split(':')[0] : currentTime.split(':')[0],
				timesOfDay = currentTime.split(' ')[1];

			let greeting = '';
			if (timesOfDay === 'PM') {
				greeting = (hours < 5) ? 'Добрый день!' : 'Добрый вечер!';
			} else {
				greeting = (hours < 5) ? 'Доброй ночи!' : 'Доброе утро!';
			}

			function dayUppercasing(date) {
				const weekday = date[0].toUpperCase() + date.slice(1);
				return weekday;
			}
			const dayLong = dayUppercasing(day);

			return { timeRemaining, hours, dayLong, daysRem, currentTime, timesOfDay, greeting };
		}

		getTime();

		function updateTime() {
			const timer = getTime();

			if (timer.timeRemaining > 0) {
				title.textContent = timer.greeting;
				today.textContent = `Сегодня: ${timer.dayLong}`;
				time.textContent = `Текущее время: ${timer.hours}${timer.currentTime.slice(1)}`;
				newYear.textContent = `До Нового Года осталось ${timer.daysRem} дней!`;
			}
		}
		updateTime();
		setInterval(updateTime, 1000);
	}

	showTime();

});
