//! All the needed html variables
const LETTERS_CONTAINER = document.querySelector("#letters-container")
const WORDS_CONTAINER = document.querySelector("#word-container")
const HINT_CONTAINER = document.querySelector("#hint-container")


const letters = 'abcdefghijklmnopqrstuvwxyz'.split("")

letters.forEach((letter)=>{
const letterButton = document.createElement("button");
letterButton.setAttribute("letter-button", letter);
letterButton.innerText = letter;
LETTERS_CONTAINER.append(letterButton);
})
