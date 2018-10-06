import Vue from 'vue';
import Vuex from 'vuex';


//Import modules
import users from './users'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users
    }
})


export default store
