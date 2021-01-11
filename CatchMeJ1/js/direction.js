class Direction {
  constructor(col, row, parent, color) {
    this.parent = parent;

    this.s = {};

    this.s.col = col;
    this.s.row = row;
    this.s.cellType = "normal";
    this.color = color;
    this.elem = document.createElement("div");
    this.image = "blank";
    this.img = document.createElement("img");
    this.img.setAttribute("src", "img/blank.png");
    this.img.classList.add("fleche");
    this.reset();
    this.app = null;

    this.parent.appendChild(this.elem);
    this.elem.appendChild(this.img);
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
    this.elem.classList.add("dirElem"+this.s.row+""+this.color);

    this.s.cellType = "normal";
    this.updateDatabase();
  }

  addDirection(){
    
    this.direction();
  }

  updateImg(image){
    this.image = image;
    this.img.setAttribute("src", "img/" + image + ".png");
  }

  updateDatabase() {
    SEND_MESSAGE(DIRECTION, DIRECTION_ID)
  }
}
