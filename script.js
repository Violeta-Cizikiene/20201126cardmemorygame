//id visalaik grazina stringa

let cardContainer = document.getElementById("cardContainer");

let winMessage = document.getElementById("winMessage");

winMessage.style.display = "none"; //laimejimo pranesimas zaidimo pradzioje nesimato

let gamePaused = false;

let cardColors = ["#00b3b3", "#0066cc", "#e6005c", "#527a7a", "#5900b3"];

let cards = [];

let move = 0;

let lastCard = null;

function createCards() {
	//// cardColors = cardColors.concat(cardColors)//concat - padvigubina
	for (let x = 0; x < cardColors.length; x++) {
		for (let i = 0; i < 20; i++) {
			cards.push(cardColors[x]);
		}
	}
	shuffle(cards); //shuffle(() f-jos iskvietimas - kortu sumaisymas
	for (let x = 0; x < cards.length; x++) {
		cardContainer.innerHTML += `<div class="card" id="${x}" onclick="clickCard(event)">
			<div class="cardInner">
				<div class="cardFace cardFace-front"></div>
				<div class="cardFace cardFace-back" style="background-color: ${cards[x]}"></div>
			</div>
		</div>`;
	}
}

function clickCard(event) {
	if(gamePaused) {
		return;
	}
	let selectedCardId = Number(event.composedPath()[2].id);
	let card = document.querySelectorAll("#cardContainer .card")[
		selectedCardId
	]; //skaicius kelinta kortele
	if (card.classList.contains("is-found")) {
		return;
	}
	if (move === 0 && !card.classList.contains("is-flipped")) {
		//classList grazina visas klases kaip masyva (ypatingas masyvas, kuris turi patogius metodus dirbti su klasemis)
		card.className += " is-flipped";
		lastCard = card;
		move = 1;
	} else if (move === 1 && !card.classList.contains("is-flipped")) {
		move = 0;
		card.className += " is-flipped";
		let lastCardId = Number(lastCard.id);
		if (cards[selectedCardId] === cards[lastCardId]) {
			card.className += " is-found"; //(uzdedama papildoma klase) is-found siuo atveju reiskia kortele jau rasta
			lastCard.className += " is-found";
			checkWin()
		} else {
			gamePaused = true; //padaroma pause, kad nesiklikintu, kol neuzsiverte atverstos skirtingos korteles
			setTimeout(function () {
				gamePaused = false;
				card.classList.remove("is-flipped");
				lastCard.classList.remove("is-flipped");
				lastCard = null;
			}, 1000);
			
		}
		
	}
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function checkWin() {
	let cards = document.querySelectorAll("#cardContainer .card");
	let allCardsFound = true;
	for (let x = 0; x < cards.length; x++) {
		if (!cards[x].classList.contains("is-found")) {
			allCardsFound = false;
		}
	}
	if (allCardsFound) { //if(allCardsFound === true) {} toks pat uzrasymo budas
		// if'uose() - kondicijos, o funkcijose() irasomi argumentai
		winMessage.style.display = "block"; //block kaip divas, kuris yra deze
		
	}
}

createCards();
