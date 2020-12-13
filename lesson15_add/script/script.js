'use strict';
const start = document.getElementById('start'),
	resetBtn = document.getElementById('cancel'),
	data = document.querySelector('.data'),
	result = document.querySelector('.result'),
	btnPlus = document.getElementsByTagName('button'),
	incomePlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	depositCheckbox = document.querySelector('#deposit-check'),
	budgetMonthValue = document.querySelector('.budget_month-value'),
	budgetDayValue = document.querySelector('.budget_day-value'),
	expensesMonthValue = document.querySelector('.expenses_month-value'),
	additionalIncomeValue = document.querySelector('.additional_income-value'),
	additionalExpensesValue = document.querySelector('.additional_expenses-value'),
	incomePeriodValue = document.querySelector('.income_period-value'),
	targetMonthValue = document.querySelector('.target_month-value'),
	salaryAmount = document.querySelector('.salary-amount'),
	additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	additionalIncomeItems = document.querySelectorAll('.additional_income-item');

let	incomeItems = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
	constructor() {
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
	}

	start() {
		this.budget = +salaryAmount.value;
	
		this.getExpInc();
		this.getExpensesMonth();
		// this.getAddExpenses();
		// this.getAddIncome();
		this.getAddExpInc('expenses');
		this.getAddExpInc('income');
		this.getBudget();
	
		this.showResult();
		this.disableInputs();
		this.disablePlusBtns();
		this.showResetBtn();
	}

	check() {
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
	}
	
	reset() {
		this.resetInputs();
		this.resetResults();
		this.removeExpensesBlock();
		this.removeIncomeBlock();
		this.check();
		this.enablePlusBtns();
		this.resetItems();
	}
	
	showResult() {
	
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
	}
	
	showStartBtn() {
		start.style.display = 'block';
		resetBtn.style.display = 'none';
	}
	
	showResetBtn() {
		start.style.display = 'none';
		resetBtn.style.display = 'block';
		resetBtn.addEventListener('click', () => {
			this.reset();
			this.showStartBtn();
		});
	}
	
	resetItems () {
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
	}
	
	enablePlusBtns() {
		expensesPlus.removeAttribute('disabled');
		incomePlus.removeAttribute('disabled');
	}
	
	disablePlusBtns() {
		expensesPlus.setAttribute('disabled', 'true');
		incomePlus.setAttribute('disabled', 'true');
	}
	
	disableInputs() {
		let dataInputs = data.querySelectorAll('input[type=text]');
		dataInputs.forEach((item) => {
			item.setAttribute('disabled', 'true');
		});
		depositCheckbox.setAttribute('disabled', 'true');
	}
	
	resetInputs() {
		let dataInputs = data.querySelectorAll('input[type=text]');
	
		dataInputs.forEach((item) => {
			item.removeAttribute('disabled');
			item.value = '';
		});
		depositCheckbox.removeAttribute('disabled');
		if (depositCheckbox.checked) {
			depositCheckbox.checked = false;
		}
	
		periodSelect.value = 1;
		periodAmount.textContent = periodSelect.value;
	}
	
	resetResults() {
		let resultsInputs = result.querySelectorAll('input[type=text]');
		resultsInputs.forEach((item) => {
			item.value = '';
		});
	}

	addExpIncBlock(itemClass) {
		const expIncItems = document.querySelectorAll(`.${itemClass}-items`);
		const btn = document.querySelector(`.${itemClass}_add`);
		const cloneItem = document.querySelector(`.${itemClass}-items`).cloneNode(true);

		cloneItem.querySelectorAll('input').forEach(item => item.value = '');

		expIncItems[0].parentNode.insertBefore(cloneItem, btn);
		if (expIncItems.length === 2) {
			btn.style.display = 'none';
		}

		incomeItems = document.querySelectorAll('.income-items');
		expensesItems = document.querySelectorAll('.expenses-items');

		this.checkExpensesValues();
		this.checkIncomeValues();
	}

	removeExpensesBlock() {
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length > 1) {
			for (let i = 1; i < expensesItems.length; i++) {
			expensesItems[i].remove();
			}
			expensesPlus.style.display = 'block';
		}
	}
	
	getExpInc() {
		const count = item => {
			const startStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = +item.querySelector(`.${startStr}-amount`).value;

			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = itemAmount;
				}
		};

		expensesItems.forEach(count);
		incomeItems.forEach(count);

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
			}
	}

	checkExpensesValues() {
		let expensesTitles = document.querySelectorAll('input.expenses-title');
		expensesTitles.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/\w/i), '');
			});
		});
	
		let expensesAmounts = document.querySelectorAll('.expenses-amount');
		expensesAmounts.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/[^\d]/), '');
			});
		});

		additionalExpensesItem.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/\w/i), '');
			});
		});

		targetAmount.addEventListener('input', () => {
			targetAmount.value = targetAmount.value.replace((/[^\d]/), '');
			});
	}
	
	getAddExpInc(itemClass) {
		const input = document.querySelectorAll(`.additional_${itemClass}-item`);

		input.forEach(item => {
			let itemValue = item.value.trim();
			if (itemValue === '') {
				return;
				} else if (itemClass === 'expenses') {
				this.addExpenses.push(itemValue);
					} else {this.addIncome.push(itemValue);}
			
		});
	}

	removeIncomeBlock() {
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length > 1) {
			for (let i = 1; i < incomeItems.length; i++) {
			incomeItems[i].remove();
			}
			incomePlus.style.display = 'block';
		}
	}
	
	checkIncomeValues() {
		let incomeTitles = document.querySelectorAll('input.income-title');
		incomeTitles.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/\w/i), '');
			});
		});
	
		let incomeAmounts = document.querySelectorAll('.income-amount');
		incomeAmounts.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/[^\d]/), '');
			});
		});
	}
	
	checkAddIncomeValues() {
		additionalIncomeItems.forEach((item) => {
			item.addEventListener('input', () => {
			item.value = item.value.replace((/\w/i), '');
			});
		});
	}
	
	getExpensesMonth() {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
		return this.expensesMonth;
	}
	
	getBudget() {
		this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	
	getTargetMonth() {
		return targetAmount.value / this.budgetMonth;
	}
	
	getStatusIncome () {
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
	}
	
	getInfoDeposit() {
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
	}
	
	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}
	
	eventListeners() {
		expensesPlus.addEventListener('click', () => {
			this.addExpIncBlock('expenses');
		});
		incomePlus.addEventListener('click', () => {
			this.addExpIncBlock('income');
		});
		start.addEventListener('click', this.start.bind(this));
	}
}

const appData = new AppData();

appData.check();
appData.checkExpensesValues();
appData.checkAddIncomeValues();
appData.checkIncomeValues();
appData.eventListeners();
appData.getStatusIncome();