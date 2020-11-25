'use strict';

//Задание 1
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
for (let i = 0; i < 100; i++) {
  console.log(`${i} Делители этого числа: 1 и ${i}`);
}