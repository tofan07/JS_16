'use strict';
// Создаем переменную с целым числом
let num = 266219;
// Преобразуем в строку
num = num.toString();
let total = 1;
// Перемножаем
for (let item of num) {
  total *= item;
}
//Выводим результат
console.log(total);

// Возводим результат в степень 3
total **= 3;
console.log(total);
//Преобразуем в строку
total = total.toString();
// Выводим первые две цифры полученного результата
console.log(total.slice(0, 2));
