import { header_names } from './../localStorageVariables.js'
import { http, routes } from 'api'
import store from './../store'
import { util } from './util.js'

export const auth = {
  login(context, creds, redirect) {
    http.post(routes.sign_in_path, creds)
      .then(response => {
        this.setAuthHeader(response)
        this.tokenValid(context, redirect)
        if (redirect) util.redirect(context, redirect)
      })
      .catch(e => {
        util.set_alert(e.response.data.errors)
        creds.password = ''
      })
  },

  tokenValid(context) {
    http.get(routes.validate_token_path, this.authHeaders())
      .then(response => this.setUserInformation(response.data, context))
      .catch(() => this.clearUserInformation(context))
  },

  signup(context, creds, redirect) {
    http.post(routes.auth_path, creds)
      .then(response => {
        this.setAuthHeader(response)
        this.tokenValid(context, redirect)
      })
      .catch(e => {
        util.set_alert(e.response.data.errors.full_messages)
        creds.password = ''
        creds.password_confirmation = ''
      })
  },

  logout(context, redirect) {
    http.delete(routes.auth_sign_out_path, this.authHeaders())
      .then(() => {
        this.clearAuthHeader()
        this.clearUserInformation(context)
        location.replace(redirect)
      })
      .catch(() => {
        this.clearAuthHeader()
        this.clearUserInformation(context)
        if (redirect) util.redirect(context, redirect)
      })
  },

  changePassword(context, creds) {
    http.put(routes.password_path, creds, this.authHeaders())
      .then(response => {
        util.set_alert(response.data.message)
        util.redirect(context, '/')
      })
      .catch(e => {
        util.set_alert(e.response.data.errors)
        creds.password = ''
      })
  },

  recoverPassword(context, creds) {
    http.post(routes.password_path, creds)
      .then(response => {
        creds.email = ''
        util.set_alert(response.data.message)
      })
      .catch(e => util.set_alert(e.response.data.errors))
  },

  changePasswordFromEmail(context, creds, query_headers) {
    http.put(routes.password_path, creds, this.authHeaders(query_headers))
      .then(response => {
        util.redirect(context, 'login')
        util.set_alert(e.response.data.message)
      })
      .catch(e => util.set_alert(e.response.data.errors.full_messages))
  },

  changeProfile(context, creds) {
    http.put(routes.auth_path, creds, this.authHeaders())
      .then(response => {
        util.redirect(context, '/')
        util.set_alert('Данные успешно обновлены')
      })
      .catch(e => util.set_alert(e.response.data.errors.full_messages))
  },

  getAuthHeader() {
    var header = {
      uid: localStorage.getItem(header_names.uid),
      client: localStorage.getItem(header_names.client),
      access_token: localStorage.getItem(header_names.access_token),
      token_type: localStorage.getItem(header_names.token_type),
      expiry: localStorage.getItem(header_names.expiry)
    }
    return header
  },

  setAuthHeader(data) {
    localStorage.setItem(header_names.access_token, data.headers['access-token'])
    localStorage.setItem(header_names.token_type, data.headers['token-type'])
    localStorage.setItem(header_names.client, data.headers.client)
    localStorage.setItem(header_names.expiry, data.headers.expiry)
    localStorage.setItem(header_names.uid, data.headers.uid)
  },

  setUserInformation(json, context) { store.dispatch('SIGN_IN_USER', json) },

  clearAuthHeader() {
    localStorage.removeItem(header_names.access_token)
    localStorage.removeItem(header_names.token_type)
    localStorage.removeItem(header_names.client)
    localStorage.removeItem(header_names.expiry)
    localStorage.removeItem(header_names.uid)
  },

  clearUserInformation(context) { store.dispatch('LOG_OUT_USER') },

  authHeaders(headers = this.getAuthHeader()) {
    let auth_headers = {
      headers: {
        uid: headers.uid,
        client: headers.client,
        'access-token': headers.access_token
      }
    }
    return auth_headers
  },
}
