let  money,
    income,
    addExpenses,
    deposit,
    mission, 
    period;

// Задание 1.1
money = 60000;
console.log('money: ', money);

// Задание 1.2
income = 'кураторство';
console.log('income: ', income);

// Задание 1.3
addExpenses = 'Топливо, Продукты, Связь';
console.log('addExpenses: ', addExpenses);

// Задание 1.4
deposit = true;
console.log('deposit: ', deposit);

// Задание 1.5
mission = 120000;
console.log('mission: ', mission);

// Задание 1.6
period = 12;
console.log('period: ', period);

// Задание 2.1
console.log('type of "money": ', typeof(money));
console.log('type of "income": ', typeof(income));
console.log('type of "deposit": ', typeof(deposit));

// Задание 2.2
console.log('length of string addExpenses: ', addExpenses.length);

// Задание 2.3
console.log(`Период равен ${period} месяцам`);
console.log(`Цель заработать ${mission} рублей`);

// Задание 2.4
let strExpenses = addExpenses.toLowerCase();
console.log(strExpenses.split(', '));

// Задание 2.5
let budgetDay = money / 30;

//Задание 2.6
console.log('budgetDay: ', budgetDay);


