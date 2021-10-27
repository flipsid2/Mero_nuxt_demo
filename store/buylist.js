import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    header: [],
    buylist: [],
    loading: false,
    buyitem: {},
  }),
  getters: {
    header      (state) { return state.header },
    buylist     (state) { return state.buylist },
    buyitem     (state) { return state.buyitem },
    loading     (state) { return state.loading },
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateBuylist(state, payload) {
      const {row, item } = payload
      // console.log("row : ", row, " item : ", item)
      state.buylist[row] = item
      
      state.buylist.push(item)
      state.buylist.pop(item)
    },
    addBuylist(state, payload) {
      const { item } = payload
      state.buylist.push(item)
    },
    deleteBuylist(state, payload) {
      const { item } = payload
      state.buylist.pop(item)
    },
  },
  actions: {
    async getBuylist({ state, commit }, payload) {
      commit('updateState', {
        buylist: [],
        loading: true
      })

      try {
        const res = await _getBuylist({
          ...payload
        })
        // console.log('result : ', res.data)
        const { Header, Search } = res.data

        commit('updateState', {
          buylist: _uniqBy(Search, 'o_order_id'),
          header: Header
        })

      } catch ({ message }) {
        commit('updateState', {
          buylist: []
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async getBuylistWithId({ state, commit }, payload) {
      commit('updateState', {
        buyitem: {},
        loading: true
      })

      // console.log('getBuylistWithId : ', payload )

      try {
        const res = await _getBuylistWithId({
          ...payload
        })
        // console.log('getBuylistWithId result(Id) : ', res.data)
        const { Header, Search } = res.data

        commit('updateState', {
          buyitem: Search[0],
          header: Header
        })

      } catch ({ message }) {
        console.log('result(Id) message : ', message)
        commit('updateState', {
          buyitem: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async setUpdateBuylist({ state, commit }, payload) {
      const {row, item } = payload

      try {
        const res = await _updateBuylist({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setUpdateBuylist success :' + res.data)
          commit('updateBuylist', {
            row: row,
            item: item
          })
        }
        else {
          console.log('setUpdateBuylist error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setUpdateBuylist catch error' + message)
      }
    },
    async setAddBuylist({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _addBuylist({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setAddBuylist success :' + res.data)
          commit('addBuylist', {
            item: item
          })
        }
        else {
          console.log('setAddBuylist error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setAddBuylist catch error' + message)
      }
    },
    async setDelBuylist({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _delBuylist({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          // console.log('setDelBuylist success :' + res.data)
          commit('deleteBuylist', {
            item: item
          })
        }
        else {
          console.log('setDelBuylist error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setDelBuylist catch error' + message)
      }
    },
  }
}

// eslint-disable-next-line
async function _getBuylist(payload) {
  const url = process.client
    ? '/api/maero/buylist/R'
    : `${process.env.CLIENT_URL}/api/maero/buylist/R`
  
  // console.log('_getBuylist       : ', payload.b_order_id, ' url : ', url)
  return await axios.post(url, payload)
}

async function _getBuylistWithId(payload) {
  const url = process.client
    ? '/api/maero/buylist/I'
    : `${process.env.CLIENT_URL}/api/maero/buylist/I`;
    // : `http://localhost:3000/api/maero/buylist/I`

  // console.log('_getBuylistWithId : ', payload.b_order_id, ' url : ', url)
  return await axios.post(url, payload)
}

async function _updateBuylist(payload) {
  const url = process.client
    ? '/api/maero/buylist/U'
    : `${process.env.CLIENT_URL}/api/maero/buylist/U`
  return await axios.post(url, payload)
}

async function _addBuylist(payload) {
  const url = process.client
    ? '/api/maero/buylist/U'
    : `${process.env.CLIENT_URL}/api/maero/buylist/U`
  return await axios.post(url, payload)
}

async function _delBuylist(payload) {
  const url = process.client
    ? '/api/maero/buylist/D'
    : `${process.env.CLIENT_URL}/api/maero/buylist/D`
  return await axios.post(url, payload)
}