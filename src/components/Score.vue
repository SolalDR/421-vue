<template>
	<div class="scores">
		<div class="score" v-for="(score, index) in scores">
			<span class="score__rank">{{ index+1 }}</span>
			<p class="score__title"> {{ score.name }}</p>
			<p class="score__subtitle">{{ score.score }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["scores"],
		created: function () {
			this.scores.sort(function (a, b) {
			  return b.score - a.score;
			});
		}
	}
</script>

<style lang="sass">

@import "./../styles/variables"

$size-pad: 10px
$font-pad: 5px
$nbScore: 8

.scores 
	.score 
		padding: 0
		text-align: center
		position: relative
		@for $i from 1 through $nbScore 
			&:nth-child(#{$i}) 
				padding: #{$font-pad*($nbScore - $i)} 0
				border-bottom: 1px solid grey
				font-size: #{$font-pad*($nbScore - $i)}
				.score__rank 
					height: #{$size-pad*($nbScore - $i)}
					width: #{$size-pad*($nbScore - $i)}
					font-size: #{$font-pad*($nbScore - $i)}
		
		&:last-child 
			border-bottom: 0

		&__title 

		&__rank 
			position: absolute
			left: 0
			top: 50%
			display: flex
			flex-direction: column
			justify-content: center
			color: $color-4
			background-color: $color-2
			border-radius: 100%
			transform: translateY(-50%)


		&__subtitle
			margin-top: 10px
			font-size: $font-normal


</style>