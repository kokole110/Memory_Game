
// 
let moves = 0;
function moveCounter () {
		let movesHTML = document.getElementsByClassName('moves')[0];
		if (moves === 1) {
			movesHTML.innerHTML = `${moves} Move`;
		} else {
			movesHTML.innerHTML = `${moves} Moves`;
		}
		
		return movesHTML;
	};


const modal = document.getElementById('end-game');
const span = document.getElementsByClassName('close')[0];
function closeModal () {
		modal.style.display = "none";
	}


const stars = document.getElementsByClassName('stars')[0];
function starBuilder () {
		if (moves<=25) {
			stars.innerHTML = `<li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>`
		} else if ((moves>25) && (moves<=30)) {
			stars.innerHTML = `<li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>`
		} else if ((moves>30) && (moves<=35)) {
			stars.innerHTML = `<li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>`
		} else if ((moves>35) && (moves<=40)) {
			stars.innerHTML = `<li><i class="fa fa-star"></i></li>
							   <li><i class="fa fa-star"></i></li>`
		} else if (moves>40) {
			stars.innerHTML = `<li><i class="fa fa-star"></i></li>`
		} 
	}


startGame();

const restart = document.querySelectorAll('.restart');
restart.forEach (function (restartButton) {
	restartButton.addEventListener('click', function() {
		console.log("restart");
		moves = 0;
		moveCounter();
		closeModal();
		starBuilder();
		startGame();
	})
})

function startGame () {
	/*
	 * Create a list that holds all of your cards
	 */
	const cardClass = ['fa-diamond', 'fa-diamond',
				 'fa-paper-plane-o', 'fa-paper-plane-o',
				 'fa-anchor', 'fa-anchor',
				 'fa-bolt', 'fa-bolt',
				 'fa-cube', 'fa-cube',
				 'fa-leaf', 'fa-leaf',
				 'fa-bicycle', 'fa-bicycle',
				 'fa-bomb', 'fa-bomb'];

	function createCard (card) {
		return `<li class="card"><i class="fa ${card}"></i></li>`
	}
	/*
	 * Display the cards on the page
	 */

	function initGame() {
		let deck = document.querySelector('.deck');
		let cardHTML = shuffle(cardClass).map(function(card) {
			return createCard(card);
		});
		deck.innerHTML = cardHTML.join('');
	}

	initGame();
	// Shuffle function 
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

	/*
	 * set up the event listener for a card. If a card is clicked:
	 */

	let allCards = document.querySelectorAll('.card');
	let openCards = [];
	let matched = 0;

	allCards.forEach(function(card) {
		card.addEventListener('click', function(){
			
			let x = card.className.split(" ");

			if (x[1] !== "open")  {
				openCards.push(card);
				if (openCards.length<3) {
					card.classList.add('open', 'show');
					moves += 1;
					console.log('add move');
					moveCounter();
					starBuilder();
				};
			};

			if (openCards.length==2) {
				
				let checkingCard1 = openCards[0].getElementsByTagName('i')[0]; //getting [i] elements to be able to compare its classes
				let checkingCard2 = openCards[1].getElementsByTagName('i')[0];

				// compare two cards
				if (checkingCard1.classList[1] == checkingCard2.classList[1]) {
					console.log('matched');
					matched += 1;
					openCards[0].classList.add('match');
					openCards[1].classList.add('match');
					endGameModal();
					openCards = [];
				} else { 
					setTimeout(function() {
						openCards[0].classList.remove('open', 'show');
						openCards[1].classList.remove('open', 'show');
						openCards = [];
					}, 1000);
				}
			} 
		})
	})

	function endGameModal () {
		if (matched == 8) {
			setTimeout(function() {
				modal.style.display = "block";
			}, 1000)
		};
	}

	span.onclick = closeModal();

	function starRating () {
		let starsNumber = document.querySelector('.stars').getElementsByTagName('li');
		if ((moves>=6) && (moves<11)) {
			starsNumber[0].remove();
			
		} else if (moves>=11 && moves<16) {
			starsNumber[0,1].remove();
				
		};
	};	
}









