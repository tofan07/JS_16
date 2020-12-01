'use strict';

document.body.innerHTML = `
  <div class="date">
    <h2 class="first"></h2>
    <h2 class="second"></h2>
  </div>`;

let dateWrap = document.querySelector('.first');
let dateWrap2 = document.querySelector('.second');
dateWrap.style = 'color:tomato';
dateWrap2.style = 'color:tomato';

// Вариант вывода a
function showDate() {
  let date1 = new Date(),
    year = date1.getFullYear(),
    hour = date1.getHours(),
    minutes = date1.getMinutes(),
    seconds = date1.getSeconds(),
    options = { day: 'numeric', month: 'long',},
    month = date1.toLocaleString("ru", options),
    currentDay = date1.toLocaleString("ru", {weekday: 'long'});

  function dayUppercasing(date) {
    let weekday = date[0].toUpperCase() + date.slice(1);
    return weekday;
  }
  let day = dayUppercasing(currentDay);

  function wordsTransform(h, min, sec) {  
    let testH = h % 10,
        testMin = min % 10,
        testSec = sec % 10,
        hWord, 
        minWord, 
        secWord;

    if (h > 10 && h < 20 || h === 0) { hWord = ' часов '; }
    if (testH > 1 && testH < 4) { hWord = ' часа '; }
    if (testH === 1) { hWord = ' час '; }

    if (min > 10 && min < 21 || testMin >= 5 && testMin <= 9 || testMin === 0) {
      minWord = ' минут '; 
      } else if (testMin > 1 && testMin < 5) { minWord = ' минуты '; }
    if (testMin === 1 && min !== 11) { minWord = ' минута '; }

    if (sec > 10 && sec < 20 || testSec >= 5 && testSec <= 9 || testSec === 0) { 
      secWord = ' секунд '; 
      } else if (testSec > 1 && testSec < 5) { secWord = ' секунды '; }
    if (testSec === 1 && sec !== 11) { secWord = ' секунда '; }
    
    let time = h + hWord + min + minWord + sec + secWord;
    return time;
  }

  let currentDate = `Сегодня ${day}, ${month} ${year} года,
   ${wordsTransform(hour, minutes, seconds)}`;

  function dateOutput() {
    dateWrap.textContent = currentDate;
  }

  dateOutput();
}

showDate();

setInterval(() => {
  showDate();
}, 1000);

// Вариант вывода б
function showDate2() {
  let date2 = new Date(),
    year2 = date2.getFullYear(),
    month2 = date2.getMonth() + 1,
    day2 = date2.getDate(),
    hour2 = date2.getHours(),
    minutes2 = date2.getMinutes(),
    seconds2 = date2.getSeconds(),
    dateArr = [day2, month2, hour2, minutes2, seconds2];
    
  function addZero() {
    for (let i = 0; i < 5; i++) {
      if (dateArr[i] < '10') {
        dateArr[i] = '0' + dateArr[i];
      }
    }
    return dateArr;
  }
  dateArr = addZero();
  let currentDate2 = `${dateArr[0]}.${dateArr[1]}.${year2} - ${dateArr[2]}:${dateArr[3]}:${dateArr[4]}`;
  function dateOutput2() {
    dateWrap2.textContent = currentDate2;
  }

  dateOutput2();
}

showDate2();

setInterval(() => {
  showDate2();
}, 1000);