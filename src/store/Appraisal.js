import Vue from 'vue'
import Vuex from 'vuex'
import AppraisalService from '@/services/AppraisalService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    
    getters: {
        appraisals: (state) => state.data
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
        async fetchApprisal({ commit }) {
            let payload = await AppraisalService.getAppraisal();
            commit("fetch", payload)
            return payload.data
        },
        async updateAppraisal({commit}, {id, price, detail}){
            let payload= await AppraisalService.updateAppraisal(id, price, detail);
            commit("push", payload)
        }
    }
})