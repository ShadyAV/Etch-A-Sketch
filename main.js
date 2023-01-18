const gridDiv = document.getElementById("grid");
const sizeButton = document.getElementById("sizeButton");
const gridDivs = document.querySelectorAll('.gridDiv');

sizeButton.addEventListener("click", function openPromtWindow() {
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
document.body.onmousedown = () => (isDown = true)
document.body.onmouseup = () => (isDown = false)

function paintDiv(newDiv) {
    newDiv.addEventListener("mouseover", function changeColor() {
        if (isDown) {
            newDiv.style.backgroundColor = "black";
        }
    });
    newDiv.addEventListener("mousedown", function changeColor() {
        newDiv.style.backgroundColor = "black";
    });
}

function createDivs(size = 16) {
    for (let i = 0; i < size * size; i++) {
        const newDiv = document.createElement("div");
        gridDiv.appendChild(newDiv);
        newDiv.classList.add("gridDiv");
        paintDiv(newDiv);
    }
    let root = document.documentElement;
    root.style.setProperty("--divs", size);
}

window.onload = () => {
    createDivs();
}


