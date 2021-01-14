const GRID = {};
const N_COLS = 9;
const N_ROWS = 9;
const GRID_SIZE = 4;

let PAWNS = [];

let OPPONENT_PAWNS = [];

let GAME;

let CELLS = [];
let PLAYER = { positions: [] };
let PLAYER_ID = "runner";
let OPPONENT_ID = "catcher";

let ID = "catcher";
let OTHER_ID = "runner";

let COUNTER_OTHER = 0;
let COUNTER_SELF = 0;
let CELLS_ID = "cells";

let POWER;
let POWER_ID = "bigcells";
const N_COLS_P = 1;
const N_ROWS_P = 9;

let DIRECTION = [];
let DIRECTION_ID = "bigcells";

let DIRECTION_CATCHER = [];

let VICTORY;
let DEFEAT;

let STARTED;

let isStarted = false;

//IDENTIFICATION DU JOUEUR
const urlParams = new URLSearchParams(window.location.search);
ID = urlParams.get("id");
OTHER_ID = ID == "catcher" ? "runner" : "catcher";

let TURN;

console.log("I am", ID);

let prefilledOpponent;
function bidon() {
  console.log("hehe mdr lol");
}

window.addEventListener("load", function () {
  initPower();
  initDirection();
  initTurn();
  initGrid();
  initPlayer();

  POWER = new Laser();

  GAME = new Displacement(PAWNS);
  initCellsApp();

  SEND_MESSAGE({ count: 99, move: "blank" }, ID + "/lastMove");
  COUNTER_OTHER = 0;
  DATABASE.ref(OTHER_ID + "/lastMove").on("value", (snapshot) => {
    let lastMove = snapshot.val();
    if (COUNTER_OTHER == lastMove.count) {
      updateMove(lastMove.move);
    }
  });

  VICTORY = document.querySelector(".resultV");
  DEFEAT = document.querySelector(".resultD");
  result("-");
  DATABASE.ref("Game").on("value", (snapshot) => {
    let gameResult = snapshot.val();
    if (gameResult.result == ID) {
      VICTORY.classList.remove("hidden");
      DEFEAT.classList.add("hidden");
    } else if (gameResult.result == "-") {
      VICTORY.classList.add("hidden");
      DEFEAT.classList.add("hidden");
    } else {
      VICTORY.classList.add("hidden");
      DEFEAT.classList.remove("hidden");
    }
  });

  DATABASE.ref("cells").on("value", (snapshot) => {
    let cells = snapshot.val();
    if (!cells) {
      console.log("cells is empty");
      return;
    }
    //CELLS = cells;
    for (let cell of cells) {
      for (let col = 0; col < N_COLS; col++) {
        for (let row = 0; row < N_ROWS; row++) {
          const coords = `${col},${row}`; //"0,0";0
          if (
            GRID[coords].s.col == cell.col &&
            GRID[coords].s.row == cell.row
          ) {
            if (cell.cellType == "normal") {
              GRID[coords].removeWall();
            } else {
              GRID[coords].buildWall();
            }
          }
        }
      }
    }
  });

  // DATABASE.ref("choosePlayer").on("value", (snapshot) => {
  //   let choice = snapshot.val();

  // });

  SEND_MESSAGE(PLAYER, "pawns");
});

// function listenToDatabase() {

//    prefilledOpponent = {pawns: [{col: 4, row: 8}], cells: []};

//   SEND_MESSAGE(prefilledOpponent, OPPONENT_ID)

//   DATABASE.ref(OPPONENT_ID).once("value", (snapshot) => {
//     let vals = snapshot.val();
//     // console.log(vals);
//     for (let pawn of vals.pawns) {

//       let col = pawn.col
//       let row = pawn.row

//       // if(player_ID = 0){
//       //   new Player...
//       // }
//       // else{
//       //   new Player_2...
//       // }
//       //OPPONENT_PAWNS.push(new Player(col, row, document.querySelector("#gridContainer .players"), GRID, true))
//     }

//   });

//   //self debugging
//   DATABASE.ref(OPPONENT_ID).on("value", (snapshot) => {
//     console.log(snapshot.val());
//   });
// }

function result(id) {
  SEND_MESSAGE({ result: id }, "Game");
}

