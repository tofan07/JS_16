'use strict';
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    resultsValue = document.getElementsByClassName('result-total'),
    budgetMonthValue = resultsValue[0],
    budgetDayValue = resultsValue[1],
    expensesMonthValue = resultsValue[2],
    additionalIncomeValue = resultsValue[3],
    additionalExpensesValue = resultsValue[4],
    incomePeriodValue = resultsValue[5],
    targetMonthValue = resultsValue[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

const isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };

let appData = {
      income: {},
      incomeMonth: 0,
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      start: function() {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getIncome();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
      },
      showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', () => {
          incomePeriodValue.value = appData.calcPeriod();
        });
      },
      addExpensesBlock: function() {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
          expensesPlus.style.display = 'none';
        }
      },
      getExpenses: function() {
        expensesItems.forEach(function(item) {
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = +item.querySelector('.expenses-amount').value;
          if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
          }
        });
      },
      getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== '') {
            appData.addExpenses.push(item);
          }
        });
      },
      addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
          incomePlus.style.display = 'none';
        }
      },
      getIncome: function() {
        incomeItems.forEach(function(item) {
          let itemIncome = item.querySelector('.income-title').value;
          let cashIncome = +item.querySelector('.income-amount').value;
          if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
          }
          for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
          }
        });
      },
      getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
          let itemValue = item.value.trim();
          if (itemValue !== '') {
            appData.addIncome.push(itemValue);
          }
        });
      },
      getExpensesMonth: function() {
        for (let key in appData.expenses) {
          appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
      },
      getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
      getTargetMonth: function() {
          return targetAmount.value / appData.budgetMonth;
      },
      getStatusIncome: function () {
        switch (true) {
          case (appData.budgetDay >= 1200):
            return ('У вас высокий уровень дохода!');
          case (appData.budgetDay >= 600 && appData.budgetDay < 1200):
            return ('У вас средний уровень дохода!');
          case (appData.budgetDay >= 0 && appData.budgetDay < 600):
            return ('У вас низкий уровень дохода!');
          default:
            return ('Что-то пошло не так!');
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
      calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
      }
};

start.setAttribute('disabled', 'true');

salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value === '') {
    start.setAttribute('disabled', 'true');
  } else {
    start.removeAttribute('disabled', 'true');
  }
});

start.addEventListener('click', () => {
  appData.start();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', () => {
  periodAmount.textContent = periodSelect.value;
});

appData.getStatusIncome();