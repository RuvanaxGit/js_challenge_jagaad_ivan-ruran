import Vue from 'vue'
import Vuex from 'vuex'
import { getAvailableActivities } from '@/services'
import { ACTIVITIES_LIMIT } from '@/helpers/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    availableActivities: [],
    activitiesCount: 0,
    wishList: [],
    bagList: [],
    isLoading: false
  },
  getters: {
    wishListCount: state => state.wishList.length,
    bagListCount: state => state.bagList.length,
    totalBagPrice: state => {
      return state.bagList.map(item => item.original_retail_price.value).reduce((accumulator, element) => {
        return accumulator + element
      }, 0)
    }
  },
  mutations: {
    SET_AVAILABLE_ACTIVITIES (state, payload) {
      state.availableActivities = payload && payload.data ? payload.data : []
      state.activitiesCount = payload.meta && payload.meta.count ? payload.meta.count : 0
    },
    UPDATE_WISHLIST (state, payload) {
      const index = state.wishList.findIndex(item => item.uuid === payload.uuid)
      if (index !== -1) {
        state.wishList.splice(index, 1)
      } else {
        state.wishList = [...state.wishList, payload]
      }
    },
    UPDATE_BAG_LIST (state, payload) {
      const index = state.bagList.findIndex(item => item.uuid === payload.uuid)
      if (index !== -1) {
        state.bagList.splice(index, 1)
      } else {
        state.bagList = [...state.bagList, payload]
      }
    },
    SET_LOADING_STATUS (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    handleGetAvailableActivities ({ commit }, payload) {
      commit('SET_LOADING_STATUS', true)
      return new Promise((resolve, reject) => {
        getAvailableActivities({ limit: ACTIVITIES_LIMIT, offset: payload || 0 }).then(response => {
          commit('SET_AVAILABLE_ACTIVITIES', response.data)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
        }).finally(() => {
          commit('SET_LOADING_STATUS', false)
        })
      })
    }
  }
})
