class Laser {
  constructor() {
    
    this.h = document.querySelector(".horizontalButton");
    this.v = document.querySelector(".verticalButton");


  
    this.h.addEventListener("click", () => {
      this.destroyH(PLAYER.positions[3].row)
      this.updateLaserH();
    });

    this.v.addEventListener("click", () => {
      this.destroyV(PLAYER.positions[3].col)
      this.updateLaserV();
    });

    DATABASE.ref(OTHER_ID+"/lastMove").on("value", (snapshot) => {
      let lastMove = snapshot.val();
      if(COUNTER_OTHER == lastMove.count && lastMove.move == "laserH"){
        this.destroyH();
      }
      if(COUNTER_OTHER == lastMove.count && lastMove.move == "laserV"){
        this.destroyV();
      }
    });

    //POWER = this;
  }
  destroyH(row){
    for (let col = 0; col < N_COLS; col++) {
        const coords = `${col},${row}`; //"0,0";
        GRID[coords].destroyWall();
    } 
  }

  destroyV(col){
    for (let row = 0; row < N_ROWS; row++) {
        const coords = `${col},${row}`; //"0,0";
        GRID[coords].destroyWall();
    } 
  }
  updateLaserH(){
    if(ID == "catcher"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION_CATCHER[row].updateImg(DIRECTION_CATCHER[(row - 1)].image);
      }
      DIRECTION_CATCHER[1].updateImg("laserH2");
    }
    if(ID == "runner"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION[row].updateImg(DIRECTION[(row - 1)].image);
      }
      DIRECTION[1].updateImg("laserH");   
    }
    SEND_MESSAGE({count: COUNTER_SELF, move: "laserH"}, ID+"/lastMove");
    COUNTER_SELF++;
  }

  updateLaserV(){
    if(ID == "catcher"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION_CATCHER[row].updateImg(DIRECTION_CATCHER[(row - 1)].image);
      }
      DIRECTION_CATCHER[1].updateImg("laserV2");
    }
    if(ID == "runner"){
      for (let row = N_ROWS_P - 1; row > 1; row--) {
        DIRECTION[row].updateImg(DIRECTION[(row - 1)].image);
      }
      DIRECTION[1].updateImg("laserV");   
    }
    SEND_MESSAGE({count: COUNTER_SELF, move: "laserV"}, ID+"/lastMove");
    COUNTER_SELF++;
  }


  updateDatabase() {
    SEND_MESSAGE(POWER, POWER_ID)
  }
}
