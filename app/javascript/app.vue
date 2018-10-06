<template>
  <div id="app">
    <navigation></navigation>
    <div>{{ alert.message }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './packs/components/Navigation.vue'
  import { util } from './packs/utils/util.js'
  export default {
    components: {
      navigation: Navigation
    },
    data() {
      return {
        alert: util.alert
      }
    }
  }
</script>
