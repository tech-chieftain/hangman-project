//! All the needed html variables
const LETTERS_CONTAINER = document.querySelector("#letters-container");
const WORD_CONTAINER = document.querySelector("#word-container");
const HINT_CONTAINER = document.querySelector("#hint-container");
let HINT;

let counter = 10;

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

// Go over each letter and creat it
letters.forEach((letter) => {
  createElement(
    "button",
    [
      { attributeName: "letter-button", value: letter },
      { attributeName: "class", value: "letter-button" },
      { attributeName: "disable", value: "false" },
    ],
    letter,
    LETTERS_CONTAINER
  );
});

// Create elements and append them.
function createElement(element, attributes, innerText, container) {
  const letterButton = document.createElement(element);
  attributes.forEach((attribute) => {
    letterButton.setAttribute(attribute.attributeName, attribute.value);
  });
  letterButton.innerText = innerText;
  container.append(letterButton);
}

document.querySelectorAll("button[letter-button]").forEach((button) => {
  button.addEventListener("click", () => {
    button.setAttribute("disable", true);
    const guessedLetter = document.querySelectorAll(
      `span[letter="${button.innerText}"`
    );
    if (guessedLetter.length > 0) {
      guessedLetter.forEach((guessedLetter) => {
        guessedLetter.innerText = button.innerText;
      });
    } else {
      counter--;
    }
    console.log(guessedLetter);
  });
});

// Fetch the word from the api and use it
const getWord = async () => {
  const data = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const word = await data.json();

  const defintionData = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
  );
  const dictionaryData = await defintionData.json();

  try {
    HINT = dictionaryData[0].meanings[0].definitions[0].definition;
  } catch (error) {
    HINT = "No definition for this word. Sorry 🙏";
    console.log(error);
  } finally {
    const hintButton = document.getElementById("hint-button");

    hintButton.addEventListener("click", () => {
      if (counter > 2) {
        HINT_CONTAINER.append(HINT);
        counter -= 2;
      } else {
        HINT_CONTAINER.append("You're going to die if I show you the hint 😈");
      }
    });
    console.log("Finally");
  }

  const letters = word[0].split("");
  console.log(letters);

  letters.forEach((letter) => {
    createElement(
      "span",
      [
        { attributeName: "letter", value: letter },
        { attributeName: "class", value: "letter-dash" },
      ],
      "-",
      WORD_CONTAINER
    );
  });
};

getWord();
