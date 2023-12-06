const modalEl = document.querySelector('#modal');
const modalImgEl = document.querySelector('.modal > img');
const modalTextEl = document.querySelector('.modal > h3');
const modalBtnEl = document.querySelector('.modal > button');
const containerEl = document.querySelector('#container');
const boardEl = document.querySelector('#wrapper');
const titleContainerEl = document.querySelector('.title-container');
const titleEl = document.querySelector('.title');
const cellEl = document.querySelectorAll('[data-cell]');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

function startGame() {
  circleTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(CIRCLE_CLASS);
    cell.classList.remove(X_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverrClass();
  titleContainerEl.style.backgroundColor = '#e8ddb5';
  titleEl.textContent = 'Let the Game Begin!';
  modalEl.close();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  //Check for Win
  if (checkWin(currentClass)) {
    // console.log('you win!');//Test
    endGame(false);
  } else if (isDraw()) {
    //Check for Draw
    endGame(true);
  } else {
    //Switch Turns
    swapTurns();
    setBoardHoverrClass();
  }
}

function endGame(draw) {
  modalEl.showModal();
  if (draw) {
    modalImgEl.src = './img/draw2.gif';
    modalTextEl.textContent = `Draw !`;
  } else {
    modalImgEl.src = './img/winner.gif';
    modalTextEl.innerHTML = `<h3 class="winning-msg-text">${
      circleTurn ? 'Congrats O <br> You won 🏆' : 'Congrats X <br> You won 🏆'
    }</h3>`;
  }
}

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverrClass() {
  boardEl.classList.remove(X_CLASS);
  boardEl.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    boardEl.classList.add(CIRCLE_CLASS);
    titleContainerEl.style.backgroundColor = '#b2c9ab';
    titleEl.textContent = `O's turn !`;
  } else {
    boardEl.classList.add(X_CLASS);
    titleContainerEl.style.backgroundColor = '#9aaec9';
    titleEl.textContent = `X's turn !`;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellEl[index].classList.contains(currentClass);
    });
  });
}

modalBtnEl.addEventListener('click', startGame);

startGame();
