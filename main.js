"use strict";

const pion = document.createElement('img');
pion.src = 'img/pion.png';



const cage = document.createElement('table');
cage.classList.add('cage');


Array.from({length : 5 }).forEach(() => {
	const tr = cage.insertRow();
	Array.from({length: 5 }).forEach(() => {
		const td = tr.insertCell();
		td.classList.add('cellule');
	})
})

// Place par défaut le pion au milieu.
let x = 2;
let y = 2;

cage.rows[x].cells[y].appendChild(pion);
out.appendChild(cage);

function deplacerPion(evt) {
	const touchesAutorisees = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
	if (!touchesAutorisees.includes(evt.key)) {
		return;
	}

	cage.rows[x].cells[y].removeChild(pion);

	// Pas de placement en diagonal et on vérifie qu'on ne sort pas du tableau
	if (evt.key === "ArrowUp" && x > 0) {
		x -= 1;
	} else if (evt.key === "ArrowDown" && x < cage.rows.length - 1) {
		x += 1;
	} else if (evt.key === "ArrowLeft" && y > 0) {
		y -= 1;
	} else if (evt.key === "ArrowRight" && y < cage.rows[0].cells.length - 1) {
		y += 1;
	}
	cage.rows[x].cells[y].appendChild(pion);

}

// écoute l'évènement pour déplacer le pion
document.addEventListener("keydown", deplacerPion)
