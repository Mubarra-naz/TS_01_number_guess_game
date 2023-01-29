#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
let checkConfirm = true;
let guessedCheck;
let guessAbleNumber;
let score = 0;
let numbeOfGames = 0;
const printMsg = (msg) => {
  console.log(msg);
};
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};
const resetData = (confirm) => {
  checkConfirm = confirm;
  guessedCheck = false;
  guessAbleNumber = generateRandomNumber();
  numbeOfGames++;
};
const validateNumber = (input) => {
  if (isNaN(input)) {
    return "Wrong user input";
  } else {
    return true;
  }
};
const guessTheNum = async () => {
  const input = await inquirer.prompt([
    {
      type: "input",
      name: "guess",
      message: "guess the number?",
      validate: validateNumber,
    },
  ]);
  if (input.guess == guessAbleNumber) {
    score++;
    guessedCheck = true;
    printMsg(chalk.green("Congratulations! you've guessed it right!"));
  } else if (input.guess > guessAbleNumber) {
    printMsg(chalk.red("Oh, No! your guess is greater than the number"));
  } else {
    printMsg(chalk.red("Your guess is smaller than the number!"));
  }
};
const makeGuess = async () => {
  for (let i = 0; i < 3 && guessedCheck === false; i++) {
    await guessTheNum();
    if (i == 2 && guessedCheck === false) {
      printMsg(
        `Sorry! You lost your chance.\nThe correct number was: ${guessAbleNumber}.\n`
      );
    }
  }
  const confirm = await inquirer.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: "Do you want to play again?",
    },
  ]);
  resetData(confirm.confirm);
  console.log("prompt: ", confirm.confirm);
};
resetData(true);
printMsg(
  chalk.magentaBright.bold(
    "Hey there! Let's get started with the guessing number game! I've generated a random number from 0-9. It's your tuem to guess it."
  )
);
do {
  await makeGuess();
} while (checkConfirm);
printMsg(
  `Great to have you here! Your final score is: ${chalk.green(
    score
  )} of ${chalk.blue(numbeOfGames)} games.\nI'll wait for you again! Bye!!!`
);
