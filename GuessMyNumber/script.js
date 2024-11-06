'use strict';

// Select elements, DOM element sectors
const welcomeSection = document.querySelector('.welcome');
const gameContainer = document.querySelector('.game-container');
const startButton = document.querySelector('.start');
const againButton = document.querySelector('.again');
const checkButton = document.querySelector('.check');
const guessInput = document.querySelector('.guess');
const messageElement = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const numberElement = document.querySelector('.number');

// Constants
const MAX_SCORE = 20;
const MIN_GUESS = 1;
const MAX_GUESS = 20;

// Variables for game logic
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = MAX_SCORE;
let highscore = 0;
let gameOver = false;

// Utility Functions, function references
const displayMessage = message => messageElement.textContent = message;
const setBodyBackground = color => document.querySelector('body').style.backgroundImage = color;
const resetNumberElement = () => numberElement.style.width = '15rem';

// Game Logic Functions
const handleWin = () => {
  displayMessage('🎉 Correct Number!');
  numberElement.textContent = secretNumber;
  setBodyBackground('linear-gradient(180deg, #60b347 0%, #60b347 100%)');
  numberElement.style.width = '30rem';
  if (score > highscore) {
    highscore = score;
    highscoreElement.textContent = highscore;
  }
  gameOver = true;
};

const handleLose = () => {
  displayMessage('💥 You lost the game!');
  scoreElement.textContent = 0;
  setBodyBackground('linear-gradient(180deg, #ff0000 0%, #ff0000 100%)');
  gameOver = true;
};

const resetGame = () => {
  score = MAX_SCORE;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  gameOver = false;

  displayMessage('Start guessing...');
  scoreElement.textContent = score;
  numberElement.textContent = '?';
  guessInput.value = '';
  
  setBodyBackground('linear-gradient(180deg, #7d8180 0%, #4b4b4d 50%, #2e2d2d 100%)');
  resetNumberElement();
};

// Event Listeners
startButton.addEventListener('click', () => {
  welcomeSection.style.display = 'none';
  gameContainer.style.display = 'block';
});

checkButton.addEventListener('click', () => {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess < MIN_GUESS || guess > MAX_GUESS) {
    displayMessage(`🚫 Please enter a number between ${MIN_GUESS} and ${MAX_GUESS}!`);
  } else if (guess === secretNumber) {
    handleWin();
  } else if (score > 1) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    score--;
    scoreElement.textContent = score;
  } else {
    handleLose();
  }
});

againButton.addEventListener('click', resetGame);
