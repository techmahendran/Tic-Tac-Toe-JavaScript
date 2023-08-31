const btn_options = document.querySelectorAll(".btn-option");
const restartBtn = document.querySelector(".restart");
const popupBox = document.querySelector(".popup");
const popupMessage = document.querySelector("#message");
const newGameBtn = document.querySelector("#new-game");

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

const enableButtons = () => {
  for (let index = 0; index < btn_options.length; index++) {
    const btn_option = btn_options[index];
    btn_option.innerText = "";
    btn_option.disabled = false;
  }

  popupBox.classList.add("hide");
};

//New Game
newGameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// restartBtn
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  count = 0;
  enableButtons();
}

const winFunction = (letter) => {
  disabledButtons();

  if (letter === "X") {
    popupMessage.innerHTML = "&#128525; <br> 'X' wins";
  } else {
    popupMessage.innerHTML = "&#128525; <br> 'O' wins";
  }
};

// Fun is Draw
const drapGame = () => {
  disabledButtons();
  popupMessage.innerHTML = "&#129312; <br> It's a Draw";
};

const disabledButtons = () => {
  for (let index = 0; index < btn_options.length; index++) {
    const btns = btn_options[index];
    popupBox.classList.remove("hide");
  }
};

// Win Logic
const winChecker = () => {
  for (const i of winningPattern) {
    let [ele1, ele2, ele3] = [
      btn_options[i[0]].innerText,
      btn_options[i[1]].innerText,
      btn_options[i[2]].innerText,
    ];

    if (ele1 != "" && ele2 != "" && ele3 != "") {
      if (ele1 == ele2 && ele2 == ele3) {
        winFunction(ele1);
      }
    }
  }
};

// Display X/O on click

for (let index = 0; index < btn_options.length; index++) {
  const btn_option = btn_options[index];
  btn_option.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      // Display X
      btn_option.innerText = "X";
      // btn_option.disabled = true;
    } else {
      xTurn = true;
      // Display Y
      btn_option.innerText = "O";
      // btn_option.disabled = true;
    }
    count += 1;
    if (count == 9) {
      drapGame();
      // It's a draw since there are a total of 9 boxed
    }
    winChecker();
  });
}

window.onload = enableButtons;
