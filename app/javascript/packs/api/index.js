// all routes ONLY this
import axios from 'axios'

let token = document.head.querySelector('meta[name="csrf-token"]')
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content

const http = axios.create({
  baseURL: '/',
  headers: {
    'Accept': 'application/json'
  }
})

const routes = {
  auth_path: 'auth',
  sign_in_path: 'auth/sign_in',
  validate_token_path: 'auth/validate_token',
  sign_out_path: 'auth/sign_out',
  password_path: 'auth/password',
  password_edit_from_email_path: 'auth/password/edit',
  auth_sign_out_path: 'auth/sign_out'
}

export {
  http,
  routes
}
