const containerDiv = document.querySelector(".container");
const cardRows = document.getElementsByClassName("card-row");
const totalClicksH = document.getElementById("total-clicks");
const scoreP = document.getElementById("score");
const button = document.getElementById("animal-names");
let animalsList = [];

let numClicks = 0;
let totalCicks = 0;
let animalsClicked = [];
let divsClicked = [];
let actualDivsClicked = [];
let score = 0;
let showAnimalNames = false;

button.addEventListener("click", () => {
	showAnimalNames = !showAnimalNames;

	if (showAnimalNames) {
		button.innerText = "Hide Animal Names";
	} else {
		button.innerText = "Show Animal Names";
	}
});

const reflipCard = (d1, d2) => {
	d1.style.backgroundColor = "rgb(2, 0, 36)";
	d2.style.backgroundColor = "rgb(2, 0, 36)";

	const front1 = d1.querySelector(".front");
	const back1 = d1.querySelector(".back");
	const front2 = d2.querySelector(".front");
	const back2 = d2.querySelector(".back");

	front1.classList.remove("hidden");
	back1.classList.add("hidden");
	front2.classList.remove("hidden");
	back2.classList.add("hidden");
};

const flipCard = e => {
	totalCicks++;
	const div = e.target;

	let front = div.querySelector(".front");
	let back = div.querySelector(".back");
	let animalNameSpan = back.querySelector("div");

	if (div.numClicks % 2 === 0) {
		// shows the animal name

		if (divsClicked.length > 0) {
			if (front.innerText !== divsClicked[0]) {
				divsClicked.push(front.innerText);
				animalsClicked.push(animalNameSpan.innerText);
			}
		} else {
			divsClicked.push(front.innerText);
			animalsClicked.push(animalNameSpan.innerText);
		}

		actualDivsClicked.push(div);

		front.classList.add("hidden");
		back.classList.remove("hidden");
		div.style.backgroundColor = "white";
	} else {
		// shows the div number
		div.style.backgroundColor = "rgb(2, 0, 36)";
		front.classList.remove("hidden");
		back.classList.add("hidden");
	}

	if (animalsClicked.length === 2) {
		if (animalsClicked[0] === animalsClicked[1]) {
			// then cannot click on these cards again

			const allCards = document.querySelectorAll(".card");

			for (let i = 0; i < allCards.length; i++) {
				const back = allCards[i].querySelector(".back");
				const span = back.querySelector("div");
				if (span.innerText === animalsClicked[0]) {
					allCards[i].removeEventListener("click", flipCard);

					if (showAnimalNames) {
						span.className = "span-animal-name";
						span.innerText = span.innerText.toUpperCase();
					}
				}
			}

			score += 1;
			actualDivsClicked = [];
		}
		animalsClicked = [];
		divsClicked = [];
	}

	if (actualDivsClicked.length === 2) {
		setTimeout(() => {
			let d1 = actualDivsClicked[0];
			let d2 = actualDivsClicked[1];

			reflipCard(d1, d2);

			actualDivsClicked = [];
		}, 1500);
	}

	scoreP.innerText = `Score: ${score}`;
	totalClicksH.innerText = `Times Clicked: ${totalCicks}`;
	div.numClicks++;
};

const setAnimalsList = () => {
	animalsList = animalsListSeed.map(c => c);
	let i = animalsList.length,
		j,
		temp;
	if (i === 0) return animalsList;

	while (--i) {
		j = Math.floor(Math.random() * (i + 1));
		temp = animalsList[i];
		animalsList[i] = animalsList[j];
		animalsList[j] = temp;
	}
};

const insertDivs = () => {
	setAnimalsList();
	let count = 1;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			const card = document.createElement("div");
			card.className = "card";
			card.numClicks = 0;
			const span = `<div class = 'hidden'>${animalsList[count - 1]}</div>`;
			const img = `<img src = "images/${animalsList[count - 1]}.png" />`;
			card.innerHTML = `
                <div class = 'front'>${count}</div>
                <div class = 'back hidden'>${span}${img}</div>
            `;

			card.addEventListener("click", flipCard);
			cardRows[i].appendChild(card);
			count++;
		}
	}
};

insertDivs();
