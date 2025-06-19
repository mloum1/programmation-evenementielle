"use strict";


const winMessage = document.createElement('div');
winMessage.style.marginLeft = "20px";
infoJeu.appendChild(winMessage);

const startButton = document.createElement('button');
startButton.textContent = "Démarrer le jeu";
infoJeu.appendChild(startButton);

const inputSize = document.createElement('input');
inputSize.type = "number";
inputSize.placeholder = "Taille du damier min 5";
inputSize.min = 5;
inputSize.value = 5;
infoJeu.appendChild(inputSize);

const inputInterval = document.createElement('input');
inputInterval.type = "number";
inputInterval.placeholder = "Durée bonus (ms)";
inputInterval.min = 500;
inputInterval.value = 2000;
infoJeu.appendChild(inputInterval);

const timerDisplay = document.createElement('span');
timerDisplay.style.marginLeft = "20px";
infoJeu.appendChild(timerDisplay);

let SIZE;
let cage;
let pion, pionBonus;
let x, y, bonusX, bonusY;
let jeuActif = false;
let intervalBonus;
let chronoInterval;
let tempsEcoule;

startButton.addEventListener("click", () => {
	if (intervalBonus) clearInterval(intervalBonus);
	if (chronoInterval) clearInterval(chronoInterval);
	document.removeEventListener("keydown", deplacerPion);
	out.innerHTML = "";
	timerDisplay.textContent = "";

	SIZE = parseInt(inputSize.value);
	if (isNaN(SIZE) || SIZE < 5) {
		alert("La taille du damier doit être au minimum de 5 !");
		return;
	}
	const dureeBonus = parseInt(inputInterval.value) || 2000;

	jeuActif = true;
	tempsEcoule = 0;

	pion = document.createElement('img');
	pionBonus = document.createElement('img');
	pion.src = 'img/pion.png';
	pionBonus.src = 'img/bonus.png';

	cage = document.createElement('table');
	cage.classList.add('cage');

	Array.from({ length: SIZE }).forEach(() => {
		const tr = cage.insertRow();
		Array.from({ length: SIZE }).forEach(() => {
			const td = tr.insertCell();
			td.classList.add('cellule');
		});
	});

	x = Math.floor(SIZE / 2);
	y = Math.floor(SIZE / 2);

	bonusX = Math.floor(Math.random() * SIZE);
	bonusY = Math.floor(Math.random() * SIZE);

	cage.rows[x].cells[y].appendChild(pion);
	cage.rows[bonusX].cells[bonusY].appendChild(pionBonus);

	out.appendChild(cage);

	chronoInterval = setInterval(() => {
		tempsEcoule += 1;
		timerDisplay.textContent = `⏱️ Temps écoulé : ${tempsEcoule} s`;
	}, 1000);

	intervalBonus = setInterval(() => {
		if (!jeuActif) return;
		cage.rows[bonusX].cells[bonusY].removeChild(pionBonus);
		bonusX = Math.floor(Math.random() * SIZE);
		bonusY = Math.floor(Math.random() * SIZE);
		if (bonusX === x && bonusY === y) {
			bonusX = (bonusX + 1) % SIZE;
			bonusY = (bonusY + 1) % SIZE;
		}
		cage.rows[bonusX].cells[bonusY].appendChild(pionBonus);
	}, dureeBonus);

	document.addEventListener("keydown", deplacerPion);
});

function deplacerPion(evt) {
	if (!jeuActif) return;

	const touchesAutorisees = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
	if (!touchesAutorisees.includes(evt.key)) return;

	cage.rows[x].cells[y].removeChild(pion);

	if (evt.key === "ArrowUp" && x > 0) x -= 1;
	else if (evt.key === "ArrowDown" && x < SIZE - 1) x += 1;
	else if (evt.key === "ArrowLeft" && y > 0) y -= 1;
	else if (evt.key === "ArrowRight" && y < SIZE - 1) y += 1;

	cage.rows[x].cells[y].appendChild(pion);

	if (x === bonusX && y === bonusY) {
		cage.rows[x].cells[y].innerHTML = "";
		clearInterval(intervalBonus);
		clearInterval(chronoInterval);

		const bravo = document.createElement('img');
		bravo.src = 'img/bravo.png';
		bravo.style.width = "100%";
		bravo.style.height = "100%";
		bravo.style.objectFit = "contain";

		cage.rows[x].cells[y].appendChild(bravo);

		jeuActif = false;

		winMessage.textContent = `🎉 Bravo ! Vous avez gagné en ${tempsEcoule} secondes.`;
		winMessage.style.fontSize = "1.2rem";
		winMessage.style.fontWeight = "bold";
		winMessage.style.color = "#27ae60";
	}
}
