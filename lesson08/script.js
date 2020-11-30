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
      percentDeposit: 0,
      moneyDeposit: 0,
      mission: 100000,
      period: 6,
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      asking: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getInfoDeposit();
        let itemIncome,
            cashIncome;
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
           do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такси');
           } while (isNumber(itemIncome) || itemIncome === null);
          do {
            cashIncome = prompt('Сколько это приносит в месяц?', 10000);
          } while (!isNumber(cashIncome));
          appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
        'Кино, Домино, Лыжи');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        // console.log('Возможные расходы за месяц', appData.addExpenses);
        let key, value;
        
        for (let i = 0; i < 3; i++) {
          do {
            key = prompt('Введите обязательную статью расходов.', "Коммунальные платежи");
           } while (isNumber(key) || key === null);

          do {
            value = prompt('Во сколько это обойдется?', '5000');
          }
          while (!isNumber(value));
          key = key.toLowerCase();
          appData.expenses[key] = +value;
        }
        // console.log('Обязательные расходы за месяц', appData.expenses);
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
      },
      getInfoDeposit: function() {
        if (appData.deposit) {
          do {
            appData.percentDeposit = prompt('Какой годовой процент по депозиту?', 10);
          }
          while (!isNumber(appData.percentDeposit));

          do {
            appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
          }
          while (!isNumber(appData.moneyDeposit));
        }
      },
      calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
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
console.log(appData.addExpenses.map(arrItem => `${arrItem[0].
  toUpperCase()}${arrItem.slice(1)}`).join(', '));
