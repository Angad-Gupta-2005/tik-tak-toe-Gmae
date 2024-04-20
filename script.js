let gameover = new Audio("audio/gameOver.mp3");
let turnAudio = new Audio("audio/ting.mp3");
var audio = new Audio("audio/musicAll.mp3");
//playing the music while playing the game and stop
/*
let gana = document.getElementById("stopM");
gana.addEventListener("click", () => {
  let song = new Audio("musicAll.mp3");
  if (song.paused) {
    song.play();
    gana.innerText = "Pause Music";
  } else {
    song.pause();
    gana.innerText = "Play Music";
  }
});
*/

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("stopM");

  button.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      button.textContent = "Pause Audio";
    } else {
      audio.pause();
      button.textContent = "Play Audio";
    }
  });
});

let turn = "X";
let isgameOver = false;

//Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

//Function to check for a win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerText + " has Won";
      isgameOver = true;
      //show winning image
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.width = "120px";
      audio.pause();
      gameover.play();
    }
  });
};

//Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      turnAudio.play();
      checkWin();
      if (!isgameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

//eventlistener to reset the game

let reset = document.getElementById("reset");
// console.log(reset);
reset.addEventListener("click", () => {
  let boxtext = document.querySelectorAll(".boxText");
  //   console.log(boxtext);
  Array.from(boxtext).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  isgameOver = false;
  //pause the music
  gameover.pause();
  //playing the music while playing game
  audio.play();
  //hide winning image
  document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
    "0";
});
