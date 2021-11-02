import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '@/services/UserService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        users: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload.data;
        },
        push(state, payload){
            state.data = payload
        }
    },
    actions: {
        async fetchUser({ commit }) {
            let payload = await UserService.getUser();
            commit("fetch", payload)
            return payload.data
        },
        async createUser({ commit }, newUser){
            let payload = await UserService.createUser(newUser);
            commit("push", payload.data)
        },
    }
})