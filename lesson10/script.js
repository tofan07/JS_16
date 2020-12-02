'use strict';
const booksWrap = document.querySelector('.books'),
      books = document.querySelectorAll('.book'),
      title = books[4].querySelector('h2>a'),
      offer = document.querySelector('.adv'),
      secondListItems = books[0].querySelectorAll('ul>li'),
      fifthListItems = books[5].querySelectorAll('ul>li'),
      sixthListItems = books[2].querySelectorAll('ul>li'),
      newListItem = document.createElement('li');

// Пункт 1
books[0].before(books[1]);
books[4].after(books[2]);
books[3].before(books[4]);
books[5].after(books[2]);

// Пункт 2
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Пункт 3
title.textContent = 'Книга 3. this и Прототипы Объектов';

// Пункт 4
offer.remove();

// Пункт 5
// Вторая книга
secondListItems[4].before(secondListItems[6]);
secondListItems[4].before(secondListItems[8]);
secondListItems[9].after(secondListItems[2]);
// Третья книга
fifthListItems[4].after(fifthListItems[2]);
fifthListItems[3].before(fifthListItems[9]);
fifthListItems[8].before(fifthListItems[5]);

// Пункт 6
newListItem.textContent = 'Глава 8: За пределами ES6';
sixthListItems[9].insertAdjacentElement('beforebegin', newListItem);

