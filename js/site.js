const joc = document.getElementById("joc");
const btnReset = document.getElementById("btnReset");
let directie = "r";
let interval = 250;
let mancare;
let sarpe = [];
let cap;
const w = 400;
const h = 600;
const bw = 10;

document.addEventListener("DOMContentLoaded", onLoad);
document.addEventListener("keydown", onKeyDown);
btnReset.addEventListener("click", onReset);

function onLoad() {
  creazaSarpe(200, 50);
  genereazaMancare();
}
function onReset() {
  joc.innerHTML = "";
  sarpe.length = 0;
  btnReset.disabled = true;
  interval = 250;
  directie = "r";
  creazaSarpe(200, 50);
  genereazaMancare();
  timer = setInterval(gameLoop, interval);
}

function creazaSarpe(left, top) {
  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    left = left - bw;
    sarpe.push(div);
    joc.appendChild(div);
  }
  cap = sarpe[0];
}
let timer = setInterval(gameLoop, interval);
function gameLoop() {
  let t = parseInt(cap.style.top);
  let l = parseInt(cap.style.left);
  if (gameOver(t, l)) {
    clearInterval(timer);
    btnReset.disabled = false;
    alert("Game over");
    return;
  }
  if (
    cap.offsetLeft == mancare.offsetLeft &&
    cap.offsetTop == mancare.offsetTop
  ) {
    sarpe.splice(1, 0, mancare);
    genereazaMancare();
  }
  cap.oldT = t;
  cap.oldL = l;
  switch (directie) {
    case "r":
      l = l + bw;
      break;
    case "l":
      l = l - bw;
      break;
    case "u":
      t = t - bw;
      break;
    case "d":
      t = t + bw;
      break;
  }
  cap.style.top = `${t}px`;
  cap.style.left = `${l}px`;
  for (let i = 1; i < sarpe.length; i++) {
    let prev = sarpe[i - 1];
    t = parseInt(sarpe[i].style.top);
    l = parseInt(sarpe[i].style.left);
    sarpe[i].oldT = t;
    sarpe[i].oldL = l;
    sarpe[i].style.top = `${prev.oldT}px`;
    sarpe[i].style.left = `${prev.oldL}px`;
  }
}
function gameOver(t, l) {
  for (let i = l; i < sarpe.length; i++) {
    if (sarpe[i].offsetLeft == l && sarpe[i].offsetTop == l) return true;
  }
  return t >= h || l < 0 || t < 0 || l >= w;
}
function genereazaMancare() {
  let d = document.createElement("div");
  let t = 10 * genereazaNumar(0, h / 10 - 1);
  let l = 10 * genereazaNumar(0, w / 10 - 1);
  d.style.top = `${t}px`;
  d.style.left = `${l}px`;
  mancare = d;
  joc.appendChild(d);
}
function genereazaNumar(min, max) {
  return Math.ceil(min + Math.random() * (max - min));
}
function onKeyDown(e) {
  switch (e.key) {
    case "ArrowRight":
      directie = "r";
      break;
    case "ArrowLeft":
      directie = "l";
      break;
    case "ArrowUp":
      directie = "u";
      break;
    case "ArrowDown":
      directie = "d";
      break;
  }
}
