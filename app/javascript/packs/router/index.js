import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Signup = () => import('../components/auth/Signup.vue')
const Login = () => import('../components/auth/Login.vue')
const ChangePassword = () => import('../components/auth/ChangePassword.vue')
const ChangePasswordFromEmail = () => import('../components/auth/ChangePasswordFromEmail.vue')
const RecoverPassword = () => import('../components/auth/RecoverPassword.vue')
const ChangeProfile = () => import('../components/auth/ChangeProfile.vue')
const Home = () => import('../components/Home.vue')

export default new Router({
    mode: 'history',
    hashbang: false,
    routes: [
      { path: '/sign_up', component: Signup, name: 'sign_up' },
      { path: '/login', component: Login, name: 'login' },
      { path: '/change_password', component: ChangePassword, name: 'ChangePassword' },
      { path: '/recovery_from_email', component: ChangePasswordFromEmail, name: 'ChangePasswordFromEmail' },
      { path: '/recovery_password', component: RecoverPassword, name: 'RecoverPassword' },
      { path: '/edit_profile', component: ChangeProfile, name: 'ChangeProfile' },
      { path: '/', component: Home },
      { path:'*', redirect: '/'}
    ]
  })
