export const util = {
  redirect(context, redirect) { context.$router.push({ path: redirect }) },

  alert: { message: '' },

  set_alert(alert) {
    this.alert.message = (Array.isArray(alert) ? alert.join("\n") : alert)
    setTimeout(() => this.clear_alert(), 3000)
  },

  clear_alert() { this.alert.message = '' }
}
