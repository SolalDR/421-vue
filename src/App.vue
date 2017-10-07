<template>
  <div id="app">
    <header-component  @update-store="updateSession"></header-component>
    <transition name="router-anim" mode="out-in" appear>
      <router-view class="main-container" @update-store="updateSession" @save-users="startGame"></router-view>
    </transition>
  </div>
</template>

<script>
 
import store from 'store'
import headerComponent from 'components/Header'

export default {
  store,

  beforeCreate(){
    if(!this.$session.exists()) this.$session.start()
    if (!this.$store.state.game && this.$session.get("game")) {
      this.$store.commit("newGame")
      this.$store.state.game.hydrate(this.$session.get("game"));
    }
  },

  methods: {

    // Commit a new game in the store
    startGame: function(users) {
      this.$store.commit('newGame')

      // If users, commit each of theme in the store
      for(var i=0; i<users.length; i++) {
        this.$store.commit('addUser', users[i])
      }

      // Call 
      this.$router.push(this.$store.state.game.routePlay);
      this.updateSession();
    },

    // Update session each store modificaction
    updateSession () {
      var dataParse = JSON.parse(JSON.stringify(this.$store.state.game ));
      this.$session.set("game", dataParse);
    }

  },

  components: {
    headerComponent
  }
}

</script>

<style lang="sass">

@import "styles/reset"
@import "styles/variables"
@import "styles/font"
@import "styles/scaffold"
@import "styles/blocks/btn"


.main-container
  transition: all .3s
  padding: 60px 0
.router-anim
  &-enter, &-leave-to
    opacity: 0


</style>
