  var prompt = require('prompt-sync')();
  var colors = require('colors');
  
  INITIAL_PLAYER_MONEY = 100;
  MAXIMUM_BET = 10;
  MINIMUM_BET = 5;
  playerMoney = INITIAL_PLAYER_MONEY;

  function resetGame() {
    playerMoney = INITIAL_PLAYER_MONEY;
    playGame();
  }

  function showGameResult(message) {
    console.log(message);
  }

  function determineGameResult(playerGuess, playerBet, correctAnswer) {
    var message = "";

    if (playerGuess === correctAnswer) {
      playerMoney += playerBet;
      message = "Congrats! You guessed the correct answer! You now have $" + playerMoney;
      showGameResult(message.green);
    } else if (playerGuess === correctAnswer + 1 || playerGuess === correctAnswer - 1) {
      message = "You were so close! You guessed " + playerGuess + ", the correct answer was " + correctAnswer + ". We'll let you keep your money.";
      showGameResult(message.yellow);
    } else {
      playerMoney -= playerBet;
      message = "You were way off! You guessed " + playerGuess + ", the correct answer was " + correctAnswer + ". You have $" + playerMoney + " remaining.";
      showGameResult(message.red);
    }
  }


  function getErrorMsg(playerBet, playerGuess) {
    errorMsg = "";
    if(playerBet < MINIMUM_BET || playerBet > MAXIMUM_BET) {
      errorMsg = "Please place a bet between $5 and $10";
    }
    if(playerBet > playerMoney) {
      errorMsg = "You only have $" + playerMoney + " remaining! Please place a bet within your budget";
    }
    if(isNaN(playerGuess)) {
      errorMsg = "Please provide a numeric guess between 1 and 10";
    }
    return errorMsg;
  }

  function playGame() {
    var playerBet = Number(prompt('Place a bet between $5 and $10: '));
    var playerGuess = Number(prompt('Guess a number between 1 and 10: '));
    var errorMsg = getErrorMsg(playerBet, playerGuess);
    if( errorMsg != "") {
      console.log(errorMsg.red);
      return;
    }
    var correctAnswer = Math.floor(Math.random() * 10) + 1;
    determineGameResult(playerGuess, playerBet, correctAnswer);
    if(playerMoney < MINIMUM_BET) {
      var playerResponse = prompt('Play again? (y or n): ');
      if(playerResponse == 'y') {
        resetGame();
      }
    } else {
      playGame();
    }
  }

  playGame();