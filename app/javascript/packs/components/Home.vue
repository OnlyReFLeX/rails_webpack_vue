<template>
  <div>
    <p>Главная страница</p>
  </div>
</template>

<script>
  import { auth } from './../utils/auth.js'

  export default {
    beforeCreate() {
      auth.tokenValid(this);
    },
  }
</script>
