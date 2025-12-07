
const makeChoice = prompt("Make a Choice: Rock | Paper | Scissors: ")
 //const result;

 let choices = ["Rock", "Paper", "Scissors"];
 

 function GenerateComputerChoice() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex].toLowerCase()
    return computerChoice; 
}

const systemChoice = GenerateComputerChoice();
console.log("Computer chose " + systemChoice)

function determineWiner(playerInput, computerChoice) {
    if(!playerInput){
        console.log("Game cancelled!")
        return;
    }
    let playerChoice = playerInput.toLowerCase();
// Validate input
    if (!["rock", "paper", "scissors"].includes(playerChoice)) {
        console.log("Invalid choice! Please choose Rock, Paper, or Scissors.");
        return;
    }
    console.log("You chose " + playerChoice);

    if(playerChoice === computerChoice){
        console.log("It's a draw!");
        return;
    }
   
if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
) {
    console.log("You win! " + playerChoice + " beats " + computerChoice );
} else {
    console.log("You lose! " + computerChoice + " beats " + playerChoice); // If not a draw and not a win, it's a loss
}
} determineWiner(makeChoice, systemChoice);


