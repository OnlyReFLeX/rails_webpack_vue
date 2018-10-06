<template>
  <div>
    <form @submit.prevent="register">
      <input name="nickname" v-model="user.nickname" placeholder="Nickname">
      <input name="email" v-model="user.email" placeholder="E-mail">
      <input name="password" type="password" v-model="user.password" placeholder="Пароль" autocomplete="off">
      <input name="password_confirmation" type="password" v-model="user.password_confirmation" placeholder="Потверждение пароля" autocomplete="off">
      <button>Зарегистрироваться</button>
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
    data(){
      return{
        user: {}
      }
    },
    methods: {
      register() {
        auth.signup(this, this.user, '/');
      }
    },

  }
</script>
