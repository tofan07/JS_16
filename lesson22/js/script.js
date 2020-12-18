'use strict';
document.addEventListener('DOMContentLoaded', () => {

	class Todo {
		constructor(form, input, todoList, todoCompleted, error, todoWrapper, todoListText, todoCompletedText, date) {
			this.form = document.querySelector(form);
			this.input = document.querySelector(input);
			this.todoList = document.querySelector(todoList);
			this.todoCompleted = document.querySelector(todoCompleted);
			this.todoError = document.querySelector(error);
			this.todoWrapper = document.querySelector(todoWrapper);
			this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
			this.listText = document.querySelector(todoListText);
			this.completedText = document.querySelector(todoCompletedText);
			this.date = document.querySelector(date);
		}

		showDate() {
			const date1 = new Date(),
				year = date1.getFullYear(),
				day = date1.toLocaleString("en", { day: 'numeric' }),
				month = date1.toLocaleString("en", { month: 'long' }),
				currentDay = date1.toLocaleString("en", { weekday: 'short' });

			let hour = date1.getHours(),
				minutes = date1.getMinutes();

			if (hour < 10) { hour = '0' + hour; }
			if (minutes < 10) { minutes = '0' + minutes; }

			const dayUppercasing = date => {
				const weekday = date[0].toUpperCase() + date.slice(1);
				return weekday;
			};

			const dayLong = dayUppercasing(currentDay);

			const currentDate = `
				<p class="calendar-date"><span class="word--red">
				Today is</span> ${dayLong},
				${day} ${month} ${year}</p>
				<p class="calendar-time">${hour} : <span class="word--red">${minutes}</span></p>
			`;

			const dateOutput = () => {
				this.date.innerHTML = currentDate;
			};

			dateOutput();
		}

		checkEmptyBlock() {
			console.log();
			if (this.todoList.childNodes.length === 0) {
				this.listText.style.display = 'block';
			} else { this.listText.style.display = 'none'; }

			if (this.todoCompleted.childNodes.length === 0) {
				this.completedText.style.display = 'block';
			} else { this.completedText.style.display = 'none'; }
			if (this.todoData.size === 0) { localStorage.removeItem('toDoList'); }
		}

		render() {
			this.todoList.textContent = '';
			this.todoCompleted.textContent = '';
			this.todoData.forEach(this.createItem, this);
			this.addToStorage();
			this.checkEmptyBlock();
		}

		addToStorage() {
			localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
		}

		createItem(todo) {
			const li = document.createElement('li');
			li.classList.add('todo-left-list__item');
			li.key = todo.key;

			li.insertAdjacentHTML('beforeend', `
					<span class="todo-text">${todo.value}</span>
					<a href="#"><img class="checked todo-left__checked" src="
					./images/check.svg" alt=""></a>
					<a href="#"><img class="delete todo-right__delete" src="
					./images/delete.svg" alt=""></a>
				`);

			if (todo.completed) {
				this.todoCompleted.append(li);
			} else {
				this.todoList.append(li);
			}
		}

		addTodo(e) {
			e.preventDefault();
			if (this.input.value.trim() !== '') {

				this.todoError.textContent = '';
				const newTodo = {
					value: this.input.value,
					completed: false,
					key: this.generateKey(),
				};
				this.todoData.set(newTodo.key, newTodo);
				this.render();

			} else {
				this.todoError.textContent = 'Невозможно добавить дело без описания!';
			}

			this.form.reset();
		}

		generateKey() {
			return Math.random().toString(36).substring(2, 15) + Math.random().
				toString(36).substring(2, 15);
		}

		deleteItem(elemKey) {
			this.todoData.forEach(item => {
				if (item.key === elemKey) {
					this.todoData.delete(elemKey);
				}
			});
			this.render();
		}

		completedItem(elemKey) {
			this.todoData.forEach(item => {
				if (item.key === elemKey) {
					item.completed = !item.completed;
				}
			});
			this.render();
		}

		handler() {
			this.todoWrapper.addEventListener('click', event => {
				const target = event.target;
				const todoElem = target.closest('li');
				if (todoElem) {
					const elemKey = todoElem.key;

					if (target.matches('.delete')) {
						this.deleteItem(elemKey);
					}
					if (target.closest('.checked')) {
						this.completedItem(elemKey);
					}
				}
			});
		}

		init() {
			this.form.addEventListener('submit', this.addTodo.bind(this));
			this.handler();
			this.render();
			this.showDate();

			setInterval(() => {
				this.showDate();
			}, 60000);
		}
	}

	const todo = new Todo('.header-form', '.header-form__input',
		'.todo-left-list', '.todo-right-list', '.todoError',
		'.todo__wrapper', '.todo-left__text', '.todo-right__text',
		'.header-calendar');

	todo.init();

});
