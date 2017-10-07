import Vue from 'vue'
import Vuex from 'vuex'
import Player from './model/Player.js'
import Game from './model/Game.js'
import combinaisons from './combinaisons.json';

Vue.use(Vuex)

const state = {
  game: null,
  combinaisons
}



const mutations = {
  addUser (state, name) {
    if (state.game) state.game.addPlayer(new Player(name));
  },
  newGame () {
    state.game = new Game();
    state.game.combinaisons = combinaisons;
    return state.game;
  },
  resetFirstValue (state, name) {
    for (var i=0; state.game.combinaisons.length; i++) {
      if (state.game.combinaisons[i].name == name) {
        state.game.combinaisons[i].firstValue = 0
      }
    }
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  addUser: ({ commit }) => commit('addUser')
}

const getters = {
  countPlural: ({ count }) => Math.min(count, 2)
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  watch: {
    state: function(val){
      console.log(firstValue)
    }
  }
})
