'use strict';
// Создаем переменную с целым числом
let num = 266219;
// Разбиваем число на массив строк
let numsArr = ('' + num).split('');
// Создаем пустой массив
let intArr = [];
// С помощью цикла преобразуем строки в числа
for (let i = 0; i <= numsArr.length - 1; i++) {
  intArr.push(parseInt(numsArr[i]));
}

// С помощью метода перебора reduce перемножаем элементы массива
const result = intArr.reduce(function(mult, current) {
  return mult * current;
}, 1);
// Выводим результат
console.log( result );

// Возводим результат в степень 3
let exp = result;
exp **= 3;
console.log(exp);

// Выводим первые две цифры полученного результата
let expResultArr = exp.toString();
console.log(expResultArr.slice(0, 2));

