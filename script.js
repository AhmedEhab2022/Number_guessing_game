// Get the necessary elements from the DOM
const submitButton = document.querySelector(".guessSubmit");
const userInput = document.querySelector("#guessField");
const statusText = document.querySelector("#statusText");
const prevGuesses = document.querySelector(".prevGuesses");
const guessLeft = document.querySelector(".remaining");
const noOfguessesSelect = document.querySelector(".noOfGuesses");
const game = document.querySelector(".game");
const maxNumberRange = document.querySelector(".range");
const maxNumberOutput = document.querySelector("output");
const saveButton = document.querySelector("#save");

let maxGuesses = parseInt(noOfguessesSelect.value);
const MIN_NUMBER = 1;
let maxNumber = maxNumberOutput.innerHTML;
// Generate a random number between 1 and 100
let correctNumber = Math.floor(Math.random() * maxNumber) + MIN_NUMBER;

let guessCount = 0;
let prevGuessesArray = [];
let win = false;

guessLeft.innerHTML = maxGuesses;

const validateInput = (guessNumber) => {
  if (
    isNaN(guessNumber) ||
    guessNumber < MIN_NUMBER ||
    guessNumber > maxNumber ||
    Number.isInteger(guessNumber) === false
  ) {
    userInput.value = "";
    return `Please enter a valid number between ${MIN_NUMBER} and ${maxNumber}.`;
  }
  return "";
};

const endGame = () => {
  userInput.disabled = true;
  submitButton.disabled = true;
  const restartButton = document.createElement("button");
  restartButton.className = "guessSubmit";
  restartButton.textContent = "Start new game";
  restartButton.style.fontSize = "1em";
  game.appendChild(restartButton);
  restartButton.addEventListener("click", restartGame);
};

const restartGame = () => {
  guessCount = 0;
  prevGuessesArray = [];
  statusText.innerHTML = "";
  prevGuesses.innerHTML = "";
  guessLeft.innerHTML = maxGuesses;
  guessLeft.style.color = "black";
  win = false;
  userInput.disabled = false;
  submitButton.disabled = false;
  noOfguessesSelect.disabled = false;
  maxNumberRange.disabled = false;
  saveButton.disabled = false;
  saveButton.ariaHidden = false;
  userInput.value = "";
  correctNumber = Math.floor(Math.random() * maxNumber) + MIN_NUMBER;
  const restartButton = document.querySelector("button");
  restartButton.remove();
};

const changeColorIf = () => {
  if (guessLeft.style.color !== "red" && guessCount > maxGuesses - 4) {
    guessLeft.style.color = "red";
  } else if (guessLeft.style.color === "red" && guessCount <= maxGuesses - 4) {
    guessLeft.style.color = "black";
  }
};

const updateUI = (msg, color) => {
  statusText.style.color = color;
  statusText.innerHTML = msg;
  changeColorIf();
  guessLeft.innerHTML = `${maxGuesses - guessCount}`;
};

submitButton.addEventListener("click", () => {
  const guessNumber = parseFloat(userInput.value);
  const validationMsg = validateInput(guessNumber);

  noOfguessesSelect.disabled = true;
  maxNumberRange.disabled = true;
  saveButton.disabled = true;
  saveButton.ariaHidden = true;
  if (validationMsg) {
    updateUI(validationMsg, "red");
    return;
  }

  guessCount++;

  if (guessNumber === correctNumber) {
    win = true;
    updateUI("You guessed the correct number!", "green");
  } else if (guessCount === maxGuesses) {
    updateUI(`Game over! The correct number was ${correctNumber}.`, "red");
  } else if (guessNumber > correctNumber) {
    updateUI("You guessed too high!", "#cccc00");
  } else {
    updateUI("You guessed too low!", "#cccc00");
  }

  if (!win && guessCount < maxGuesses) {
    prevGuessesArray.push(guessNumber);
    prevGuesses.innerHTML = prevGuessesArray.join(", ");
    userInput.value = "";
  }

  if (win || guessCount === maxGuesses) {
    endGame();
  }
});

maxNumberRange.addEventListener("change", () => {
  maxNumberOutput.innerHTML = maxNumberRange.value;
});

saveButton.addEventListener("click", () => {
  maxGuesses = parseInt(noOfguessesSelect.value);
  guessLeft.innerHTML = maxGuesses;
  maxNumber = parseInt(maxNumberOutput.value);
  saveButton.value = "Saved !";
  changeColorIf();
  setTimeout(function () {
    // Set the value back to the original value
    saveButton.value = "Save";
  }, 500); // Delay = 500 milliseconds
});
