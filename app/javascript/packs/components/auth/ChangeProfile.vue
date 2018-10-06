<template>
  <div>
    <form @submit.prevent="change">
      <input name="nickname" v-model="user.nickname" placeholder="Nickname">
      <input name="email" v-model="user.email" placeholder="E-mail">
      <button type="submit">Изменить</button>
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
      if (!store.getters.userAuthenticated) {
        util.redirect(this, '/')
      }
    },
    data(){
      return {
        user: {
          nickname: store.getters.nickName,
          email: store.getters.userEmail
        }
      }
    },
    methods: {
      change() {
        auth.changeProfile(this, this.user, '/');
      }
    },
  }
</script>
