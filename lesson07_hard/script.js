'use strict';
let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

let date = new Date();

let today = date.getDay() - 1;

console.log(today);
function daysShow() {
  for (let i = 0; i < 7; i++) {
    if (i >= 5 && i !== today) {
      document.body.innerHTML += '<p><i>' + week[i] + '</i></p>';
      } else if (i < 5 && i === today) {
        document.body.innerHTML += '<p><b>' + week[i] + '</b></p>';
        } else if (i < 5) {
          document.body.innerHTML += '<p>' + week[i] + '</p>';
          } else if (i >= 5 && i === today){
            document.body.innerHTML += '<p><b><i>' + week[i] + '</i></b></p>';
            } 
    }
 
}

daysShow();