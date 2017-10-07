<template>
  <div class="help">
    <h1 class="title">Aide</h1>
    <div class="combinaisons">
    	<a @click.prevent="selectCombin" @mouseover="selectCombin" class="combinaisons__item" href="#" v-for="(combin, value) in $store.state.combinaisons" :data-key="value">{{ value }}</a>
    </div>
    <div class="render">
    	<dice :value="combin[0]"></dice>
    	<dice :value="combin[1]"></dice>
    	<dice :value="combin[2]"></dice>
    </div>
  </div>
</template>

<script>
import Score from '../../model/Score'
import Dice from '../Dice'

export default {

	data: function(){
		return {
			combin: [null, null, null]
		}
	},

	methods: {
		// On select combin change dice value
		selectCombin: function(e){
			var combin = this.$store.state.combinaisons[e.target.getAttribute("data-key")];
			this.combin = [combin.dices[0]-1, combin.dices[1]-1, combin.dices[2]-1]
		}
	},

	components: {
		Dice
	}
}
</script>

<style lang="sass" scoped>

@import "./../../styles/variables"

.help
	.title 
		margin-bottom: $pad-big

.combinaisons 
	display: flex
	flex-wrap: wrap
	justify-content: center
	max-width: $wrapper-normal
	margin: auto
	padding-bottom: $pad-big

	&__item 
		padding: $pad-small
		background-color: $color-2
		margin: 5px
		text-align: center
		color: $color-4
		text-transform: uppercase
		letter-spacing: 1px
		border-radius: $radius


</style>