function initPlayer() {
  let params = [
    { col: 2, row: 0, color: null, id: 0 },
    { col: 4, row: 0, color: null, id: 1 },
    { col: 6, row: 0, color: null, id: 2 },
    { col: 4, row: 8, color: null, id: 3 },
  ];

  for (let { col, row, color, id } of params) {
    //object destructuring
    PAWNS.push(
      new Player(
        col,
        row,
        color,
        id,
        document.querySelector("#gridContainer .players"),
        GRID
      )
    );
  }
}

window.addEventListener("click", (evt) => {
  // console.log(evt.pageX, evt.pageY, evt.target);
  // if (evt.target === PLAYER_1.elem) {
  //   // PLAYER_1.move(1, 0);
  // }
});

function initGrid() {
  let parent = document.querySelector("#gridContainer .cells");
  let domParams = document.documentElement.style;
  domParams.setProperty("--n-rows", N_ROWS);
  domParams.setProperty("--n-cols", N_COLS);
  domParams.setProperty("--size", GRID_SIZE + "vw");

  // Construire la grille
  for (let col = 0; col < N_COLS; col++) {
    for (let row = 0; row < N_ROWS; row++) {
      const coords = `${col},${row}`; //"0,0";
      GRID[coords] = new Cell(col, row, parent); //!\ Objet Cell à construire
    }
  }
  //   Cibler la cellule en haut à gauche de la grille
  //   GRID["0,0"];
}

//"0,0" "buildWall"

// Trouver une cellule
function getCellByCoords(row, col) {
  const coords = `${col},${row}`; //"x, y"
  return GRID[coords];
}

function initCellsApp() {
  for (let col = 0; col < N_COLS; col++) {
    for (let row = 0; row < N_ROWS; row++) {
      const coords = `${col},${row}`; //"0,0";
      GRID[coords].app = GAME; //!\ Objet Cell à construire
    }
  }
}

function initPower() {
  let parent = document.querySelector("#power .bigcells");
  let domParams = document.documentElement.style;
  domParams.setProperty("--n-rows", N_ROWS_P);
  domParams.setProperty("--n-cols", N_COLS_P);
  domParams.setProperty("--size", GRID_SIZE + "px");

  // Construire la grille
  for (let col = 0; col < N_COLS_P; col++) {
    for (let row = 0; row < N_ROWS_P; row++) {
      const coords = `${col},${row}`; //"0,0";
      DIRECTION_CATCHER[row] = new Direction(col, row, parent, "catcher"); //!\ Objet Cell à construire
    }
  }
}

function initDirection() {
  let parent = document.querySelector("#direction .bigcells");
  let domParams = document.documentElement.style;
  domParams.setProperty("--n-rows", N_ROWS_P);
  domParams.setProperty("--n-cols", N_COLS_P);
  domParams.setProperty("--size", GRID_SIZE + "px");

  // Construire la grille
  for (let col = 0; col < N_COLS_P; col++) {
    for (let row = 0; row < N_ROWS_P; row++) {
      const coords = `${col},${row}`; //"0,0";
      let direction = new Direction(col, row, parent, "runner");
      //GRID[coords] = direction; //!\ Objet Cell à construire
      DIRECTION[row] = direction;
    }
  }

  // document.querySelector('.directionElement').add.classList('first');

  // if(GRID[coords]=)
  // domParams.DIRECTION[0].addClass('first');
  // domParams.setProperty("--0-row", DIRECTION[0]);
  // let first = DIRECTION[0];
  // domParams.setProperty("first", DIRECTION[0]);
  // console.log(first);
}

function updateMove(direction) {
  if (OTHER_ID == "catcher") {
    for (let row = N_ROWS_P - 1; row > 1; row--) {
      DIRECTION_CATCHER[row].updateImg(DIRECTION_CATCHER[row - 1].image);
    }
    DIRECTION_CATCHER[1].updateImg(direction + "2");
  }
  if (OTHER_ID == "runner") {
    for (let row = N_ROWS_P - 1; row > 1; row--) {
      DIRECTION[row].updateImg(DIRECTION[row - 1].image);
    }
    DIRECTION[1].updateImg(direction);
  }
  COUNTER_OTHER++;
}

// function player(x,y){
// let parent = document.querySelector("#pawn");
// x = pawn.style.left;
// y = pawn.style.top;
// }
