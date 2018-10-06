const getters = {
    nickName: (state) => {
        return state.nickname;
    },
    userEmail: (state) => {
        return state.email;
    },
    userAuthenticated: (state) =>{
        return state.authenticated;
    }
}


export default getters
