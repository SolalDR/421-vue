<template>
	<div class="layout-popin" v-if='display'>
		<transition name="popin-anim">	
			<div class="popin">
				<button class="popin__close" @click="close"></button>
				<!-- <h1 class="popin__title">{{ data.title }}</h1> -->
				<div class="popin__content">
					<score :scores="data" v-if="config.type === 'score'"></score>
					<div class="popin__list" v-if="config.type === 'select'">
						<button class="popin__list-item" @click="callback" v-for="dat in data" :data-value="dat">{{dat}}</button>
					</div>
					<p v-if="config.type=='alert'">{{ data }}</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Score from "./Score"

	export default {

		props: ["data", "display", "config"],

		components: {
			Score
		},

		methods: {
			// Emit event to close popin
			close: function(){
				this.$emit("close")
			},

			// Callback manage 
			callback: function(e){
				// If is a select
				if (this.config.type == "select") {
					this.$emit("selectValue", e.target.getAttribute("data-value"));
				}
			}
		}
	}
</script>

<style lang="sass">

@import "./../styles/variables"

.layout-popin
	position: fixed
	top: 0
	left: 0
	height: 100vh
	width: 100vw
	background-color: rgba(0,0,0,.6)
	z-index: 3
	transition: all .3s ease

.popin 
	position: fixed
	top: 50%
	left: 50%
	transform: translateX(-50%) translateY(-50%)
	background-color: #333c4a
	padding: $pad-small 0
	color: $color-4
	max-width: 500px
	max-height: 500px
	width: 100%
	transition: all .4s
	
	&-anim 
		&-enter, &-leave-to
			transform: scale(.6) translateX(-50%) translateY(-50%)
			opacity: 0

	&__title
		font-weight: bold
		text-align: center
		font-size: $font-medium
	&__close
		width: $pad-medium
		height: $pad-medium
		top: $pad-small
		right: $pad-small
		position: absolute
		background-image: url("/static/assets/cross-light.svg")
		background-repeat: no-repeat
		background-position: center
		background-size: 20px
		border: 0
		background-color: transparent
		transition: all .3s
		&:hover 
			transform: scale(1.1)

	&__content 
		padding: $pad-small
	
	&__list
		perspective: 600px

		&-item 
			background-color: $color-2
			display: block
			width: 100%
			margin: 10px auto
			padding: 10px
			font-size: 30px
			font-weight: bold
			color: white
			border: 0
			border-radius: 5px
			max-width: $wrapper-small
			cursor: pointer
			transition: all .3s
			&:hover 
				transform: rotateX(15deg)
				background-color: $color-2-light

</style>