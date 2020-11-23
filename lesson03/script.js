'use strict';
let  money = 60000,
    income = 'кураторство',
    addExpenses = 'Топливо, Продукты, Связь',
    deposit = true,
    mission = 120000, 
    period = 6;

// console.log('money: ', money);
// console.log('income: ', income);
// console.log('addExpenses: ', addExpenses);
// console.log('deposit: ', deposit);
// console.log('mission: ', mission);
// console.log('period: ', period);
// Задание 2.1
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцам,\nцель заработать ${mission} рублей`);
// Задание 2.4
// let strExpenses = addExpenses.toLowerCase();
// console.log(strExpenses.split(', '));
// Задание 2.5
let budgetDay = money / 30;
// //Задание 2.6
// console.log('budgetDay: ', budgetDay);

// Урок №3
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.').split(', ');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов.'),
    expenses2 = prompt('Введите обязательную статью расходов.'),
    amount1 = +prompt('Во сколько это обойдется?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = amount1 + amount2;

console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за:', Math.ceil(mission / budgetMonth), 'месяцев');
budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

switch (true) {
  case (budgetDay >= 1200):
    console.log('У вас высокий уровень дохода!');
    break;
  case (budgetDay >= 600 && budgetDay < 1200):
    console.log('У вас средний уровень дохода!');
    break;
  case (budgetDay >= 0 && budgetDay < 600):
    console.log('У вас низкий уровень дохода!');
    break;
  default:
    console.log('Что-то пошло не так!');
}
