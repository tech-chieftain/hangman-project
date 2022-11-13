//! All the needed html variables
const LETTERS_CONTAINER = document.querySelector("#letters-container");
const WORDS_CONTAINER = document.querySelector("#word-container");
const HINT_CONTAINER = document.querySelector("#hint-container");

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

// Go over each letter and creat it
letters.forEach((letter) => {
  createElement(
    "button",
    [{ attributeName: "letter-button", value: letter },
    { attributeName: "class", value: "letter-button" },
    { attributeName: "disable", value: "false" }
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

document.querySelectorAll("button[letter-button]").forEach(button => {
  button.addEventListener("click",()=>{
    button.setAttribute("disable", true);
  })
});
