//! All the needed html variables
const LETTERS_CONTAINER = document.querySelector("#letters-container");
const WORD_CONTAINER = document.querySelector("#word-container");
const HINT_CONTAINER = document.querySelector("#hint-container");
const myStickman = document.getElementById("hangman-canvas");
const context = myStickman.getContext("2d");

let HINT;

let counter = 0;

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
      drawHangman();
      counter++;
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
      if (counter < 8) {
        HINT_CONTAINER.append(HINT);
        counter += 2;
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

const draw = function (pathFromx, pathFromy, pathTox, pathToy) {
  context.moveTo(pathFromx, pathFromy);
  context.lineTo(pathTox, pathToy);
  context.stroke();
};

const head = function () {
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
};

const frame1 = function () {
  draw(0, 150, 150, 150);
};

const frame2 = function () {
  draw(10, 0, 10, 600);
};

const frame3 = function () {
  draw(0, 5, 70, 5);
};

const frame4 = function () {
  draw(60, 5, 60, 15);
};

const torso = function () {
  draw(60, 36, 60, 70);
};

const rightArm = function () {
  draw(60, 46, 100, 50);
};

const leftArm = function () {
  draw(60, 46, 20, 50);
};

const rightLeg = function () {
  draw(60, 70, 100, 100);
};

const leftLeg = function () {
  draw(60, 70, 20, 100);
};

const drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];

const drawHangman = () => {
  if (counter === 10) {
    alert("YOU KILLED THE MAN!!!");
    return;
  }
  drawArray[counter]();
  console.log(counter);
 
};
