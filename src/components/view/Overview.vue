<template>
  <div class="overview">
    <h1 class="title no-marge-bottom">Scores</h1>
	<h2 class="sub-title">BC {{ game.effectiveSquall }}</h2>
	<div class="overview__list" v-if="count">
		<div v-for="player in game.players" class="overview__column">
			<div class="overview__column-head">
				<p class="overview__column-title">{{ player.name }}</p>
				<p class="overview__column-subtitle">AB {{ player.effectiveSquall }}</p>
			</div>
			<ul>
				<li class="overview__item" v-for="score in player.scores">{{ score.combin.name }} - {{ score.total }}</li>
			</ul>
		</div>
	</div>
	<p v-if="!count" class="overview__no-score">Il n'y a pas de score pour le moment...</p>
	<div class="actions">
		<a class="actions__btn" @click.prevent="displayScore">Voir les résultats</a>
	</div>
	<popin :data="scores" :config="popinConfig" :display="popinDisplay" :type="score" @close="hideScore"></popin>
  </div>
</template>

<script>

import Popin from "../Popin"

export default {

	created: function () {
		if (!this.$store.state.game) {
			this.$router.push("/");
		}
	},

	data: function() {
		return {
			game: this.$store.state.game,
			popinDisplay: false,
			popinConfig: {
				type: "score"
			}
		}
	},

	computed: {
		scores: {
			get: function(){
				var scores = [];
				for(var i=0; i < this.game.players.length; i++){
					scores.push({
						name: this.game.players[i].name,
						score: this.game.players[i].total
					});
				}
				return scores
			}
		},
		count: {
			get: function(){
				return this.$store.state.game.chronoScore.length
			}		
		}
	},

	components: {
		Popin
	},

	methods: {
		displayScore: function(){
			this.popinDisplay = true;
		},
		hideScore: function(){
			this.popinDisplay = false;
		}
	}
}
</script>

<style lang="sass" scoped>

@import "./../../styles/variables"

.overview 
	&__list 
		display: flex
		justify-content: center
	
	&__column
		flex: 1
		max-width: $wrapper-small
		&-head 
			background-color: $color-2
			color: white
			padding: $pad-small
			text-align: center
			margin: 5px
		&-title 
			font-size: $font-normal
			font-weight: 200
			letter-spacing: 2px
			margin-bottom: 10px
		&-subtitle 
			font-weight: lighter

	&__item 
		background-color: $color-1
		color: white
		padding: $pad-small
		text-align: center
		margin: 5px
		font-weight: 200

	&__no-score 
		text-align: center
		font-size: $font-medium
		padding: $pad-medium $pad-small
		border-top: 1px solid $color-1
		max-width: $wrapper-normal
		margin: auto

</style>
