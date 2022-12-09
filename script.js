'use strict';

// функція яка запускає гру
function startGame() {
	// показати де наш м'яч
	showBall();
	// запустити анімацію для юзера і зміну положення мячика
	setTimeout(shuffling, 1000);
}

// деякі змінні які будуть нам потрібні для використання у функціях 
let winning;
let mix;
let shuffleCounter = 0;

function showBall() {
	// заблокувати натискання на кнопку
	document.getElementById('playButton').style.display = 'none';
	// визначимо випадкове початкове положення
	winning = getRandomNumber();
	// визначимо відповідний наперсток
	let thimb = document.getElementById(`cup${winning}`);
	// поставимо міячик у відповідне місце
	document.getElementById('thimbleBall').setAttribute("Class", `thimbleBallPosition${winning}`);
	// покажемо положення м'ячика під вказаним наперстком
	thimb.classList.add('thimbleUp');

	// через проміжок часу опустимо наперсток
	setTimeout(function() {
		thimb.classList.remove('thimbleUp');
	}, 500);
	// через проміжок часу приберемо мячик зі сторінки (візуально)
	setTimeout(function() {
		document.getElementById('thimbleBall').classList.remove(`thimbleBallPosition${winning}`);
	}, 1000);
}

// допоміжна функція для визначення випадкового індексу
function getRandomNumber() {
	let random = Math.floor(Math.random() * 3); 
	return random;
}

// функція яка з певним тактом перемішує наперстки
function shuffling() {
	mix = setInterval(pickRandomCups, 500);
}

// функція перемішування наперстків
function pickRandomCups() {
	// визначили два випадкові індекси для напрестків
	let cupOne = getRandomNumber();
	let cupTwo = getRandomNumber();

	// коли це різні наперстки - то запускаємо логіку зміни їх положення
	if (cupOne !== cupTwo) {
		// визначили випадкові наперстки 
		let cupOneElement = document.getElementById(`cup${cupOne}`);
		let cupTwoElement = document.getElementById(`cup${cupTwo}`);

		// отримуємо доступ до їх класів
		let cupOneClass = cupOneElement.getAttribute('class');
		let cupTwoClass = cupTwoElement.getAttribute('class');

		// міняємо місцями їхні класи - таким чином запуститься анімація з css-класів яка відповідає за transition 
		cupOneElement.setAttribute("Class", cupTwoClass);
		cupTwoElement.setAttribute("Class", cupOneClass);

		// відслідкувати чи був один з цих наперстків з мячиком
		if([cupOne, cupTwo].includes(winning)) {
			// і якщо так - оновлюємо інформації про положення м'ячика
			winning = cupOne === winning ? cupTwo : cupOne;
		}

		// оновлюємо лічильник маніпуляцій 
		shuffleCounter++;

		// по досягненню певного значення кількості маніпуляцій - зупиняємо маніпуляції
		if (shuffleCounter > 10) {
			clearInterval(mix);
			// скидуємо лічильник в початкое значення
			shuffleCounter = 0;
			// розблоковуємо наперстки
			removeDisabled();
		}

	} else {
		// коли це один і той самий наперсток - перезапускаємо функцію 
		pickRandomCups();
	}
}

// функція яка блокує доступ до всіх наперстків
function addDisabled() {
	let add = document.getElementsByClassName("sewingThimble");
	for (let i = 0; i < add.length; i++) {
		add[i].setAttribute('disabled', 'disabled');
	}
}

// функція яка повертає доступ до всіх наперстків
function removeDisabled() {
	let removed = document.getElementsByClassName("sewingThimble");
	for (let i = 0; i < removed.length; i++) {
		removed[i].removeAttribute('disabled');
	}
}

// функція відкривання наперстка
function selectThimble(x) {
	// блокуємо кліки по всіх наперстках
	addDisabled();
	// знаходимо наперсток по якому клікнув юзер
	let selectedThimble = document.getElementById(`${x}`);
	//  і під яким знаходиться мячик
	let winningThimble = document.getElementById(`cup${winning}`);
	// знайдемо мячик
	let ball = document.getElementById('thimbleBall');
	// і поставимо його під наперсток де він має знаходитись
	ball.setAttribute("Class", `thimbleBallPosition${winning}`);
	// піднімаємо клкнутий юзером наперсток
	selectedThimble.classList.add("thimbleUp");

	// через певрний проміжок часу повертаємо все до стартового положення
	setTimeout(function() {
		selectedThimble.classList.remove("thimbleUp");
		winningThimble.classList.remove("thimbleUp");
		document.getElementById('playButton').style.display = 'block';
		resetThimbClass();
	}, 500)
}

// функція яка повертає наперстки у стартове положення
function resetThimbClass() {
	document.getElementById("cup0").setAttribute("Class", 'sewingThimble thimble0');
	document.getElementById("cup1").setAttribute("Class", 'sewingThimble thimble1');
	document.getElementById("cup2").setAttribute("Class", 'sewingThimble thimble2');
}