const DEFAULT_COLOR = "#532828";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = "16";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentMode(newMode) {
    activeButton(newMode);
    currentMode = newMode;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const gridDiv = document.getElementById("grid");
const sizeButton = document.getElementById("sizeButton");
const gridDivs = document.querySelectorAll('.gridDiv');
const colorPicker = document.getElementById("colorPicker");
const rgbButton = document.getElementById("rgbButton");
const eraseButton = document.getElementById("eraseButton");
const clearButton = document.getElementById("clearButton");

sizeButton.addEventListener("click", () => {
    let currentSize = prompt("Please, enter the size of the grid", "64");
    if (currentSize) {
        deleteDivs();
        setCurrentSize(currentSize);
        createDivs(currentSize);
    }

});

function deleteDivs() {
    gridDiv.innerHTML = "";
}

let isDown = false
document.body.onmousedown = () => (isDown = true);
document.body.onmouseup = () => (isDown = false);

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorPicker.onclick = () => setCurrentMode("color");
rgbButton.onclick = () => setCurrentMode("rainbow");
eraseButton.onclick = () => setCurrentMode("erase");
clearButton.onclick = () => clearDivs();

function paintDiv(e) {
    if (e.type === "mouseover" && !isDown) return;
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    }
    else if (currentMode === "erase") {
        e.target.style.backgroundColor = "#e6e6e6";
    }
}

function clearDivs() {
    gridDiv.innerHTML = "";
    createDivs(currentSize);
}

function createDivs(size) {
    gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        const newDiv = document.createElement("div");
        gridDiv.appendChild(newDiv);
        newDiv.classList.add("gridDiv");
        newDiv.addEventListener("mouseover", paintDiv);
        newDiv.addEventListener("mousedown", paintDiv);
    }
}

function activeButton(newMode) {
    if (currentMode === "rainbow") {
        rgbButton.classList.remove("active");
    } else if (currentMode === "color") {
        colorPicker.classList.remove("active");
    } else if (currentMode === "erase") {
        eraseButton.classList.remove("active");
    }

    if (newMode === "rainbow") {
        rgbButton.classList.add("active");
    } else if (newMode === "color") {
        colorPicker.classList.add("active");
    } else if (newMode === "erase") {
        eraseButton.classList.add("active");
    }
}

window.onload = () => {
    createDivs(DEFAULT_SIZE);
    activeButton(DEFAULT_MODE);
}


