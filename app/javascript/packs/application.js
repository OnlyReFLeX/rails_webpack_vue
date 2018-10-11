import Vue from 'vue'

// HTTP gateway
import axios from 'axios'

import App from '../app.vue'
import router from './router'

Vue.router = router

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    render: h => h(App),
    router
  })
})
