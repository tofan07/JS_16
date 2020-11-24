'use strict';
let money = +prompt('Ваш месячный доход?', 60000),
    income = 'кураторство',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
                          'Лицензионное ПО, Связь, Кино'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 120000, 
    period = 6,
    expenses1 = '',
    expenses2 = '',
    amount1 = '',
    amount2 = '',
    budgetDay = '',
    accumulatedMonth = 0,
    showTypeOf = function(data) {console.log(typeof(data));};

/* Не совсем понял должны ли передаваться параметры в функцию, поэтому сделал 2
варианта, оба работают. */

// Вариант 1. Параметры передаются в функцию при вызове

// function getExpensesMonth(a, b){return a + b;}
// function getAccumulatedMonth (a, b){return a - b;}
// function getTargetMonth (a, b) {return Math.round(a / b);}
// accumulatedMonth = getAccumulatedMonth(money, (getExpensesMonth(amount1, amount2)));

// Вариант 2. В функцию изначально занесены переменные

function getExpensesMonth() {return amount1 + amount2;}
function getAccumulatedMonth() {return money - getExpensesMonth();}
function getTargetMonth() {return Math.round(money / getExpensesMonth());}
accumulatedMonth = getAccumulatedMonth();

function getStatusIncome() {
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
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.split(', '));
console.log(`Период равен ${period} месяцам,\nцель заработать ${mission} рублей`);

expenses1 = prompt('Введите обязательную статью расходов.', 'Коммунальные платежи');
amount1 = +prompt('Во сколько это обойдется?', '18300');
expenses2 = prompt('Введите обязательную статью расходов.', 'Бензин');
amount2 = +prompt('Во сколько это обойдется?', '15000');

// Вызов для варианта 1
// console.log(getTargetMonth(mission, accumulatedMonth));

// Вызов для варианта 2
console.log(accumulatedMonth);
console.log(getTargetMonth());

budgetDay = Math.ceil(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);
getStatusIncome();




