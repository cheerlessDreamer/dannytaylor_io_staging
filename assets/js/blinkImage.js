// Description: Blink image on mouse click
const pic = document.getElementById("blink");
let isMouseDown = false;
let closeEndTime = 0;

const blink = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 6) {
    pic.style.visibility = "visible";
    return;
  }

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
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 6) {
    return;
  }

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
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 6) {
    pic.style.visibility = "visible";
    return;
  }

  blink();
  setTimeout(blinkRandomly, getRandomInRange(2000, 4000));
};

blinkRandomly();
