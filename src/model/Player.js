import Score from "./Score"
import MixinHydrater from "./Mixin"


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class Player {
  constructor(name, width) {
    this.id = guid();
    this.name = name;
    this.scores = [];
    this.squall = 0;
    this.warnCount = 0;
    this.total = 0;
    Object.assign(this, MixinHydrater);
  }

  createChilds(datas){
    this.hydrateChilds(datas["scores"], "scores", Score)
  }

  // Getters

  get effectiveSquall() {
     return (this.squall>3) ? this.squall - 3 : 0;
  }

  get lastScore() {
    return this.scores[this.scores.length - 1];
  }

  // Calculs

  calcSquall() {
    var squall = 0
    for (var i = this.scores.length - 1; i >= 0; i--) {
      if (!this.scores[i].combin.breakSquall) {
        squall++;
      } else {
        break;
      }
    }
    return squall
  }

  calcTotal () {
    var total = 0;
    for (var i = 0; i < this.scores.length; i++) {
      total += this.scores[i].total;
    }
    this.total = total;
  } 


  // Actions

  addScore (score) {
    this.scores.push(score)
    this.calcTotal();
  }

  removeLastScore () {
    if(this.scores.length){
      this.scores.splice(this.scores.length-1, 1);
      this.squall = this.calcSquall();
      console.log(this.squall, "after calc")
      this.calcTotal();  
    }
  }
}

export default Player