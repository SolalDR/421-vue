class Dice  {

  constructor(el){
    this.el = el;
    this.faces = this.el.getElementsByClassName("face");
    this.drawFaces();
    this.rotates = [
      [0, 1, 0, "180deg"],
      [-1, 0, 0, "90deg"],
      [0, 1, 0, "90deg"],
      [0, -1, 0, "90deg"],
      [1, 0, 0, "90deg"],
      [0, 0, 0, "90deg"] // 6
    ]
  }

  drawFaces() {
    for (var i = 0; i < this.faces.length; i++) {
      this.draw(this.faces[i]);
    }
  }
    
  draw(face) {
    face.innerHTML = face.getAttribute("data-face");
  }

  reset(){
     var r = this.rotates[num];
    this.el.setAttribute("style", "transform: rotate3d(1, 1, 0, 45deg)");
  }
    
  rotateTo(num) {
    var r = this.rotates[num];
    if(r){
      this.el.setAttribute("style", "transform: rotate3d(" + r[0] + ", " + r[1] + ", " + r[2] + ", "+ r[3] +")");
    }
  }

}

export default Dice