import Player from "./Player"
import MixinHydrater from "./Mixin"

class Game {

  constructor(){
    this.squall = 0,
    this.player = 0,
    this.tour = 0,
    this.paused = false,
    this.players = [],
    this.combinaisons = null;
    Object.assign(this, MixinHydrater);
  }

  createChilds(datas){
    this.hydrateChilds(datas["players"], "players", Player)
  }


  ///////////////////////////////////
  //          GETTERS
  ///////////////////////////////////

  get effectiveSquall() {
     return (this.squall>3) ? this.squall - 3 : 0;
  }

  get lastScore() {
    return this.players[this.previousPlayer].lastScore
  }

  get chronoScore() {
    var scores = [];
    for (var i = 0; i <= this.tour; i++) {
      for (var j = 0; j < this.players.length; j++) {
        if (this.players[j].scores[i]) {
          scores.push(this.players[j].scores[i]);
        }
      }
    }
    return scores;
  }

  get previousPlayer(){
    return (this.player === 0) ? this.players.length - 1 : this.player - 1
  }

  get routePlay() {
     return '/play/' + this.tour + '/' + this.players[this.player].id
  }

  ///////////////////////////////////
  //          Players
  ///////////////////////////////////

  addPlayer (player) {
    this.players.push(player)
  }

  getPlayer () {
    return this.players[this.player];
  }

  ///////////////////////////////////
  //          Combin
  ///////////////////////////////////

  setFirstValue(name, value) {
    for(var combinaison in this.combinaisons){
      if (this.combinaisons[combinaison].name == name) {
        this.combinaisons[combinaison].firstValue = value;
      }
    }
  }

  findCombinByName(name){
    for(var combinaison in this.combinaisons){
      if (this.combinaisons[combinaison] == name) {
        return this.combinaisons[combinaison];
      }
    }
  }

  ///////////////////////////////////
  //          Squall
  ///////////////////////////////////

  manageSquall(player, breakSquall){
    if(breakSquall) {
      this.squall = 0;
      player.squall = 0;
    } else {
      this.squall += 1;
      player.squall += 1;
    }
  }

  calcSquall() {
    var chrono = this.chronoScore; 
    var squall = 0;
    for (var j = chrono.length - 1; j>=0; j--) {
      if (!chrono[j].combin.breakSquall) {
        squall++
      } else {
        break;
      }
    }
    return squall;
  }

  ///////////////////////////////////
  //          Score
  ///////////////////////////////////

  addScore (score) {
    var player = this.getPlayer();
    player.addScore(score);
    if(score.combin.firstValue !== 0) this.setFirstValue(score.combin.name, 0)
    this.manageSquall(player, score.combin.breakSquall);
    this.next();
  }


  ///////////////////////////////////
  //          Actions
  ///////////////////////////////////
  
  next () {
    if (this.players.length - 1 == this.player) {
      this.tour++;
      this.player = 0;
    } else {
      this.player++
    }
  }

  previous () {
    console.log("Hello", this.lastScore);
    if (this.lastScore) {
      this.players[this.previousPlayer].removeLastScore();
      this.squall = this.calcSquall();
      this.player = this.previousPlayer;
    }
  }

}

export default Game