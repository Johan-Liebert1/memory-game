const containerDiv = document.querySelector(".container");
const cardRows = document.getElementsByClassName("card-row");
const scoreP = document.getElementById("score");

let cardsAndValues = [];
let numClicks = 0;

let animalsClicked = [];
let divsClicked = [];
let actualDivsClicked = [];
let score = 0;

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
	const div = e.target;
	console.log("div = ", div);

	let front = div.querySelector(".front");
	let back = div.querySelector(".back");
	let animalNameSpan = back.querySelector("span");

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
	console.log(divsClicked);

	if (animalsClicked.length === 2) {
		if (animalsClicked[0] === animalsClicked[1]) {
			// then cannot click on these cards again

			const allCards = document.querySelectorAll(".card");

			for (let i = 0; i < allCards.length; i++) {
				const back = allCards[i].querySelector(".back");
				const span = back.querySelector("span");
				if (span.innerText === animalsClicked[0]) {
					allCards[i].removeEventListener("click", flipCard);
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
	div.numClicks++;
};

const insertDivs = () => {
	let count = 1;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			const card = document.createElement("div");
			card.className = "card";
			card.numClicks = 0;
			const span = `<span class = 'hidden'>${animalsList[count - 1]}</span>`;
			const img = `<img src = "images/${animalsList[count - 1]}.png" />`;
			card.innerHTML = `
                <div class = 'front'>${count}</div>
                <div class = 'back hidden'>${span}${img}</div>
            `;

			card.addEventListener("click", flipCard);
			cardRows[i].appendChild(card);

			cardsAndValues.push({
				number: count,
				card: card,
				animal: animalsList[count - 1]
			});

			count++;
		}
	}
};

insertDivs();
