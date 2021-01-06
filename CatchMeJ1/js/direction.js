class Direction {
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

  

    DIRECTION.push(this.s);
  }

  reset() {
    this.elem.setAttribute("class", "");
    this.elem.classList.add("directionpos");
    this.elem.classList.add("directionElement");
    this.elem.classList.add("dirElem"+this.s.row);

    this.s.cellType = "normal";
    this.updateDatabase();
  }

  addDirection(){
    
    this.direction();
  }

  updateDatabase() {
    SEND_MESSAGE(DIRECTION, DIRECTION_ID)
  }
}
