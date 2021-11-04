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
        },
        push(state, payload){
            state.data = payload
        }
    },
    actions: {
        async fetchBill({ commit }) {
            let payload = await BillService.getBill();
            commit("fetch", payload)
            return payload.data
        },
        async createBill({ commit }, bill){
            let payload = await BillService.createBill(bill);
            commit("push", payload.data)
        },
        async updateBill({ commit }, id){
            let payload = await BillService.updateBill(id);
            commit("push", payload.data)
        },
    }
})