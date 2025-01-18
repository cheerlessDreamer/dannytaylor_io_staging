const textList = [
    "recovering vanlife enthusiast",
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
    "opinionated introvert",
    "night owl",
];

const icon = "<i class='ph-bold ph-arrows-clockwise'></i>";

const textToChange = document.querySelector("#hobby");

function randomlyAssignText() {
    let randomIndex, newText;
    do {
        randomIndex = Math.floor(Math.random() * textList.length);
        newText = textList[randomIndex];
    } while (newText === textToChange.textContent);

    textToChange.innerHTML = newText + icon;
}

textToChange.addEventListener("click", randomlyAssignText);

randomlyAssignText();