'use strict';
let start = document.getElementById('start'),
    resetBtn = document.getElementById('cancel'),
    data = document.querySelector('.data'),
    dataInputs = data.querySelectorAll('input[type=text]'),
    result = document.querySelector('.result'),
    resultsInputs = result.querySelectorAll('input[type=text]'),
    allInputs = document.querySelectorAll('input'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheckbox = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    resultsValue = document.getElementsByClassName('result-total'),
    budgetMonthValue = resultsValue[0],
    budgetDayValue = resultsValue[1],
    expensesMonthValue = resultsValue[2],
    additionalIncomeValue = resultsValue[3],
    additionalExpensesValue = resultsValue[4],
    incomePeriodValue = resultsValue[5],
    targetMonthValue = resultsValue[6],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitles = document.querySelectorAll('input.income-title'),
    incomeAmounts = document.querySelectorAll('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitles = document.querySelectorAll('input.expenses-title'),
    expensesAmounts = document.querySelectorAll('.expenses-amount'),
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
      startBtnConditionChange: function() {
        start.setAttribute('disabled', 'true');
        salaryAmount.addEventListener('input', () => {
          salaryAmount.value = salaryAmount.value.replace((/[^\d]/), '');
          if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
          } else {
            start.removeAttribute('disabled');
          }
        });
      },
      start: function() {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getIncome();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.disableInputs();
        this.disablePlusBtns();
        this.showResetBtn();
      },
      reset: function() {
        this.resetInputs();
        this.resetResults();
        this.removeExpensesBlock();
        this.removeIncomeBlock();
        this.startBtnConditionChange();
        this.enablePlusBtns();
        this.resetItems();
      },
      showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
          incomePeriodValue.value = this.calcPeriod();
        });
      },

      showStartBtn: function() {
        start.style.display = 'block';
        resetBtn.style.display = 'none';
      },
      showResetBtn: function() {
        start.style.display = 'none';
        resetBtn.style.display = 'block';
        resetBtn.addEventListener('click', () => {
          this.reset();
          this.showStartBtn();
        });
      },
      resetItems: function () {
          let defaults = {
             '[object Object]': {},
             '[object Array]': [],
             '[object String]': '',
             '[object Boolean]': false,
             '[object Number]': 0,
          };
          
          for (let key in appData){
            if (appData.hasOwnProperty(key) && Object.prototype.toString.call(appData[key]) !== '[object Function]') {
                appData[key] = defaults[Object.prototype.toString.call(appData[key])];
            }
          }
      },
      enablePlusBtns: function() {
        expensesPlus.removeAttribute('disabled');
        incomePlus.removeAttribute('disabled');
      },
      disablePlusBtns: function() {
        expensesPlus.setAttribute('disabled', 'true');
        incomePlus.setAttribute('disabled', 'true');
      },
      disableInputs: function() {
        dataInputs = data.querySelectorAll('input[type=text]');
        dataInputs.forEach(function(item) {
          item.setAttribute('disabled', 'true');
        });
        depositCheckbox.setAttribute('disabled', 'true');
      },
      resetInputs: function() {
        dataInputs = data.querySelectorAll('input[type=text]');

        dataInputs.forEach(function(item) {
          item.removeAttribute('disabled');
          item.value = '';
        });
        depositCheckbox.removeAttribute('disabled');
        if (depositCheckbox.checked) {
          depositCheckbox.checked = false;
        }

        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
      },
      resetResults: function() {
        resultsInputs = result.querySelectorAll('input[type=text]');
        resultsInputs.forEach(function(item) {
          item.value = '';
        });
      },
      addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
          item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
          expensesPlus.style.display = 'none';
        }
      },
      removeExpensesBlock: function() {
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
          for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].remove();
          }
          expensesPlus.style.display = 'block';
        }
      },
      getExpenses: function() {
        expensesItems.forEach(function(item) {
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = +item.querySelector('.expenses-amount').value;
          if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
          }
        }, this);
      },
      checkExpensesValues: function() {
        expensesTitles = document.querySelectorAll('input.expenses-title');
        expensesTitles.forEach(function(item) {
          item.addEventListener('input', () => {
            item.value = item.value.replace((/\w/i), '');
          });
        });

        expensesAmounts = document.querySelectorAll('.expenses-amount');
        expensesAmounts.forEach(function(item) {
          item.addEventListener('input', () => {
            item.value = item.value.replace((/[^\d]/), '');
          });
        });
      },
      getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== '') {
            this.addExpenses.push(item);
          }
        }, this);
      },
      addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
          item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
          incomePlus.style.display = 'none';
        }
      },
      removeIncomeBlock: function() {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
          for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].remove();
          }
          incomePlus.style.display = 'block';
        }
      },
      getIncome: function() {
        incomeItems.forEach(function(item) {
          let itemIncome = item.querySelector('.income-title').value;
          let cashIncome = +item.querySelector('.income-amount').value;

          if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
          }

          this.incomeMonth = 0;
          for (let key in this.income) {
            this.incomeMonth += +this.income[key];
          }
        }, this);
      },
      checkIncomeValues: function() {
        incomeTitles = document.querySelectorAll('input.income-title');
        incomeTitles.forEach(function(item) {
          item.addEventListener('input', () => {
            item.value = item.value.replace((/\w/i), '');
          });
        });
        
        incomeAmounts = document.querySelectorAll('.income-amount');
        incomeAmounts.forEach(function(item) {
          item.addEventListener('input', () => {
            item.value = item.value.replace((/[^\d]/), '');
          });
        });
      },
      getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
          let itemValue = item.value.trim();
          if (itemValue !== '') {
            this.addIncome.push(itemValue);
          }
        }, this);
      },
      checkAddIncomeValues: function() {
        additionalIncomeItems.forEach(function(item) {
          item.addEventListener('input', () => {
            item.value = item.value.replace((/\w/i), '');
          });
        });
      },
      getExpensesMonth: function() {
        for (let key in this.expenses) {
          this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
      },
      getBudget: function() {
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
      },
      getTargetMonth: function() {
          return targetAmount.value / this.budgetMonth;
      },
      getStatusIncome: function () {
        switch (true) {
          case (this.budgetDay >= 1200):
            return ('У вас высокий уровень дохода!');
          case (this.budgetDay >= 600 && this.budgetDay < 1200):
            return ('У вас средний уровень дохода!');
          case (this.budgetDay >= 0 && this.budgetDay < 600):
            return ('У вас низкий уровень дохода!');
          default:
            return ('Что-то пошло не так!');
        }
      },
      getInfoDeposit: function() {
        if (this.deposit) {
          do {
            this.percentDeposit = prompt('Какой годовой процент по депозиту?', 10);
          }
          while (!isNumber(this.percentDeposit));

          do {
            this.moneyDeposit = prompt('Какая сумма заложена', 10000);
          }
          while (!isNumber(this.moneyDeposit));
        }
      },
      calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
      }

};

start.setAttribute('disabled', 'true');
appData.startBtnConditionChange();
start.addEventListener('click', () => {
  appData.start();
});


appData.checkExpensesValues();

expensesPlus.addEventListener('click', () => {
  appData.addExpensesBlock();
  appData.checkExpensesValues();
});

appData.checkIncomeValues();
incomePlus.addEventListener('click', () => { 
  appData.addIncomeBlock();
  appData.checkIncomeValues();
});

appData.checkAddIncomeValues();

periodSelect.addEventListener('input', () => {
  periodAmount.textContent = periodSelect.value;
});

appData.getStatusIncome();