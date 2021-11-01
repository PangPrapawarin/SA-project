import Vue from 'vue'
import Vuex from 'vuex'
import ProductService from '@/services/ProductService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        products: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload.data;
        }
    },
    actions: {
        async fetchProduct({ commit }) {
            let payload = await ProductService.getProduct();
            commit("fetch", payload)
            return payload.data
        },
    }
})