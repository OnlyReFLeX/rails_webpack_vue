<template>
  <div>
    <form @submit.prevent="login">
      <input name="email" v-model="user.email" placeholder="E-mail">
      <input name="password" type="password" v-model="user.password" placeholder="Пароль" autocomplete="off">
      <router-link v-bind:to="{ name:'RecoverPassword' }">Забыли пароль?</router-link>
      <button>Войти</button>
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
        user: {}
      }
    },
    methods: {
      login() {
        auth.login(this, this.user, '/');
      }
    }
  }
</script>
