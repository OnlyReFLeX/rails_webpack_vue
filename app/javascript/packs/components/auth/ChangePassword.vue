<template>
	<div>
		<form v-on:submit.prevent="change">
			<input type="password" v-model="user.password" placeholder="Пароль"></input>
			<input type="password" v-model="user.password_confirmation" placeholder="Подтверждение пароля"></input>
			<button type="submit" >Сменить пароль</button>
		</form>
	</div>
</template>

<script type="text/javascript">
  import { auth } from './../../utils/auth.js'
  import { util } from './../../utils/util.js'
  import store from './../../store'

  export default {
    beforeCreate() {
      auth.tokenValid(this);
      if (!store.getters.userAuthenticated) {
        util.redirect(this, '/')
      }
    },
		data() {
			return {
				user: {
					password: '',
					password_confirmation: ''
				}
			}
		},
		methods: {
			change() {
				auth.changePassword(this,this.user,this.$parent)
			}
		}
	}
</script>
