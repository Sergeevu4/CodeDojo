'use strict';

// Модуль по созданию HTML элемента
(() => {
	/*
	# Внутри createElement
		Функция createElement, принимает в качестве параметров:
		(tag) - String -> Названия необходимого тега
		(props) - Object -> Объект который будет содержать все необходимые
		параметры для вновь созданного HTML - элемента
		(children) - Array -> Может быть как обычным тектом (HTML элемента, например для label текст введенный через input), либо же DOM - элементов, которые будут добавлены
		li.

		Свойства из объекта props можно назначить element
		через цикл For in, Но цикл for in не фильтрует свойства
		полученные через прототип:

			for (const prop in props) {
				element[prop] = props[prop];
			}

		{}.hasOwnProperty.call(foo, key) - возможная фильтрация

		Лучше воспользоваться методом Object.keys() - он возвращает
		все собственные ключи объекта
	*/

	// * Функция по созданию HTML - элементов
	function createElement(tag, props, ...children) {
		const element = document.createElement(tag);

		Object.keys(props).forEach((key) => (element[key] = props[key]));

		// Проверка есть ли элементы в массиве
		if (children.length > 0) {
			children.forEach((child) => {
				// Проверка для выявления элемента с текстом, а не готовом DOM элементом
				if (typeof child === 'string') {
					// То внутри создаваемого HTML элемента создаем текстовый узел с переданой строкой
					child = document.createTextNode(child);
				}

				// После мы добавляем этот либо Текстовый узел в DOM элемент
				// Либо же уже готовые Dom элементы
				element.appendChild(child);
			});

			/*
				Еще одним вариантом решения по добавлению текста внутрь созданного DOM элемента
				element.textContent = child;
				После добавления ветки else, где при элементе не являющей строкой, будет добавлен
				внутрь element.appendChild(child);
			*/
		}

		return element;
	}

	window.createElement = createElement;
})();
