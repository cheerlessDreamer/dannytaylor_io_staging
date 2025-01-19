// Description: Blink image on mouse click
const pic = document.getElementById("blink");
let isMouseDown = false;
let closeEndTime = 0;

const blink = () => {
    if (!isMouseDown) {
        pic.style.visibility = "visible";
        setTimeout(() => (pic.style.visibility = "hidden"), 100);
    }
};

const close = () => {
    isMouseDown = true;
    pic.style.visibility = "visible";
    closeEndTime = Date.now() + 100;
};

const open = () => {
    const delay = Math.max(0, closeEndTime - Date.now());
    setTimeout(() => {
        isMouseDown = false;
        pic.style.visibility = "hidden";
    }, delay);
};

document.addEventListener("mousedown", close);
document.addEventListener("mouseup", open);

const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

const blinkRandomly = () => {
    blink();
    setTimeout(blinkRandomly, getRandomInRange(2000, 4000));
};

blinkRandomly();