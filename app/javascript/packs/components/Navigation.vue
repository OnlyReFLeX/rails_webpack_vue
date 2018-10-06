<template>
  <div>
    <router-link to="/">Главная</router-link>
    <div v-if="userAuthenticated">
       <p>{{ nickName }}</p>
       <router-link v-bind:to="{ name: 'ChangePassword' }">Изменить пароль</router-link>
       <router-link v-bind:to="{ name: 'ChangeProfile' }">Изменить профиль</router-link>
       <a @click="logout">Выйти</a>
    </div>

    <div v-else>
      <router-link to="login">Войти</router-link>
      <router-link to="sign_up">Регистрация</router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { auth } from './../utils/auth.js'
  import store from './../store'

  export default {
    methods: {
      logout(){
        auth.logout(this,'/login');
      }
    },
    computed: {
      nickName(){
        return store.getters.nickName;
      },
      userAuthenticated(){
        return store.getters.userAuthenticated;
      }
    }
  }
</script>
