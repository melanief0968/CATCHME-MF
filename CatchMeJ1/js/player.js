class Player {
  constructor(col, row, parent, grid, isOpponent = false) {
    this.parent = parent;

    this.s = {}; // SHARED PARAMETERS
    this.s.col = col;
    this.s.row = row;

    this.grid = grid;



    this.elem = document.querySelector("#template .player").cloneNode(true);
    this.parent.appendChild(this.elem);
    this.selected = false;


    // this.direction = direction;

    // this.elem.style = this.s.col * this.size;
    // this.elem.style = this.s.row * this.size;
    //this.elem.addEventListener('click', this.buildWall.bind(this));

    this.updateCSS();
    this.navigationSystem = this.elem.querySelector(".navigation-system");
    this.arrows = this.navigationSystem.children;
    for (let arrow of this.arrows) {
      arrow.addEventListener("click", (e) => {
        this.arrowClick(e.target);
      });
    }

    if(!isOpponent) {
      PLAYER.pawns.push(this.s);
    } else {
      let index = OPPONENT_PAWNS.length;
      DATABASE.ref(`${OPPONENT_ID}/pawns/${index}`).on("value", (snapshot) => {
        let vals = snapshot.val();
        // console.log(vals);
      });
    }
      

  }

  refreshPos() {
    const coordsUp = `${this.s.col},${this.s.row - 1}`; //"x, y"
    const coordsLeft = `${this.s.col - 1},${this.s.row}`; //"x, y"
    const coordsRight = `${this.s.col + 1},${this.s.row}`; //"x, y"
    const coordsDown = `${this.s.col},${this.s.row + 1}`; //"x, y"

    if (this.grid[coordsUp] != null) {
      if (this.grid[coordsUp].elem.classList.contains("wall")) {
        this.arrows[0].classList.add("hidden");
      } else {
        this.arrows[0].classList.remove("hidden");
      }
    } else {
      this.arrows[0].classList.add("hidden");
    }

    if (this.grid[coordsLeft] != null) {
      if (this.grid[coordsLeft].elem.classList.contains("wall")) {
        this.arrows[1].classList.add("hidden");
      } else {
        this.arrows[1].classList.remove("hidden");
      }
    } else {
      this.arrows[1].classList.add("hidden");
    }

    if (this.grid[coordsRight] != null) {
      if (this.grid[coordsRight].elem.classList.contains("wall")) {
        this.arrows[2].classList.add("hidden");
      } else {
        this.arrows[2].classList.remove("hidden");
      }
    } else {
      this.arrows[2].classList.add("hidden");
    }

    if (this.grid[coordsDown] != null) {
      if (this.grid[coordsDown].elem.classList.contains("wall")) {
        this.arrows[3].classList.add("hidden");
      } else {
        this.arrows[3].classList.remove("hidden");
      }
    } else {
      this.arrows[3].classList.add("hidden");
    }

  }

  arrowClick(target) {
    if (this.selected) {
      let way = target.dataset.way;
      let movementX = 0,
        movementY = 0;
      let direction;
      if (way === "up") {
        movementY = -1;
      } else if (way === "down") {
        movementY = 1;
      } else if (way === "left") {
        movementX = -1;
      } else if (way === "right") {
        movementX = 1;
      }

      this.move(movementX, movementY);
      
    }
  }

  move(movementX, movementY) {
    let positionX = movementX + this.s.col;
    let positionY = movementY + this.s.row;

    if (positionX >= 0 && positionY >= 0 && positionX <= 8 && positionY <= 8) {
      this.s.col += movementX;
      this.s.row += movementY;
      this.updateCSS();
      this.refreshPos();
    }
  }

  select(sel) {
    this.selected = sel;
    if (this.selected) {
      this.navigationSystem.setAttribute("class", "navigation-system");
      // this.activateNavigationSystem(true);
      console.log("selected");
    } else {
      this.navigationSystem.setAttribute("class", "hidden");
      // this.activateNavigationSystem(false);
      console.log("deselected");
    }
  }

  updateCSS() {
    this.elem.style.setProperty("--row", this.s.row);
    this.elem.style.setProperty("--col", this.s.col);
  }

  updateDatabase() {
    if(isOpponent)
      return;

    SEND_MESSAGE(PLAYER)
  }

  // SEND_MESSAGE("catch_me/essai", data);
}
