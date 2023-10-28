const modalEl = document.querySelector("#modal");
const boardEl = document.querySelector("#wrapper");
const cellEl = document.querySelectorAll("[data-cell]");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn

startGame();

function startGame() {
    circleTurn = false;

    cellEl.forEach(cell => {
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverrClass()
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    //Check for Win
    //Check for Draw
    //Switch Turns
    swapTurns();
    setBoardHoverrClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverrClass() {
    boardEl.classList.remove(X_CLASS);
    boardEl.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        boardEl.classList.add(CIRCLE_CLASS)
    } else {
        boardEl.classList.add(X_CLASS)
    }
}