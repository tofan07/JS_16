'use strict';
// document.body.innerHTML += '<p><i>' + week[i] + '</i></p>';
let dateStr = new Date();

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
// console.log(appData.addExpenses.map(arrItem => `${arrItem[0].
//   toUpperCase()}${arrItem.slice(1)}`).join(', '));

let currentDate = dateStr.toLocaleString("ru", options).split(', ');

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
      lastMinute = minutes[1],
      hoursWord = '',
      minutesWord = '';
  if (hours === '1' || hours === '21') {
    hoursWord = ' час';
    } else if ((hours > '1' && hours < 5) || (hours > 21 && hours < 24) ) {
      hoursWord = ' часа';
      } else {
        hoursWord = ' часов';
      }
  if (lastMinute > '1' || lastMinute < '5') {
        minutesWord = ' минуты';
    } else if ((lastMinute === '1')) {
      minutesWord = ' минута';
      } else {
        minutesWord = ' минут';
      }
  return hours + hoursWord + minutes;
}

let day = dayTransform(currentDate);
let date = dateTransform(currentDate);
let time = timeTransform(currentDate);
let hours = timeWordsTransform(time);
console.log(hours);

let resultDate = `Сегодня ${day}, ${date}, ${time}`;
console.log(resultDate);
