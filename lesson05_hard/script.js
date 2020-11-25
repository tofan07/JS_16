'use strict';

// //Задание 1
let arr = [];

let arrPush = function () {

  for ( let i = 0; i < 7; i++) {
    arr[i] = prompt('Введите любое многозначное число', 23441515);
    let firstSym = arr[i].slice(0, 1);
    if (firstSym === '2' || firstSym === '4') {
      console.log(arr[i]);
    }
  }
  return arr;
};

arrPush();
console.log(arr);

// Задание 2
alert('Сейчас в консоль выведется столбец простых чисел с их делителями');

start:
for(let i = 2; i < 100; i++) {
  for(let n = 2; n < i; n++) {
    if (i % n === 0) {
      continue start;
    }
  }
  console.log(`${i} Делители данных чисел: 1 и ${i}`);
}