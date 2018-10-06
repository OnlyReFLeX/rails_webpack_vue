<template>
  <div>
    <form v-on:submit.prevent="recover">
      <input type="email" v-model="user.email" placeholder="E-mail"></input>
      <button type="submit">Сбросить пароль</button>
    </form>
  </div>
</template>


<script>
  import { auth } from './../../utils/auth.js'
  import { util } from './../../utils/util.js'
  import store from './../../store'

  export default {
    beforeCreate() {
      auth.tokenValid(this);
      if (store.getters.userAuthenticated) {
        util.redirect(this, '/')
      }
    },
    data() {
      return {
        user: {
          email: '',
          redirect_url: 'http://localhost:3000/recovery_from_email'
        },
        loading: false
      }
    },
    methods: {
      recover() {
        auth.recoverPassword(this, this.user);
      }
    }
  }
</script>
