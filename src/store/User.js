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
        }
    },
    actions: {
        async fetchUser({ commit }) {
            let payload = await UserService.getUser();
            commit("fetch", payload)
            return payload.data
        },
    }
})