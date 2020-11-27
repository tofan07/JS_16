'use strict';

let money,
    isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = function() {
      do { money = prompt('Ваш месячный доход?'); }
      while (!isNumber(money));
    };

start();

let appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      mission: 100000,
      period: 6,
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      asking: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
        'Кино, Домино, Лыжи');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        let key, value;
        for (let i = 0; i < 3; i++) {
          key = prompt('Введите обязательную статью расходов.', "Коммунальные платежи").toLowerCase();
          do {
            value = prompt('Во сколько это обойдется?', '5000');
          }
          while (!isNumber(value));
          appData.expenses[key] = +value;
        }
        console.log(appData.expenses);
      },
      getExpensesMonth: function() {
        for (let key in this.expenses) {
          this.expensesMonth += this.expenses[key];
        }
        console.log(`Расходы за месяц: ${this.expensesMonth} руб.`);
        return this.expensesMonth;
      },
      getBudget: function() {
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
      },
      getTargetMonth: function() {
        let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
          if (targetMonth < 0) {
            console.log(`Цель не будет достигнута!`);
          } else {
            console.log(`Цель может быть достигнута через ${targetMonth} мес.`);
          }
          return targetMonth;
      },
      getStatusIncome: function () {
        switch (true) {
          case (appData.budgetDay >= 1200):
            console.log('У вас высокий уровень дохода!');
            break;
          case (appData.budgetDay >= 600 && appData.budgetDay < 1200):
            console.log('У вас средний уровень дохода!');
            break;
          case (appData.budgetDay >= 0 && appData.budgetDay < 600):
            console.log('У вас низкий уровень дохода!');
            break;
          default:
            console.log('Что-то пошло не так!');
        }
      }
};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Наша программа содержит данные:');
for (let prop in appData) {
  console.log(prop + ': ' + appData[prop]);
}

