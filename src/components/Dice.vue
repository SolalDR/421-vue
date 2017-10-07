<template>
	<div class="dice">
	  <span class="face" data-face="1"></span>
	  <span class="face" data-face="2"></span>
	  <span class="face" data-face="3"></span>
	  <span class="face" data-face="4"></span>
	  <span class="face" data-face="5"></span>
	  <span class="face" data-face="6"></span>
	</div>
</template>

<script>

import Dice from "../model/Dice"

export default {

	props: ["value"],

	data: function(){
		return {
			dice: null
		}
	},

  // When value change, engage rotation to the value
	watch: {
		value: function(val){
			if(val === null) {
				this.dice.reset()
			} else {
				this.dice.rotateTo(val)
			}
		}
	},

  // Set new dice when component is add to the DOM
	mounted: function(){
		this.dice = new Dice(this.$el)
	}
}

</script>

<style lang="sass">

@import "./../styles/variables"

//Variables 
$size : 70px

.render
  text-align: center

// Dice style
.dice 
  position: relative
  transform-style: preserve-3d
  transform-origin: #{$size/2} #{$size/2}
  transition: .5s
  transform: perspective(500px) rotateX(45deg) rotateY(45deg)
  display: inline-block
  width: 40px
  margin: 50px
  .face 
    transform-origin: 50% 50%
    transition: .5s
    border-radius: 5px
    outline: 2px solid $color-4
    width: $size
    height: $size
    color: $color-4
    display: block
    position: absolute
    background-color: $color-1
    transform-style: preserve-3d
    top: 0
    left: 0
    display: flex
    flex-direction: column
    justify-content: center
    text-align: center
    font-size: #{$size/2}
    &:hover 
    	background-color: $color-1-dark
    &[data-face="1"] 
      transform: translate3d(0, 0, -#{$size/2}) rotateY(180deg)
    &[data-face="6"] 
      transform: translate3d(0, 0, #{$size/2})
    &[data-face="2"] 
      transform: translate3d(0, -#{$size/2}, 0) rotate3d(1,0,0,90deg) 
    &[data-face="5"] 
      transform: translate3d(0, #{$size/2}, 0) rotate3d(1,0,0,-90deg)  
    &[data-face="3"] 
      transform: translate3d(-#{$size/2}, 0, 0) rotate3d(0, 1, 0, -90deg)
    &[data-face="4"] 
      transform: translate3d(#{$size/2}, 0, 0) rotate3d(0, 1, 0, 90deg)
    
 

</style>