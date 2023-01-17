const gridDiv = document.getElementById("grid");
const sizeButton = document.getElementById("sizeButton");

sizeButton.addEventListener("click", function openPromtWindow() {
    let size = prompt("Please, enter the size of the grid", "64")
    const gridDivs = document.querySelectorAll('.gridDiv');
    gridDivs.forEach(div => {
        div.remove();
    });
    createDivs(size);
});
createDivs();
function createDivs(size = 16) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const newDiv = document.createElement("div");
            gridDiv.appendChild(newDiv);
            newDiv.style.border = "1px solid #0000FF";
            newDiv.classList.add("gridDiv");
        }
    }
    let root = document.documentElement;
    root.style.setProperty("--divs", size);
}


