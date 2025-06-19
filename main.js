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

	const directions = {
		ArrowUp:    { dx: -1, dy:  0 },
		ArrowDown:  { dx:  1, dy:  0 },
		ArrowLeft:  { dx:  0, dy: -1 },
		ArrowRight: { dx:  0, dy:  1 }
	};

	if (!touchesAutorisees.includes(evt.key)) {
		return;
	}

	cage.rows[x].cells[y].removeChild(pion);

	const { dx, dy } = directions[evt.key];

	const newX = x + dx;
	const newY = y + dy;

	if (newX >= 0 && newX < cage.rows.length && newY >= 0 && newY < cage.rows[0].cells.length) {
		x = newX;
		y = newY;
	}

	cage.rows[x].cells[y].appendChild(pion);

}

// écoute l'évènement pour déplacer le pion
document.addEventListener("keydown", deplacerPion)
