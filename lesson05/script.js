'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Кураторство',
    addExpenses,
    deposit,
    mission = 120000, 
    period = 6,
    expenses = [];

// Блок месячного дохода (money)
let start = function() {
  do { money = prompt('Ваш месячный доход?'); }
  while (!isNumber(money));
};
start();

// Блок deposit
deposit = confirm('Есть ли у вас депозит в банке?');

// Блок showTypeOf
let showTypeOf = function(item) {
  console.log(typeof(item));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Блок возможных расходов (addExpenses)
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
'Кино, Домино, Лыжи');
console.log('Список возможных расходов:', addExpenses.toLowerCase().split(', '));

// Блок обязательных расходов (expensesAmount)
let getExpensesMonth = function() {
  let sum = 0,
      sumTemp;

  for (let i = 0; i < 3; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов.', "Коммунальные платежи").toLowerCase();
    do {
      sumTemp = prompt('Во сколько это обойдется?', '5000');
    }
    while (!isNumber(sumTemp));
    sum += +sumTemp;
  }
  return sum;
};
let expensesAmount = getExpensesMonth();
console.log('Список обязательных расходов:', expenses);
console.log(`Расходы за месяц: ${expensesAmount} руб.`);

// Блок накоплений за месяц (accumulatedMonth)
let getAccumulatedMonth = function(){
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();

// Блок бюджета на день (budgetDay)
let budgetDay = Math.ceil(accumulatedMonth / 30);
console.log(`Бюджет на день: ${budgetDay} руб.`);

// Блок срока достижения цели (getTargetMonth)
let getTargetMonth = function() {
  let targetMonth = Math.ceil(mission / accumulatedMonth);

  if (targetMonth < 0) {
    console.log(`Цель не будет достигнута!`);
  } else {
    console.log(`Цель может быть достигнута через ${targetMonth} мес.`);
  }

  return targetMonth;
};
getTargetMonth();

// Блок оценки уровня дохода (getStatusIncome)
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
getStatusIncome();





