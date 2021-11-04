import Vue from 'vue'
import Vuex from 'vuex'
import InvoiceService from '@/services/InvoiceService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        invoices: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload.data;
        }
    },
    actions: {
        async fetchInvoice({ commit }) {
            let payload = await InvoiceService.getInvoice();
            commit("fetch", payload)
            return payload.data
        },
    }
})