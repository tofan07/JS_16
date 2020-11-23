'use strict';
// Задание 1
let lang = 'en';
let days,
    daysRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// через if
  if (lang === 'ru') {
    days = daysRu;
  } else if (lang === 'en') {
    days = daysEn;
  } else {
    days = 'Неверное значение';
  }
console.log(days);

// через switch case
switch (lang) {
  case 'ru':
    days = daysRu;
    break;
  case 'en':
    days = daysEn;
    break;
  default:
    days = 'Неверное значение';
}
console.log(days);

// Через многомерный массив
days = {
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
console.log(days[lang]);

// Задание 2
let namePerson = 'Иван';

let rank = (namePerson === 'Артем') ? 'Директор' : ((namePerson === 'Максим') ? 'Преподаватель' : 'Студент');
console.log('rank: ', rank);



