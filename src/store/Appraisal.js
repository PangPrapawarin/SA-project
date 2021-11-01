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
        }
    },
    actions: {
        async fetchApprisal({ commit }) {
            let payload = await AppraisalService.getAppraisal();
            commit("fetch", payload)
        },
    }
})