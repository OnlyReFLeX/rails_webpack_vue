<template>
	<div>
		<form v-on:submit.prevent="change" >
			<input required type="password" placeholder="Пароль" v-model="user.password"></input>
			<input required type="password" placeholder="Подтверждение пароля" v-model="user.password_confirmation"></input>
			<button type="submit">Сбросить пароль</button>
		</form>
	</div>
</template>

<script type="text/javascript">
  import { auth } from './../../utils/auth.js'
  import { util } from './../../utils/util.js'
  import store from './../../store'

  export default {
    beforeCreate() {
      auth.tokenValid(this)
      if (store.getters.userAuthenticated) util.redirect(this, '/')
    },
		data() {
			return {
				user: {
					password: '',
					password_confirmation: ''
				},
				headers: {
					client: this.$route.query.client_id,
					reset_password: true,
					access_token: this.$route.query.token,
					uid: this.$route.query.uid
				}
			}
		},
		methods: {
			change() {
				auth.changePasswordFromEmail(this, this.user, this.headers)
				this.password = ''
				this.password_confirmation = ''
			}
		}
	}
</script>
