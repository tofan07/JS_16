let  money = 60000,
    income = 'кураторство',
    addExpenses = 'Топливо, Продукты, Связь',
    deposit = true,
    mission = 120000, 
    period = 12;

console.log('money: ', money);
console.log('income: ', income);
console.log('addExpenses: ', addExpenses);
console.log('deposit: ', deposit);
console.log('mission: ', mission);
console.log('period: ', period);

// Задание 2.1
console.log('type of "money": ', typeof(money));
console.log('type of "income": ', typeof(income));
console.log('type of "deposit": ', typeof(deposit));
console.log('length of string addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцам, цель заработать ${mission} рублей`);

// Задание 2.4
let strExpenses = addExpenses.toLowerCase();
console.log(strExpenses.split(', '));

// Задание 2.5
let budgetDay = money / 30;

//Задание 2.6
console.log('budgetDay: ', budgetDay);


