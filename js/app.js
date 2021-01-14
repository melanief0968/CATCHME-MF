// class App {
//     constructor() {
//       //console.log("App lancée");
  
//       const urlParameter = new URLSearchParams(window.location.search);
//       this.ID = urlParameter.get("player");
//       console.log(this.ID);
//       this.setup();
//     }

//     setup(){
//         this.canvas = document.createElement("canvas");
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//         document.body.appendChild(this.canvas);
//         this.ctx = this.canvas.getContext("2d");
//         this.initGrid();
//         this.initCellsApp();
//         this.initPlayer();

//     }
//     // window.addEventListener("load", function () {
//     // // initPower();
//     // // initDirection();
//     // initGrid();
//     // // initPlayer();
//     // // listenToDatabase();
  
//     // // SEND_MESSAGE(PLAYER);
  
//     // // GAME = new Displacement(PAWNS);
//     // // initCellsApp();
//     // });

//     initGrid() {
//     let parent = document.querySelector("#gridContainer .cells");
//     let domParams = document.documentElement.style;
//     domParams.setProperty("--n-rows", N_ROWS);
//     domParams.setProperty("--n-cols", N_COLS);
//     domParams.setProperty("--size", GRID_SIZE + "vw");
  
//     // Construire la grille
//     for (let col = 0; col < N_COLS; col++) {
//       for (let row = 0; row < N_ROWS; row++) {
//         const coords = `${col},${row}`; //"0,0";
//         GRID[coords] = new Cell(col, row, parent);
//       }
//     }
//   }

//   getCellByCoords(row, col) {
//     const coords = `${col},${row}`; //"x, y"
//     return GRID[coords];
//   }

//   initCellsApp() {
//     for (let col = 0; col < N_COLS; col++) {
//       for (let row = 0; row < N_ROWS; row++) {
//         const coords = `${col},${row}`; //"0,0";
//         GRID[coords].app = GAME; 
//       }
//     }
//   }




//   initPlayer() {
//     let params = [
//       { col: 2, row: 0, color: null },
//       { col: 4, row: 0, color: null },
//       { col: 6, row: 0, color: null },
//       // { col: 4, row: 8, color: null },
//     ];
  
//     for (let { col, row } of params) {
//       //object destructuring
//       PAWNS.push(
//         new Player(
//           col,
//           row,
//           document.querySelector("#gridContainer .players"),
//           GRID
//         )
//       );
//     }
//   }
// }

// window.onload = () => {
//  new App();
// };