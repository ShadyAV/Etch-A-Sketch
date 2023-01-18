const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

const gridDiv = document.getElementById("grid");
const sizeButton = document.getElementById("sizeButton");
const gridDivs = document.querySelectorAll('.gridDiv');
const colorPicker = document.getElementById("colorPicker");
const rgbButton = document.getElementById("rgbButton");

sizeButton.addEventListener("click", () => {
    let size = prompt("Please, enter the size of the grid", "64");
    deleteDivs();
    createDivs(size);
});

function deleteDivs() {
    gridDivs.forEach(div => {
        div.remove();
    });
}

let isDown = false
document.body.onmousedown = () => (isDown = true);
document.body.onmouseup = () => (isDown = false);

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorPicker.onclick = () => setCurrentMode("color");
rgbButton.onclick = () => setCurrentMode("rainbow");

function paintDiv(e) {
    if (e.type = "mouseover" && !isDown) return;
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }
}

function createDivs(size = 16) {
    for (let i = 0; i < size * size; i++) {
        const newDiv = document.createElement("div");
        gridDiv.appendChild(newDiv);
        newDiv.classList.add("gridDiv");
        newDiv.addEventListener("mouseover", paintDiv);
        newDiv.addEventListener("mousedown", paintDiv);
    }
    let root = document.documentElement;
    root.style.setProperty("--divs", size);
}

window.onload = () => {
    createDivs();
}


