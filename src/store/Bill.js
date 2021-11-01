import Vue from 'vue'
import Vuex from 'vuex'
import BillService from '@/services/BillService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        bills: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload.data;
        }
    },
    actions: {
        async fetchBill({ commit }) {
            let payload = await BillService.getBill();
            commit("fetch", payload)
        },
    }
})