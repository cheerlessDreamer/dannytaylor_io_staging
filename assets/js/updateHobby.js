const textList = [
  "former vanlife enthusiast",
  "avgeek",
  "VR enthusiast",
  "multi-instrumentalist",
  "five-star Uber review holder",
  "budding self-hoster",
  "aspiring ceramicist",
  "sewing student",
  "good listener",
  "INTJ",
  "straight talker",
];

const icon = "<i class='ph-bold ph-arrows-clockwise'></i>";

const textToChange = document.querySelector("#hobby");

function randomlyAssignText() {
  let randomIndex, newText;
  do {
    randomIndex = Math.floor(Math.random() * textList.length);
    newText = textList[randomIndex];
  } while (newText === textToChange.textContent);

  textToChange.textContent = newText;
}

textToChange.addEventListener("click", randomlyAssignText);

randomlyAssignText();
