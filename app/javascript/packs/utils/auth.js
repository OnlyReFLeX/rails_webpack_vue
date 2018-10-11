import { header_names } from './../localStorageVariables.js'
import { http, routes } from 'api'
import store from './../store'
import { util } from './util.js'

export const auth = {
    login(context, creds, redirect) {
        http.post(routes.sign_in_path, creds)
            .then(response => {
                this.setAuthHeader(response);
                this.tokenValid(context, redirect);
                if (redirect) {
                    util.redirect(context, redirect);
                }
            })
            .catch(e => {
                util.set_alert(e.response.data.errors);
                creds.password = '';
            });
    },


    tokenValid(context) {
        var header = this.getAuthHeader();
        http.get(routes.validate_token_path, {
                headers: {
                    uid: header.uid,
                    client: header.client,
                    'access-token': header.access_token,
                }
            })
            .then(response => {
                this.setUserInformation(response.data, context);
            })
            .catch(e => {
                this.clearUserInformation(context);
            })
    },

    signup(context, creds, redirect) {
        http.post(routes.auth_path, creds)
            .then(response => {
                this.setAuthHeader(response);
                this.tokenValid(context, redirect);
            })
            .catch(e => {
                util.set_alert(e.response.data.errors.full_messages);
                creds.password = '';
                creds.password_confirmation = '';
            });
    },

    logout(context, redirect) {
        var header = this.getAuthHeader();
        http.delete(routes.auth_sign_out_path, {
                headers: {
                    uid: header.uid,
                    client: header.client,
                    'access-token': header.access_token
                }
            })
            .then(response => {
                this.clearAuthHeader();
                this.clearUserInformation(context);
                location.replace(redirect);
            })
            .catch(e => {
                this.clearAuthHeader();
                this.clearUserInformation(context);
                if (redirect) {
                    util.redirect(context, redirect);
                }
            });
    },

    changePassword(context, creds) {
        var header = this.getAuthHeader();
        http.put(routes.password_path, creds, {
                headers: {
                    uid: header.uid,
                    client: header.client,
                    'access-token': header.access_token
                }
            })
            .then(response => {
                util.set_alert(response.data.message);
                util.redirect(context, '/');
            })
            .catch(e => {
                util.set_alert(e.response.data.errors);
                creds.password = '';
            });
    },

    recoverPassword(context, creds) {
        http.post(routes.password_path, creds)
            .then(response => {
                creds.email = '';
                util.set_alert(response.data.message);
            })
            .catch(e => {
                util.set_alert(e.response.data.errors);
            });
    },

    changePasswordFromEmail(context, creds, query_headers) {
        http.put(routes.password_path, creds, {
                headers: {
                    uid: query_headers.uid,
                    client: query_headers.client,
                    'access-token': query_headers.access_token
                }
            })
            .then(response => {
                util.redirect(context, 'login');
                util.set_alert(e.response.data.message);
            })
            .catch(e => {
                util.set_alert(e.response.data.errors.full_messages);
            });
    },

    changeProfile(context, creds) {
        var header = this.getAuthHeader();
        http.put(routes.auth_path, creds, {
                headers: {
                    uid: header.uid,
                    client: header.client,
                    'access-token': header.access_token
                }
            })
            .then(response => {
                util.redirect(context, '/');
                util.set_alert("Данные успешно обновлены");
            })
            .catch(e => {
                util.set_alert(e.response.data.errors.full_messages);
            });
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
        localStorage.setItem(header_names.access_token, data.headers['access-token']);
        localStorage.setItem(header_names.token_type, data.headers["token-type"]);
        localStorage.setItem(header_names.client, data.headers["client"]);
        localStorage.setItem(header_names.expiry, data.headers["expiry"]);
        localStorage.setItem(header_names.uid, data.headers["uid"]);
    },

    setUserInformation(json, context) {
        store.dispatch('SIGN_IN_USER', json);
    },

    clearAuthHeader() {
        localStorage.removeItem(header_names.access_token);
        localStorage.removeItem(header_names.token_type);
        localStorage.removeItem(header_names.client);
        localStorage.removeItem(header_names.expiry);
        localStorage.removeItem(header_names.uid);
    },

    clearUserInformation(context) {
        store.dispatch('LOG_OUT_USER');
    }
}
