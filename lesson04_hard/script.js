'use strict';

let str = prompt('Введите любую фразу', 'Ехал Грека через реку, Видит Грека – в реке рак. Сунул Грека руку в реку, - Рак за руку Греку ЦАП !'),
    strOutput = '';

let stringCheck = function (str) {
  if (typeof(str) === 'string') {
    strOutput = str.trim();
    if (strOutput.length > 30) {
      strOutput = strOutput.slice(0, 30) + '...';}
      } else {
        alert('Это не строка!!!');
  }
  return strOutput;
};

stringCheck(str);
console.log(strOutput);
