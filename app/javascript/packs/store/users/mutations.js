const mutations = {
    SIGN_IN_USER_MUTATION: (state, user) =>{
        state.nickname = user.data.nickname;
        state.email = user.data.email;
        state.authenticated = true;
    },
    LOG_OUT_USER_MUTATION: (state) => {
        state.nickname = null;
        state.email = null;
        state.authenticated = false;
    }
}


export default mutations
