import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getCurrentDetailApi } from '@/apis/xbase'
export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data || {}
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      if (this.state.userInfo.userId) return
      const data = await getCurrentDetailApi()
      if (!data) return
      data.orgs = [
        {
          id: data.departmentId,
          name: data.departmentIdName,
        },
      ]
      commit('setUserInfo', data)
    },
  },
  modules: {},
})
