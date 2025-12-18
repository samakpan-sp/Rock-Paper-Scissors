const rpsChoices = document.querySelector("#rpsChoices");
const a_computer = document.querySelector("#computer");
const a_human = document.querySelector("#human");
const gameResult = document.querySelector(".result");

// Game state variables
let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const MAX_ROUNDS = 5;

// Choices array - FIXED THE ORDER!
let choices = [
    {
        name: "rock",
        title: "rock image",
        imageSrc: "images/rock.png"
    },
    {
        name: "paper",
        title: "paper image",
        imageSrc: "images/paper.png"
    },
    {
        name: "scissors",
        title: "scissors image",
        imageSrc: "images/scissors.png"
    }
];

// Create score displays
let computerScoreSpan = document.createElement("span");
let humanScoreSpan = document.createElement("span");
computerScoreSpan.textContent = computerScore;
humanScoreSpan.textContent = humanScore;

a_computer.appendChild(computerScoreSpan);
a_human.appendChild(humanScoreSpan);

// Initialize result text
gameResult.textContent = "Click an image to start!";

// Create clickable images
choices.forEach((choice, index) => {
    let imageElement = document.createElement("img");
    imageElement.src = choice.imageSrc;
    imageElement.alt = choice.title;
    imageElement.style.width = '100px';
    imageElement.style.border = '3px double rgb(245, 136, 35)';
    imageElement.style.borderRadius = '10px';
    imageElement.style.cursor = 'pointer'; // Show it's clickable
    imageElement.style.transition = 'transform 0.2s'; // Add hover effect
    
    // Add hover effect
    imageElement.addEventListener('mouseenter', () => {
        imageElement.style.transform = 'scale(1.1)';
    });
    
    imageElement.addEventListener('mouseleave', () => {
        imageElement.style.transform = 'scale(1)';
    });
    
    // Add click handler - THIS IS THE KEY!
    imageElement.addEventListener('click', () => {
        if (roundsPlayed < MAX_ROUNDS) {
            playRound(choice.name);
        }
    });
    
    rpsChoices.appendChild(imageElement);
});

// Generate computer's random choice
function generateComputerChoice() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].name;
}

// Determine winner of a single round
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }
    
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "human";
    } else {
        return "computer";
    }
}

// Play a single round
function playRound(humanChoice) {
    roundsPlayed++;
    
    const computerChoice = generateComputerChoice();
    const winner = determineWinner(humanChoice, computerChoice);
    
    // Update scores
    if (winner === "human") {
        humanScore++;
        humanScoreSpan.textContent = humanScore;
        gameResult.textContent = `Round ${roundsPlayed}: You chose ${humanChoice}, Computer chose ${computerChoice}. YOU WIN THIS ROUND! 🎉`;
        gameResult.style.color = "green";
    } else if (winner === "computer") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        gameResult.textContent = `Round ${roundsPlayed}: You chose ${humanChoice}, Computer chose ${computerChoice}. YOU LOSE THIS ROUND! 😢`;
        gameResult.style.color = "red";
    } else {
        gameResult.textContent = `Round ${roundsPlayed}: You chose ${humanChoice}, Computer chose ${computerChoice}. IT'S A DRAW! 🤝`;
        gameResult.style.color = "blue";
    }
    
    // Check if game is over
    if (roundsPlayed === MAX_ROUNDS) {
        endGame();
    }
}

// End the game after 5 rounds
function endGame() {
    let finalMessage = "";
    
    if (humanScore > computerScore) {
        finalMessage = `🎊 GAME OVER! YOU WON THE GAME! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
        gameResult.style.color = "green";
    } else if (computerScore > humanScore) {
        finalMessage = `😭 GAME OVER! COMPUTER WINS! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
        gameResult.style.color = "red";
    } else {
        finalMessage = `🤷 GAME OVER! IT'S A TIE! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
        gameResult.style.color = "orange";
    }
    
    gameResult.textContent = finalMessage;
    
    // Add restart button
    setTimeout(() => {
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Play Again?";
        restartBtn.style.marginTop = "20px";
        restartBtn.style.padding = "10px 20px";
        restartBtn.style.fontSize = "18px";
        restartBtn.style.cursor = "pointer";
        
        restartBtn.addEventListener('click', () => {
            location.reload(); // Restart the game
        });
        
        document.body.appendChild(restartBtn);
    }, 1000);
}