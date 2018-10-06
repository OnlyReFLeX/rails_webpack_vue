export const util = {
    redirect(context, redirect) {
        context.$router.push({ path: redirect });
    },
    alert: {
        message: ''
    },
    set_alert(alert) {
        if (Array.isArray(alert)) {
            this.alert.message = alert.join("\n");
        } else {
             this.alert.message =alert;
        }
        setTimeout(function(){
          util.clear_alert()
        }, 3000);
    },
    clear_alert() {
        this.alert.message = ''
    }
}
