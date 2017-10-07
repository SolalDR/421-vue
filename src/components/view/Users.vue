<template>
  <div class="users">
    <h1 class="title">Qui veux jouer ?</h1>
	<div class="users__container">
		<ul>
			<li class="users__item">
				<input class="users__input" type="text" v-model="users[0]" placeholder="Ajoute un joueur">
			</li>
			<transition-group name="list" tag="li">
				<li v-for="(userForm, i) in nbInput" v-bind:key="i" class="users__item">
					<input class="users__input" type="text" v-model="users[userForm]" placeholder="Ajoute un joueur">
				</li>
			</transition-group>
		</ul>
		<button class="btn btn--dark users__btn-start" @click="saveUsers">Commencez la partie</button>
	</div>
  </div>
</template>

<script>
export default {

	data: function() {
		return {
			users: []
		}
	},

	computed: {
		// @integer numbers of users
		nbInput: {
			get: function () {
				return this.users.length 
 			}
		},

		// @boolean return true if the users list is valid
		usersValid: {
			get: function() {
				var test = true;
				for(var i = 0; i<this.users.length; i++) {
					if( !this.testUser(this.users[i])) {
						test = false
					}
				}
				if(this.users.length < 2) {
					test = false
				}
				return test;
			}
		}
	},

	watch: {
		users: function(users) {
			for (var i=0; i < this.users.length; i++) {
				if (!this.testUser(this.users[i])) {
					this.users.splice(i, 1)
				}
			}
		}
	},

	methods: {

		testUser: function(username) {
			if (username && username !== '') {
				return true;
			} 
			return false;
		},

		saveUsers: function() {
			if (this.usersValid) {
				this.$emit('save-users', this.users);
			}
		}
	}
}
</script>

<style lang="sass" scoped>

@import "./../../styles/variables"

.users__container 
	text-align: center


.users 
	perspective: 600px
	&__item 
		text-align: center
	&__input 
		border: 0
		background-color: transparent
		text-align: center
		padding: 5px
		border-bottom: 2px solid black
		width: 200px
		height: 40px
		font-size: $font-medium
		text-align: center
		margin-bottom: $pad-small
		transition: all 1s
		overflow: hidden
	&__btn-start 
		font-size: $font-small
		margin-top: $pad-medium
		padding: $pad-small
		color: $color-3
	

.list
	&-enter, &-leave-to
		opacity: 0
		max-height: 0
		transform: translateY(30px) scale(.9)
	&-enter-to, &-leave 
		max-height: 100px
		transform: translateY(0px) scale(1)
	&-enter-active, &-leave-active
		transition: all .3s ease-out
		

</style>
