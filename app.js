class Game {
  constructor() {
    this.playerPoints = 0;
    this.computerPoints = 0;
    this.round = 0;
    this.arrayOfItems = [];
    this.computerChoice = {};
    this.playerChoice = {};
    this.state = document.querySelector(".player-choice");
    this.gamePanel = document.querySelector(".game-panel");
    this.computerScore = document.querySelector(".c-score");
    this.playerScore = document.querySelector(".p-score");
  }

  startGame() {
    this.resetGame();
    this.arrayOfItems.push(new Item("Nożyczki", ["Kamień", "Spock", "Telefon"]));
    this.arrayOfItems.push(new Item("Kamień", ["Papier", "Spock", "Zapalniczka"]));
    this.arrayOfItems.push(
      new Item("Papier", ["Nożyczki", "Jaszczurka", "Zapalniczka"])
    );
    this.arrayOfItems.push(
      new Item("Jaszczurka", ["Nożyczki", "Kamień", "Telefon"])
    );
    this.arrayOfItems.push(
      new Item("Spock", ["Papier", "Jaszczurka", "Zapalniczka"])
    );
    this.arrayOfItems.push(new Item("Telefon", ["Papier", "Spock", "Kamień"]));
    this.arrayOfItems.push(
      new Item("Zapalniczka", ["Nożyczki", "Jaszczurka", "Telefon"])
    );
    this.computerChoiceGenerator();
    this.playerTurn();
  }

  resetGame() {
    document.querySelector(".game-panel").textContent =
      "Zaczynamy grę! Wybieraj!";
    this.playerPoints = 0;
    this.computerPoints = 0;
    this.round = 1;
    this.arrayOfItems = [];
    this.state = "";
    this.gamePanel.textContent = "Rozpocznij grę!";
    this.computerScore.textContent = "0";
    this.playerScore.textContent = "0";
  }

  computerChoiceGenerator() {
    this.computerChoice = this.arrayOfItems[
      Math.floor(Math.random() * this.arrayOfItems.length)
    ];
  }
  Fight() {
    if (this.playerChoice.name === this.computerChoice.name) {
      this.gamePanel.textContent = `${this.playerChoice.name} vs ${this.computerChoice.name} a to oznacza remis!`;
    } else if (this.computerChoice.weakness.includes(this.playerChoice.name)) {
      this.gamePanel.textContent = `Wygrana!!`;
      this.playerPoints++;
      this.playerScore.textContent = this.playerPoints;
      document.querySelector(
        ".c-score-choice"
      ).textContent = this.computerChoice.name;
    } else {
      this.gamePanel.textContent = `Przegrana`;
      this.computerPoints++;
      this.playerScore.textContent = this.playerPoints;
      this.computerScore.textContent = this.computerPoints;
      document.querySelector(
        ".p-score-choice"
      ).textContent = this.playerChoice.name;
    }
    document.querySelector(
      ".p-score-choice"
    ).textContent = this.playerChoice.name;
    document.querySelector(
      ".c-score-choice"
    ).textContent = this.computerChoice.name;
  }
  playerTurn() {
    const item = document.querySelectorAll(".item");
    item.forEach((bttn) => {
      bttn.addEventListener("click", (ev) => {
        const item = ev.target.getAttribute("data-name");
        this.arrayOfItems.forEach((element) => {
          if (element.name === item) {
            this.playerChoice = element;
          }
        });
        this.Fight();
        this.round++;
        if (this.round === 5) {
          this.endGame();
        }
      });
    });
  }
  endGame = () => {
    alert(this.state);
    this.state.textContent = "Koniec gry!";
    setTimeout(this.resetGame, 3000);
  };
}

class Item {
  constructor(name, weakness) {
    this.name = name;
    this.weakness = weakness;
  }

  selected() {
    return `Wybrano: ${this.name}`;
  }
}

const game = new Game();
document.querySelector(".new-game").addEventListener("click", function () {
  game.startGame();
});
