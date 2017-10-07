<template>
  <div class="play">
	<!-- <notification :visible="notification.visible" :message="test"></notification> -->

 	<transition name="title--anim">
    	<h1 class="title">{{ user.name }}</h1>
    </transition>

	<transition name="stats--anim">
	    <div class="stats">
	    	<span class="stats__item">AB {{ selfSquall }}</span>
	    	<span class="stats__item">BC {{ coSquall }}</span>
	    	<span class="stats__item">Score {{ total }}</span>
	    </div>
    </transition>

    <div class="combinaisons">
    	<transition-group name="combinaisons__item--anim" tag="div" class="combinaisons__item--anim-container">
    		<a @click.prevent="selectCombin" class="combinaisons__item" href="#" v-for="(combin, value) in $store.state.game.combinaisons" v-bind:key="value" :data-key="value">{{ value }}</a>
    	</transition-group>
    </div>

	<transition name="popin--anim">
    	<popin @selectValue="selectMqr" @close="selectMqr" :config="popin.config" :data="popin.data" :display="popin.display"></popin>
    </transition>

    <div class="actions">
    	<button @click.prevent="sendScore" class="actions__btn">Enregistrer</button>
    	<button @click.prevent="clickFirstTry" class="first-try"></button>
    </div>
  </div>
</template>

<script>

import Score from '../../model/Score'
import Popin from '../Popin'

export default {

	created: function () {
		this.load()
	},

	data: function(){
		return {
			score: new Score(),
			firstTry: false,
			user: null,
			popin: {
				display: false,
				data: null,
				config: {}
			},
			notification: {
				visible: false,
				message: ''
			}
		}
	},

	computed: {
		total: {
			get: function() {
				return this.score.calcTotal();
			}
		},

		selfSquall: {
			get: function(){
				return this.user.effectiveSquall
			}
		},

		coSquall: {
			get: function(){
				return this.$store.state.game.effectiveSquall
			}
		}
	},

	components: {
		Popin
	},

	methods: {

		/*********************
		*	SCORE SELECTION
		*********************/

		// Click combinaison
		selectCombin: function (e) {
			if (this.current) this.current.className = this.current.className.replace(" combinaisons__item--active", "");			
			this.current = e.target
			this.current.className += " combinaisons__item--active";
			var combin = this.$store.state.game.combinaisons[e.target.getAttribute("data-key")];
			if (combin.name==="MQR") {
				this.popinMQR();
			} else {
				this.score.setCombin(combin)
			}
		},

		// Open popin with MQR content
		popinMQR : function(){
			this.popin = {
				display: true,
				config: {
					type: 'select'
				},
				data: [2, 3, 4, 5, 6],
			}
		},

		// Callback Popin MQR, select the final combinaison
		selectMqr: function(value){
			if (value) {
				this.score.combin = this.$store.state.combinaisons["MQR"];
				this.score.combin.value = parseFloat(value);
			}
			this.popin.display = false;	
		},

		// First try click
		clickFirstTry: function () {
			if ( this.firstTry === true ) {
				this.firstTry = false
			} else {
				this.firstTry = true
			}
		},

		/*********************
		*	DATAS MANAGE
		*********************/

		// Save data to store
		sendScore: function () {
			if( this.score.combin !== null ) {
				this.score.hydrateFromGame(this.$store.state.game)
				this.score.setFirstTry(this.firstTry)
				this.score.calcTotal()

				if (this.score.combin.firstValue !== 0) this.$store.commit("resetFirstValue", this.score.combin.name)
				this.$store.state.game.addScore(this.score)
				this.$emit("update-store");
				this.$router.push(this.$store.state.game.routePlay)
				this.load();
			}
		},

		// Called at creation and reload for setting base datas value
		load: function () {
			if (this.$store.state.game === null) this.$router.push('/');
			this.user = this.$store.state.game.getPlayer()
			this.score = new Score()
			this.$forceUpdate()
		}
	}
}

</script>

<style lang="sass" scoped>

@import "./../../styles/variables"

.combinaisons 
	display: flex
	flex-wrap: wrap
	justify-content: center
	max-width: $wrapper-normal
	margin: auto
	padding-bottom: $pad-big

	&__item 
		padding: $pad-medium
		background-color: $color-2
		margin: 10px
		text-align: center
		color: $color-4
		font-size: $font-normal
		text-transform: uppercase
		letter-spacing: 5px
		border-radius: $radius
		box-shadow: $shadow
		min-width: 100px
		transition: all .3s
		box-sizing: border-box
		&:hover, &--active
			background-color: $color-2-light

		&--anim-container 
			display: flex
			flex-wrap: wrap
			justify-content: center
		
.first-try 
	position: absolute
	height: 75px
	right: 0
	top: 0
	border-radius: 0
	width: 75px
	background-color: $color-2
	color: $color-3
	border: 0
	background-image: url("/static/assets/shamrock.svg")
	background-position: center
	background-size: 30px
	background-repeat: no-repeat

.stats 
	padding: 0 $pad-medium
	text-align: center
	background-color: $color-1
	color: white
	margin-bottom: $pad-medium
	font-weight: 200
	font-size: $font-medium

.stats__item 
	padding: $font-medium
	display: inline-block
	border-right: 1px solid $color-2
	font-size: $font-normal

.stats__item:first-child 
	border-left: 1px solid $color-2

.popin
	transition: all .3s
	&--anim
		&-enter, &-leave-to
			transform: scale(.6)
			opacity: 0

.actions
	transition: all .3s
	&:hover 
		background-color: $color-1-light
	&__btn
		background-color: transparent

@media screen and (max-width: 600px)
	.combinaisons
		&__item
			width: calc(50% - 20px)
			letter-spacing: 1px
</style>
