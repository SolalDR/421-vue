<template>
	<div class="notification" :class="'notification--'+type" v-if="visible">
		<p class="notification__content">{{ message }}</p>
		<button class="notification__close"></button>
	</div>
</template>
<script>
	export default {
		props: ['type', 'message', 'visible', 'duration'],
		created: function(){
			if (!this.duration) this.duration =  3000;
			if (!this.type) this.type = "success";

			setTimeout(()=>{
				this.close();
			}, this.duration)
		},
		methods: {
			close: function(){
				this.$emit('close');
			}
		}
	}
</script>

<style lang="sass" scoped> 

	@import "./../styles/variables"

	.notification
		&--success
		&--error


</style>