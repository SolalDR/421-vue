
<template>


  <div class="header">	
  	<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" style="display:none;enable-background:new 0 0 50 50;" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 50 50" xml:space="preserve">
		<symbol id="menu-logo">
			<g >
				<rect y="3" width="50" height="2"/>
				<rect y="17" width="50" height="2"/>
				<rect y="31" width="50" height="2"/>
				<rect y="45" width="50" height="2"/>
			</g>
		</symbol>
	</svg>
  	<div class="header-top">
	  	<transition name="header-top__item--anim">
	  		<ul class="header-top__menu" v-if="!responsive">
	  		  	<li v-if="gameActive && $route.name !== 'overview'" v-bind:key="overview" class="header-top__item"><router-link to="/overview">Overview</router-link></li>
	  		  	<li v-if="gameActive && $route.name !== 'play'" v-bind:key="2" class="header-top__item"><a @click.prevent="playBtn">Continue</a></li>
	  		  	<li v-if="gameActive" v-bind:key="2" class="header-top__item"><a @click.prevent="previousBtn">Previous</a></li>
	  		  	<li v-bind:key="begin" v-if="$route.name !== 'home'" class="header-top__item"><a href="#" @click.prevent="beginPlay">Commencer</a></li>
				<li v-if="$store.state.game !== null" v-bind:key="stop" class="header-top__item"><a @click.prevent="stopBtn" href="/stop">Arrêter</a></li>
	  		  	<span class="header-top__item-separator" v-bind:key="spearate1" ></span>
	  			<li class="header-top__item" v-bind:key="help" ><router-link to="/help">Aide</router-link></li>
	  			<li class="header-top__item" v-bind:key="android" ><router-link to="/android">Android</router-link></li>
  			</ul>
  		</transition>

  		<transition name="header-top__burger--anim" mode="out-in">
  			<button class="header-top__burger" @click="openHeader" v-if="responsive">
	  			<svg class="header-top__burger-ico">
	  				<use  width="40" height="40" xlink:href="#menu-logo"></use>
	  			</svg>
  			</button>
  			<img v-if="!responsive" src="/static/assets/diceLight.png" alt="" class="header-top__logo">
  		</transition>
  	</div>

  	<transition name="header-collapse--anim">
  		<div class="header-collapse" v-if="responsive && open">
		<div class="header-collapse__top">
			<h2 class="header-collapse__title">421</h2>
			<button class="header-collapse__close" @click="closeHeader"></button>
		</div>
		
		<div class="header-collapse__body">
			<ul class="header-collapse__menu">
				<li v-if="gameActive  && $route.name !== 'overview'" class="header-top__item"><a @click.prevent="linkPush" href="/overview">Overview</a></li>
				<li v-if="gameActive  && $route.name !== 'play'" class="header-top__item"><a @click.prevent="playBtn">Continue</a></li>
				<li v-if="gameActive" v-bind:key="2" class="header-top__item"><a @click.prevent="previousBtn">Previous</a></li>
				<li v-if="$store.state.game === null" class="header-top__item"><a @click.prevent="linkPush" href="/">Commencer</a></li>
				<li v-if="$store.state.game !== null" class="header-top__item"><a @click.prevent="stopBtn" href="/stop">Arrêter</a></li>
				<span class="header-collapse__item-separator"></span>
				<li class="header-top__item"><a @click.prevent="linkPush" href="/help">Aide</a></li>
		  		<!-- <li class="header-top__item"><router-link to="home">Réglages</router-link></li> -->
		  		<li class="header-top__item"><a @click.prevent="linkPush" href="/android">Android</a></li>
			</ul>
		</div>
	</div>
	</transition>
  </div>	
</template>

<script>
export default {
	data: function() {
		return {
			width: window.innerWidth,
			open: false
		}
	},

	computed: {
		gameActive : {
			get: function() {
				return this.$store.state.game !== null ? true : false
			}
		},
		responsive: {
			get: function() {
				return this.width < 600
			}
		}

	},

	created: function () {
		window.addEventListener('resize', () => {
			this.width = window.innerWidth 
		})
	},

	methods: {
		openHeader: function() {
			this.open = true
		},

		closeHeader: function() {
			console.log("ojojo")
			this.open = false
		},

		playBtn: function() {
			this.closeHeader();
			var game = this.$store.state.game;
			if (game) {
				this.$router.push(game.routePlay);
			}
		},
		stopBtn: function() {
			this.closeHeader();
			var game = this.$store.state.game;
			this.$store.state.game = null
			this.$emit("update-store");
			this.$router.push("/");
		},
		previousBtn: function(){
			this.closeHeader();
			if(this.$store.state.game) {
				this.$store.state.game.previous();
				this.$emit("update-store");
			}
		},
		beginPlay: function(){
			this.closeHeader();
			this.$store.state.game = null;
			this.$emit("update-store");
			this.$router.push("/");
		},
		linkPush: function(e){
			this.closeHeader();
			this.$router.push(e.target.getAttribute("href"))
		}
	}
}	
</script>

<style lang="sass">

@import "./../styles/variables"

.header-top
	height: 60px
	background-color: $color-1
	color: white
	padding: 0px 20px
	box-sizing: border-box
	box-shadow: $shadow
	position: fixed
	top: 0
	left: 0
	width: 100%

	&__logo 
		width: 40px
		height: 40px
		margin-top: 5px
		transition: all .3s

	&__burger
		border: 0
		width: 40px
		height: 40px
		padding: 0
		margin-top: 5px
		transition: all .3s
		transform: translateX(0)
		position: fixed
		top: 5px
		background-color: transparent
		&-ico 
			fill: $color-4

		&--anim
			z-index: 2
			&-enter, &-leave-to
				transform: translateX(-100px)


	&__menu 
		display: flex
		float: right
		transition: all .5s
	
	&__item 
		padding: 0 $pad-small/2
		height: 60px
		display: flex
		justify-content: center
		flex-direction: column
		transition: all .3s
		&:hover
			background-color: $color-2 

		&--anim
			&-enter, &-leave-to
				transform: translateY(-100px)
				opacity: 0

		&-separator 
			width: 1px
			height: 50px
			margin: 0px $pad-small
			background-color: $color-2
			display: block

		a 
			color: $color-3
			font-weight: 200
			padding: $pad-medium 5px
			letter-spacing: 1px
			text-transform: uppercase
			font-size: $font-small
			cursor: pointer

.header__item-separator
	display: block
	background-color: $color-2


.header-collapse 
	position: fixed
	width: $wrapper-small
	background-color: $color-2
	height: 100vh
	top: 0
	left: 0
	transition: all .4s
	z-index: 2

	&--anim
		&-enter, &-leave-to
			transform: translateX(-#{$wrapper-small})

	&__top 
		height: 60px
		text-align: center
		display: flex
		flex-direction: column
		justify-content: center
		background-color: $color-4
		position: relative

	&__title 
		font-size: 2em
		color: #495664
		font-weight: bold

	&__item-separator 
		width: 100%
		height: 1px
		margin: $pad-small 0
		background-color: $color-1
		display: block

	&__close 
		position: absolute
		top: 50%
		right: 0
		transform: translateY(-50%)
		height: 50px
		width: 50px
		background-color: transparent
		border: 0
		background-image: url("/static/assets/cross.svg")
		background-size: 40%
		background-position: center
		background-repeat: no-repeat



</style>
