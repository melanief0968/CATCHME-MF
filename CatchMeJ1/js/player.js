class Player {
  constructor(col, row, color, id, parent, grid) {
    this.parent = parent;
    this.id = id;
    this.s = {}; // SHARED PARAMETERS
    this.s.col = col;
    this.s.row = row;
    this.color = color;
    this.grid = grid;

    // DATABASE.ref("Counter/x").on("value", (snapshot) => {
    //   let vals = snapshot.val();
    //   console.log(vals);
    //   // const keys = Object.keys(vals);
    //   // console.log(keys);
    //   // console.log(vals.Counter);
    // });

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


    PLAYER.positions.push(this.s);
    // } else {
    //   let index = OPPONENT_PAWNS.length;
    //   DATABASE.ref(`${OPPONENT_ID}/pawns/${index}`).on("value", (snapshot) => {
    //     let vals = snapshot.val();
    //     console.log(vals);
    //   });
    // }
    DATABASE.ref("pawns/positions").on("value", (snapshot) => {
      let position = snapshot.val();
      PLAYER.positions = position;
      console.log(position[this.id]);
      this.setpos(position[this.id].col, position[this.id].row);
      // const keys = Object.keys(vals);
      // console.log(keys);
      // console.log(vals.Counter);
    });
    
    if(ID == "catcher"){
      if(this.id == 3){
        this.elem.classList.add("hidden");
      }
    }
    if(ID == "runner"){
      if(this.id != 3){
        this.elem.classList.add("hidden");
      }    
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
      //SEND_MESSAGE(this.s, `${ID }/position`);
      PLAYER.positions[this.id] = this.s;
      if(movementX > 0){
        this.updateDirection("right");
      }
      if(movementX < 0){
        this.updateDirection("left");
      }
      if(movementY > 0){
        this.updateDirection("down");
      }
      if(movementY < 0){
        this.updateDirection("up");
      }

      this.updateDatabase();
      //valeurs dans firebase send
      this.updateCSS();
      this.refreshPos();

      if(ID == "catcher" && positionY == PLAYER.positions[3].row && positionX == PLAYER.positions[3].col){
        result(ID);
      }else if(ID == "runner" && positionY == PLAYER.positions[0].row && positionX == PLAYER.positions[0].col){
        result(OTHER_ID);
      }
      else if(ID == "runner" && positionY == PLAYER.positions[1].row && positionX == PLAYER.positions[1].col){
        result(OTHER_ID);
      }
      else if(ID == "runner" && positionY == PLAYER.positions[2].row && positionX == PLAYER.positions[2].col){
        result(OTHER_ID);
      }else if(ID == "runner" && positionY == 0){
        result(ID);
      }
    }

    
  }

  setpos(positionX, positionY) {
    if (positionX >= 0 && positionY >= 0 && positionX <= 8 && positionY <= 8) {
      this.s.col = positionX;
      this.s.row = positionY;
      //SEND_MESSAGE(this.s, `${ID }/position`);
      PLAYER.positions[this.id] = this.s;
      //this.updateDatabase();
      //valeurs dans firebase send
      this.updateCSS();
      this.refreshPos();
    }
  }

  updateDirection(direction){
    if(ID == "catcher"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION_CATCHER[row].updateImg(DIRECTION_CATCHER[(row - 1)].image);
      }
      DIRECTION_CATCHER[1].updateImg(direction+"2");
    }
    if(ID == "runner"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION[row].updateImg(DIRECTION[(row - 1)].image);
      }
      DIRECTION[1].updateImg(direction);   
    }
    SEND_MESSAGE({count: COUNTER_SELF, move: direction}, ID+"/lastMove");
    COUNTER_SELF++;
  }

  select(sel) {
    this.selected = sel;
    if (this.selected) {
      this.navigationSystem.setAttribute("class", "navigation-system");
      // this.activateNavigationSystem(true);
      // console.log("selected");
    } else {
      this.navigationSystem.setAttribute("class", "hidden");
      // this.activateNavigationSystem(false);
      // console.log("deselected");
    }
  }

  updateCSS() {
    this.elem.style.setProperty("--row", this.s.row);
    this.elem.style.setProperty("--col", this.s.col);
  }

  updateDatabase() {
   

    SEND_MESSAGE(PLAYER,"pawns")

  }



  // SEND_MESSAGE("catch_me/essai", data);
}
