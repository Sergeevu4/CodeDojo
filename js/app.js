'use strict';

// Форма
const todoFormElement = document.querySelector('#todo-form');

// Инпут для ввода текста в форме
const addInputElement = document.querySelector('#add-input');

// Список ul
const todoListElement = document.querySelector('#todo-list');

// Элемент списка (li)
const todoItemsElement = document.querySelectorAll('.todo-item');

// Handler Формы
function addTodoItem(evt) {
	evt.preventDefault();

	if (addInputElement.value === '') {
		// eslint-disable-next-line no-alert
		alert('Необходимо ввести название команды');
		return;
	}

	// Новая задача через функцию создания
	const todoItem = createTodoItem(addInputElement.value);

	// Добавления ее на страницу
	todoListElement.appendChild(todoItem);

	// Обнуления поля input после добавления задачи
	addInputElement.value = '';
}

// Создание Новой задачи
function createTodoItem(inputText) {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'checkbox';

	const label = document.createElement('label');
	label.textContent = inputText;
	label.className = 'title';

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.className = 'textfield';

	const editButton = document.createElement('button');
	editButton.textContent = 'Изменить';
	editButton.className = 'edit';

	const deleteButton = document.createElement('button');
	// Можно воспользоваться innerText
	deleteButton.innerText = 'Удалить';
	deleteButton.className = 'delete';

	const listItem = document.createElement('li');
	listItem.className = 'todo-item';

	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	bindEvents(listItem);

	return listItem;
}

// Навешивание обработчиков событий на элементы задачи li
function bindEvents(todoItem) {
	// checkbox Задачи
	const checkbox = todoItem.querySelector('.checkbox');
	// Кнопка редактирования задачи
	const editButton = todoItem.querySelector('button.edit');
	// Кнопка удаления задачи
	const deleteButton = todoItem.querySelector('button.delete');

	checkbox.addEventListener('change', toggleTodoItem);
	editButton.addEventListener('click', editTodoItem);
	deleteButton.addEventListener('click', deleteTodoItem);
}

// ? Второй способ навешивания обработчиков
// eslint-disable-next-line no-unused-vars
function bindEvents2(todoItem) {
	/*
		Решение через живую коллекцию HTMLCollection,
		Передавая внутрь функции в todoItem ul
		const todoListElements = document.querySelector('#todo-list').children;
		.children  HTMLCollection - является живой коллекцией, она изменяется даже послеопределения переменной
		В отличии от querySelectorAll

		Вызов функции происходит в момент события submit
		bindEvents2(todoListElements);

		И для первоначальной задачи в момент загрузки js
	*/

	Array.from(todoItem).forEach((element) => {
		// checkbox Задачи
		const checkbox = element.querySelector('.checkbox');
		// Кнопка редактирования задачи
		const editButton = element.querySelector('button.edit');
		// Кнопка удаления задачи
		const deleteButton = element.querySelector('button.delete');

		checkbox.addEventListener('change', toggleTodoItem);
		editButton.addEventListener('click', editTodoItem);
		deleteButton.addEventListener('click', deleteTodoItem);
	});
}

// Handler выполнения задачи
function toggleTodoItem() {
	/*
		Можно воспользоваться evt.target, или деструктуризацией event ({target})
		Но можно и this
		event.target - элемент внутри формы, на котором произошло событие.
		event.currentTarget(он же this) элемент, на котором выполняется обработчик.
		В данным примере они равны <input type="checkbox" class="checkbox">
	*/

	// Получения родительского узла, можно воспользоваться parentElement
	const listItem = this.parentNode;
	listItem.classList.toggle('completed');
}

// Handler редактирования задачи
function editTodoItem() {
	// Можно заменить evt.target на ({target}) или this
	//	this === button

	const listItem = this.parentNode;
	// label
	const title = listItem.querySelector('.title');
	// Поле для ввода редактированного текста
	const editInput = listItem.querySelector('.textfield');
	// Режим редактирования ДА или НЕТ
	const isEditing = listItem.classList.contains('editing');

	/* Логика:
		В момент события click по кнопке изменить
		проверяется есть находиться режим isEditing
			Если нет:
				Скрытому полу input присваивается введенный текс задачи, который
				храниться в label и переименовывается кнопка.
				После присваивается класс listItem(li) editing
			Если да, происходит обратное действие и удаляется класс editing
	*/

	if (isEditing) {
		title.innerText = editInput.value;
		this.innerText = 'Изменить';
	} else {
		editInput.value = title.innerText;
		this.innerText = 'Сохранить';
	}

	listItem.classList.toggle('editing');
}

// Handler удаления задачи
function deleteTodoItem() {
	/*
		можно удалить при помощи метода removeChild
		const listItem = this.parentNode;
		todoListElement.removeChild(listItem);
	*/

	this.parentNode.remove();
}

// Функция выполнения Инициализации (init или main) программы
function main() {
	// Обработчик события на Форме
	todoFormElement.addEventListener('submit', addTodoItem);

	// Навешивание обработчиков на уже существующие странице задачи li
	todoItemsElement.forEach((item) => bindEvents(item));
}

main();
