// Przycisk startowy
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);



var pickRock = document.getElementById('js-playerPick_rock'), //guzik kamień
	pickPaper = document.getElementById('js-playerPick_paper'), //guzik papier
	pickScissors = document.getElementById('js-playerPick_scissors'); //guzik noźyczki


// przypisanie wywołania funkcji na dany wybór guzika
pickRock.addEventListener('click', function() {
	playerPick('rock')
});
pickPaper.addEventListener('click', function() {
	playerPick('paper')
});
pickScissors.addEventListener('click', function() {
	playerPick('scissors')
});



//wartości początkowe gry, STAN GRY
var gameState = 'notStarted', //started // ended
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};


//funkcja wpływająca na gameState POWYŻEJ
function setGameElements() {
	switch (gameState) {
		case 'started':
			newGameElem.style.display = 'none'; //NEW GAME ZNIKA 
			pickElem.style.display = 'block'; //WIDOCZNY WYBÓR
			resultsElem.style.display = 'block'; //WIDOCZNY WYNIK
			break;
		case 'ended':
			newGameBtn.innerText = 'Jeszcze raz'; // NEW GAME zamienia się na JESZCZE RAZ
		case 'notStarted':
		default:
			newGameElem.style.display = 'block'; //widoczny tylko NEW GAME
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}


//setGameElements(); //wywołanie funkcji powyżej// Uwaga!!!!!!!!!!!!!!!!!!!



//przypisanie zmiennych do id kontenerów POWYŹEJ
var newGameElem = document.getElementById('js-newGameElement'), //kontener z przzyciskiem new game
	pickElem = document.getElementById('js-playerPickElement'), //kontener w wyborami kamień, papier, noźyczki
	resultsElem = document.getElementById('js-resultsTableElement'); //kontener w info gracz, punkty, wybór




// zmienne przypisane do wyświetlania punktów gracza, imienia gracza i pkt komputera czyli <SPAN'y>
var playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints');



// ta funkcja uruchamia się kiedy klikniemy NEW GAME   
function newGame() {
	player.name = prompt('Please enter your name', 'imię gracza'); //przypisanie nazwy gracza do objektu player = {name: "..."}
	if (player.name) { //jeśli podamy nazwę ustawia wynik w objekcie {score: 0}
		player.score = computer.score = 0;
		gameState = 'started'; //w funkcji setGameElement case 'started': i ją wywołuje
		setGameElements();

		playerNameElem.innerHTML = player.name; //wyświetlenie podanej nazwy gracza w prompt
		setGamePoints(); //wyświetlanie punktów
	}
}


//funkcja wyboru gracza
function playerPick(playerPick) {
	console.log(playerPick);
}
//funkcja wyboru kompa
function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random() * 3)];
}

//zmienne przypisame do wyświetlania aktualnego wyboru i wyniku gracza jak i kompa
var playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

//funkcja przypisująca wybór na innerHTLM- wyświetlanie wyniku
function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick); //wywołanie funkcji poniżej
}


//funkcja określająca wygraną
function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = ''; //wyzerownanie wyniku



	var winnerIs = 'player';

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
	} else if (
		(computerPick == 'rock' && playerPick == 'scissors') ||
		(computerPick == 'scissors' && playerPick == 'paper') ||
		(computerPick == 'paper' && playerPick == 'rock')) {

		winnerIs = 'computer';
	}

	if (winnerIs == 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++; //wynik + 1 do objectu player
		console.log('plus 1 dla gracza');

	} else if (winnerIs == 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++; // dla kompa
		console.log('plus 1 dla kompa');
		//computerPointsElem.innerHTML = computer.score;

	}
	var playerScore = player.score;
	var compPoints = computer.score;
	console.log("łączne komp: ", compPoints, "łączne gracz: ", playerScore);
	setGamePoints(playerScore, compPoints);
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
	console.log("setGamePoints zadziałało");
	if (player.score == 10) {
		alert('player win!');
		gameState = 'ended';
		setGameElements();


	} else if (computer.score == 10) {
		alert('You lose!');
		gameState = 'ended';
		setGameElements();
	}
}
