class Cell {
  constructor(col, row, parent) {
    this.parent = parent;

    this.s = {};

    this.s.col = col;
    this.s.row = row;
    this.s.cellType = "normal";

    this.elem = document.createElement("div");

    this.reset();
    this.app = null;

    this.parent.appendChild(this.elem);

    // this.elem.style = this.s.col * this.size;
    // this.elem.style = this.s.row * this.size;
    this.elem.style.setProperty("--row", this.s.row);
    this.elem.style.setProperty("--col", this.s.col);

    //this.elem.addEventListener('click', this.buildWall.bind(this));
    this.elem.addEventListener("click", () => {
      if (TURN === ID && ID == "catcher") {
        this.toggleWall(); // active  desactive le mur
        swapTurn();
      }

      // this.buildWall();
    });

    CELLS.push(this.s);
  }

  //   update() {

  //   }
  toggleWall() {
    if (this.elem.classList.contains("wall")) {
      this.s.cellType = "normal";
    } else {
      this.s.cellType = "wall";
    }

    this.elem.classList.toggle("wall");

    this.app.refreshPlayersPos();
    this.updateWall();
    this.updateDatabase();
  }

  buildWall() {
    this.s.cellType = "wall";

    this.elem.classList.add("wall");
    this.app.refreshPlayersPos();

    // this.updateDatabase();
  }

  removeWall() {
    this.s.cellType = "normal";
    this.elem.classList.remove("wall");
    this.app.refreshPlayersPos();

    // this.updateDatabase();
  }

  destroyWall() {
    this.s.cellType = "normal";
    this.elem.classList.remove("wall");
    this.app.refreshPlayersPos();
    this.updateDatabase();
  }

  reset() {
    this.elem.setAttribute("class", "");
    this.elem.classList.add("position");
    this.elem.classList.add("gridElement");

    this.s.cellType = "normal";
    this.updateDatabase();
  }

  updateWall() {
    if (ID == "catcher") {
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION_CATCHER[row].updateImg(DIRECTION_CATCHER[row - 1].image);
      }
      DIRECTION_CATCHER[1].updateImg("wall2");
    }
    if (ID == "runner") {
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION[row].updateImg(DIRECTION[row - 1].image);
      }
      DIRECTION[1].updateImg("wall");
    }
    SEND_MESSAGE({ count: COUNTER_SELF, move: "wall" }, ID + "/lastMove");
    COUNTER_SELF++;
  }

  updateDatabase() {
    SEND_MESSAGE(CELLS, CELLS_ID);
  }
}
