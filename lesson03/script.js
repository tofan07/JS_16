'use strict';
let money,
    income = 'кураторство',
    addExpenses = 'Топливо, Продукты, Связь',
    deposit = true,
    mission = 120000, 
    period = 6,
    expenses1 = '',
    expenses2 = '',
    amount1 = '',
    amount2 = '',
    budgetMonth = '',
    budgetDay = '';

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцам,\nцель заработать ${mission} рублей`);

money = prompt('Ваш месячный доход?', '60000');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
 'Лицензионное ПО, Связь, Кино').split(', ');
console.log(addExpenses);

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов.', 'Коммунальные платежи');
amount1 = +prompt('Во сколько это обойдется?', '20000');
expenses2 = prompt('Введите обязательную статью расходов.', 'Бензин');
amount2 = +prompt('Во сколько это обойдется?', '10000');

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
