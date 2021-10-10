import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    header: [],
    orders: [],
  }),
  getters: {
    header      (state) { return state.header },
    orders      (state) { return state.orders },
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateOrder(state, payload) {
      const {row, item } = payload
      state.orders[row] = item
      
      state.orders.push(item)
      state.orders.pop(item)
    },
    addOrder(state, payload) {
      const { item } = payload
      state.orders.push(item)
    },
    deleteOrder(state, payload) {
      const { item } = payload
      state.orders.pop(item)
    },
  },
  actions: {
    async getOrders({ state, commit }, payload) {
      try {
        const res = await _fetchOrders({
          ...payload
        })
        // console.log('result : ', res.data)
        const { Header, Search } = res.data

        commit('updateState', {
          orders: _uniqBy(Search, 'order_id'),
          header: Header
        })

      } catch ({ message }) {
        commit('updateState', {
          orders: []
        })
      } 
    },
    async setUpdateOrder({ state, commit }, payload) {
      const {row, item } = payload

      try {
        const res = await _fetchUpdateOrder({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setUpdateOrder success :' + res.data)
          commit('updateOrder', {
            row: row,
            item: item
          })
        }
        else {
          console.log('setUpdateOrder error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setUpdateOrder catch error' + message)
      }
    },
    async setAddOrder({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _fetchAddOrder({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setAddOrder success :' + res.data)
          commit('addOrder', {
            item: item
          })
        }
        else {
          console.log('setAddOrder error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setAddOrder catch error' + message)
      }
    },
    async setDelOrder({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _fetchDelOrder({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setDelOrder success :' + res.data)
          commit('deleteOrder', {
            item: item
          })
        }
        else {
          console.log('setDelOrder error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setDelOrder catch error' + message)
      }
    },
  }
}

// eslint-disable-next-line
async function _fetchOrders(payload) {
  const url = process.client
    ? '/api/maero/orders/R'
    : `${process.env.CLIENT_URL}/api/maero/orders/R`
  return await axios.post(url, payload)
}

async function _fetchUpdateOrder(payload) {
  const url = process.client
    ? '/api/maero/orders/U'
    : `${process.env.CLIENT_URL}/api/maero/orders/U`
  return await axios.post(url, payload)
}

async function _fetchAddOrder(payload) {
  const url = process.client
    ? '/api/maero/orders/U'
    : `${process.env.CLIENT_URL}/api/maero/orders/U`
  return await axios.post(url, payload)
}

async function _fetchDelOrder(payload) {
  const url = process.client
    ? '/api/maero/orders/D'
    : `${process.env.CLIENT_URL}/api/maero/orders/D`
  return await axios.post(url, payload)
}