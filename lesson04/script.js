'use strict';
let money = +prompt('Ваш месячный доход?', 60000),
    income = 'кураторство',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
                          'Лицензионное ПО, Связь, Кино'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 120000, 
    period = 6,
    expenses1 = prompt('Введите обязательную статью расходов.', 'Коммунальные платежи'),
    amount1 = +prompt('Во сколько это обойдется?', '18300'),  
    expenses2 = prompt('Введите обязательную статью расходов.', 'Бензин'),
    amount2 = +prompt('Во сколько это обойдется?', '15000');

let showTypeOf = function(data) {
  console.log(typeof(data));
};
// 1
function getExpensesMonth(amountExp1, amountExp2){
  return amountExp1 + amountExp2;
}
// 2
function getAccumulatedMonth (moneyValue, expMonth){
  return moneyValue - expMonth;
}
// 3
let accumulatedMonth = getAccumulatedMonth(money, (
  getExpensesMonth(amount1, amount2)
  )
);
// 4
function getTargetMonth (missionValue, accumulatedValue) {
  return Math.ceil(missionValue / accumulatedValue);
}
// 6
let budgetDay = Math.ceil(accumulatedMonth / 30);

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
// 7
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Расходы за месяц: ${getExpensesMonth(amount1, amount2)} руб.`);
console.log('Список возможных расходов:', addExpenses.split(', '));
console.log(`Цель может быть достигнута через ${getTargetMonth(mission, accumulatedMonth)} мес.`);
console.log(`Бюджет на день: ${budgetDay} руб.`);

getStatusIncome();