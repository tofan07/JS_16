'use strict';
// Вариант вывода a 

let date1 = new Date();

let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

let currentDate = date1.toLocaleString("ru", options).split(', ');

function dayTransform(dateArr) {
  let day = dateArr[0];
  day = day[0].toUpperCase() + day.slice(1);
  return day;
}
function dateTransform(dateArr) {
  let date = `${dateArr[1].slice(0, -3)} года`;
  return date;
}

function timeTransform(dateArr) {
  let time = dateArr[2],
      hours = time.slice(0, 2),
      minutes = time.slice(3, 5),
      seconds = time.slice(6, 8);
  time = hours + minutes + seconds;
  return time;
}
function timeWordsTransform(time) {
  let hours = time.slice(0, 2),
      minutes = time.slice(2, 4),
      seconds = time.slice(4, 6),
      lastMinute = minutes[1],
      lastSecond = seconds[1],
      hoursWord = '',
      minutesWord = '',
      secondsWord = '';

  if (hours === '1' || hours === '21') {
    hoursWord = ' час ';
    } else if ((hours > '1' && hours < 5) || (hours > 21 && hours < 24) ) {
      hoursWord = ' часа ';
      } else {
        hoursWord = ' часов ';
      }
  if (lastMinute === '1' && minutes !== '11') {
        minutesWord = ' минута ';
    } else if (lastMinute > '1' && lastMinute < '5' && !(minutes > '11' && minutes < '21')) {
      minutesWord = ' минуты ';
      } else {
        minutesWord = ' минут ';
      }
  if (lastSecond === '1' && (seconds !== '11')) {
        secondsWord = ' секунда ';
    } else if (lastSecond > '1' && lastSecond < '5' && !(seconds >= '10' && seconds < '21')) {
      secondsWord = ' секунды ';
      } else {
        secondsWord = ' секунд ';
      }
      let currentTime = hours + hoursWord + minutes + minutesWord + seconds + secondsWord;
  return currentTime;
}

let day = dayTransform(currentDate),
    date = dateTransform(currentDate),
    time = timeTransform(currentDate),
    timeWithWords = timeWordsTransform(time);

let resultDate = `Сегодня ${day}, ${date}, ${timeWithWords}`;
document.body.innerHTML = `
  <div class="date">
    <h2>${resultDate}</h2>
  </div>`;

let dateWrap = document.querySelector('.date');
dateWrap.style = 'color:red';

