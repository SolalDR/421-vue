<template>
  <div class="android">
    <img src="/static/assets/android.svg" class="android__logo" alt="Logo Android">
    <h1 class="android__title title">421</h1>

    <p>
      <a id="download" class="android__btn btn btn--light" href="/static/newDownload.php">Télécharger</a>
    </p>
  </div>
</template>

<script>
export default {}
</script>


<style lang="sass">

@import "./../../styles/variables"

.android 
	position: fixed
	top: 50%
	left: 50%
	transform: translateX(-50%) translateY(-50%)
	padding: $pad-medium
	background-color: $color-1
	box-shadow: $shadow
	width: $wrapper-small
	text-align: center
	&__logo
		width: 50px
		display: block
		margin: auto

	&__title.title
		color: $color-4

	&__btn

	
</style>
