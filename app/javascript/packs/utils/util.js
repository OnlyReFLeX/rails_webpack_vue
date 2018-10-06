export const util = {
    redirect(context, redirect) {
        context.$router.push({ path: redirect });
    },
    errors: {
        message: ''
    },
    set_errors(errors) {
        if (Array.isArray(errors)) {
            this.errors.message = errors.join("\n");
        } else {
             this.errors.message =errors;
        }
        setTimeout(function(){
          util.clear_errors()
        }, 3000);
    },
    clear_errors() {
        this.errors.message = ''
    }
}
