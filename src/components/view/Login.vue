<template>
  <div class="login">
    <h1 class="login__title">421</h1>
    <p>
      <router-link to="/users" class="btn btn--light">Commencer à jouer</router-link>
      <router-link to="/hello/bourgeon" class="android-btn">Application disponible sur Android</router-link>
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>

@import "./../../styles/variables"

.login 
	position: fixed
	top: 50%
	left: 50%
	transform: translateX(-50%) translateY(-50%)
	background-color: $color-1
	color: white
	text-align: center
	padding: $pad-medium
	border-radius: $radius
	width: $wrapper-small

	&__title 
		font-size: $font-big
		margin-bottom: $pad-medium
		letter-spacing: 2px
		text-align: center
		color: $color-4

.android-btn 
	display: block
	color: $color-4
	margin-top: 20px


</style>
