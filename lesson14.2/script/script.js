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

const AppData = function() {
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];
	this.deposit = false;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
};

AppData.prototype.check = function() {
	start.setAttribute('disabled', 'true');
	salaryAmount.addEventListener('input', () => {
		salaryAmount.value = salaryAmount.value.replace((/[^\d]/), '');
		if (salaryAmount.value === '') {
		start.setAttribute('disabled', 'true');
		} else {
		start.removeAttribute('disabled');
		}
	});
	periodSelect.addEventListener('input', () => {
		periodAmount.textContent = periodSelect.value;
	});
};

AppData.prototype.start = function() {
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
};

AppData.prototype.reset = function() {
	this.resetInputs();
	this.resetResults();
	this.removeExpensesBlock();
	this.removeIncomeBlock();
	this.check();
	this.enablePlusBtns();
	this.resetItems();
};

AppData.prototype.showResult = function() {
	const _this = this;
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	additionalExpensesValue.value = this.addExpenses.join(', ');
	additionalIncomeValue.value = this.addIncome.join(', ');
	targetMonthValue.value = Math.ceil(this.getTargetMonth());
	incomePeriodValue.value = this.calcPeriod();
	periodSelect.addEventListener('input', () => {
		incomePeriodValue.value = _this.calcPeriod();
	});
};

AppData.prototype.showStartBtn = function() {
	start.style.display = 'block';
	resetBtn.style.display = 'none';
};

AppData.prototype.showResetBtn = function() {
	const _this = this;
	start.style.display = 'none';
	resetBtn.style.display = 'block';
	resetBtn.addEventListener('click', () => {
		_this.reset();
		_this.showStartBtn();
	});
};

AppData.prototype.resetItems = function () {
	let defaults = {
		'[object Object]': {},
		'[object Array]': [],
		'[object String]': '',
		'[object Boolean]': false,
		'[object Number]': 0,
	};
	
	for (let key in this){
		if (this.hasOwnProperty(key) && AppData.prototype.toString.call(this[key]) !== '[object Function]') {
			this[key] = defaults[AppData.prototype.toString.call(this[key])];
		}
	}
};

AppData.prototype.enablePlusBtns = function() {
	expensesPlus.removeAttribute('disabled');
	incomePlus.removeAttribute('disabled');
};

AppData.prototype.disablePlusBtns = function() {
	expensesPlus.setAttribute('disabled', 'true');
	incomePlus.setAttribute('disabled', 'true');
};

AppData.prototype.disableInputs = function() {
	dataInputs = data.querySelectorAll('input[type=text]');
	dataInputs.forEach(function(item) {
		item.setAttribute('disabled', 'true');
	});
	depositCheckbox.setAttribute('disabled', 'true');
};

AppData.prototype.resetInputs = function() {
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
};

AppData.prototype.resetResults = function() {
	resultsInputs = result.querySelectorAll('input[type=text]');
	resultsInputs.forEach(function(item) {
		item.value = '';
	});
};

AppData.prototype.addExpensesBlock = function() {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);

	cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
		item.value = '';
	});
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	expensesItems = document.querySelectorAll('.expenses-items');
	if (expensesItems.length === 3) {
		expensesPlus.style.display = 'none';
	}
	this.checkExpensesValues();
};

AppData.prototype.removeExpensesBlock = function() {
	expensesItems = document.querySelectorAll('.expenses-items');
	if (expensesItems.length > 1) {
		for (let i = 1; i < expensesItems.length; i++) {
		expensesItems[i].remove();
		}
		expensesPlus.style.display = 'block';
	}
};

AppData.prototype.getExpenses = function() {
	const _this = this;
	expensesItems.forEach(function(item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = +item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			_this.expenses[itemExpenses] = cashExpenses;
		}
	});
};

AppData.prototype.checkExpensesValues = function() {
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
};

AppData.prototype.getAddExpenses = function() {
	let addExpenses = additionalExpensesItem.value.split(',');
	const _this = this;

	addExpenses.forEach(function(item){
		item = item.trim();
		if (item !== '') {
		_this.addExpenses.push(item);
		}
	});
};

AppData.prototype.addIncomeBlock = function() {
	let cloneIncomeItem = incomeItems[0].cloneNode(true);

	cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
		item.value = '';
	});
	incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
	incomeItems = document.querySelectorAll('.income-items');
	if (incomeItems.length === 3) {
		incomePlus.style.display = 'none';
	}

	this.checkIncomeValues();
};

AppData.prototype.removeIncomeBlock = function() {
	incomeItems = document.querySelectorAll('.income-items');
	if (incomeItems.length > 1) {
		for (let i = 1; i < incomeItems.length; i++) {
		incomeItems[i].remove();
		}
		incomePlus.style.display = 'block';
	}
};

AppData.prototype.getIncome = function() {
	const _this = this;
	incomeItems.forEach(function(item) {
		let itemIncome = item.querySelector('.income-title').value;
		let cashIncome = +item.querySelector('.income-amount').value;

		if (itemIncome !== '' && cashIncome !== '') {
		_this.income[itemIncome] = cashIncome;
		}

		_this.incomeMonth = 0;
		for (let key in _this.income) {
		_this.incomeMonth += +_this.income[key];
		}
	});
};

AppData.prototype.checkIncomeValues = function() {
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
};

AppData.prototype.getAddIncome = function() {
	const _this = this;
	additionalIncomeItems.forEach(function(item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			_this.addIncome.push(itemValue);
		}
	});
};

AppData.prototype.checkAddIncomeValues = function() {
	additionalIncomeItems.forEach(function(item) {
		item.addEventListener('input', () => {
		item.value = item.value.replace((/\w/i), '');
		});
	});
};

AppData.prototype.getExpensesMonth = function() {
	for (let key in this.expenses) {
		this.expensesMonth += +this.expenses[key];
	}
	return this.expensesMonth;
};

AppData.prototype.getBudget = function() {
	this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
	return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getInfoDeposit = function() {
	if (this.deposit) {
		do {
			this.percentDeposit = prompt('Какой годовой процент по депозиту?', 10);
		} while (isNaN(this.percentDeposit) || this.percentDeposit === ' ' ||
		this.percentDeposit === '' || this.percentDeposit === null);

		do {
			this.moneyDeposit = prompt('Какая сумма заложена', 10000);
		} while (isNaN(this.moneyDeposit) || this.moneyDeposit === ' ' ||
		this.moneyDeposit === '' || this.moneyDeposit === null);
	}
};

AppData.prototype.calcPeriod = function() {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListeners = function() {
	start.addEventListener('click', this.start.bind(this));
	expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
	incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
};

const appData = new AppData();

appData.check();
appData.checkExpensesValues();
appData.checkAddIncomeValues();
appData.checkIncomeValues();
appData.eventListeners();
appData.getStatusIncome();