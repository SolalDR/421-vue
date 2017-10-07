import MixinHydrater from "./Mixin"

class Score {
  
  constructor() {
    this.combin = null;
    this.squall = 0;
    this.coSquall = 0;
    this.firstTry = false;
    this.total = null;    
    Object.assign(this, MixinHydrater);
  }

  static calcEffectiveSquall(value) {
     return (value>3) ? value - 3 : 0;
  }

  get effectiveSquall() {
   return (this.squall>3) ? this.squall - 3 : 0;
  }

  hydrateFromGame(game){
    this.squall = game.getPlayer().squall + 1;
    this.coSquall = game.squall + 1;
  }

  setCombin(combin){
    this.combin = combin;
  }

  setSquall(squall){
    this.squall = squall;
  }

  setFirstTry(firstTry){
    this.firstTry = firstTry;
  }


  calcTotal() {
    var total = 0;
    if( this.combin ) {
      if (this.combin.firstTry && this.firstTry) total += 1;
      if (this.combin.squall && this.squall) total += this.effectiveSquall;
      if (this.combin.squall && this.coSquall) total += Score.calcEffectiveSquall(this.coSquall);
      total += this.combin.value;
      if (this.combin.firstValue) total += this.combin.firstValue;
    }
    this.total = total;
    return total;
  }

}

export default Score