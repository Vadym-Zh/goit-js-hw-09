// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Color switcher</title>
//     <link rel="stylesheet" href="css/common.css" />
//   </head>
//   <body>
//     <p><a href="index.html">Go back</a></p>

//     <button type="button" data-start>Start</button>
//     <button type="button" data-stop>Stop</button>

//     <script src="js/01-color-switcher.js" type="module"></script>
//   </body>
// </html>

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

const refs = {
  bodyEl: document.querySelector('body'),
  startBtEl: document.querySelector('button[data-start]'),
  stopBtEl: document.querySelector('button[data-stop]'),
};

refs.startBtEl.addEventListener('click', e => {
  bodyBgChenger.startColor();
});
refs.stopBtEl.addEventListener('click', e => {
  bodyBgChenger.stopColor();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyBgChenger = {
  isActive: false,
  startColor() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    console.log('startColorIsActive:', this.isActive);
    this.inervalId = setInterval(() => {
      refs.bodyEl.style.backgroundColor = getRandomHexColor();
      console.log('backgroundColor:', getRandomHexColor());
    }, 1000);
  },
  stopColor() {
    if (!this.isActive) {
      return;
    }
    this.isActive = false;

    console.log('startColorIsActive:', this.isActive);
    clearInterval(this.inervalId);
  },
};
