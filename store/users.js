import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    header: [],
    users: [],
  }),
  getters: {
    header      (state) { return state.header },
    users       (state) { return state.users },
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateUser(state, payload) {
      const {row, item } = payload
      state.users[row] = item
      
      state.users.push(item)
      state.users.pop(item)
    },
    addUser(state, payload) {
      const { item } = payload
      state.users.push(item)
    },
    deleteUser(state, payload) {
      const { item } = payload
      state.users.pop(item)
    },
  },
  actions: {
    async getAllUser({ state, commit }, payload) {
      try {
        const res = await _fetchAllUser({
          ...payload
        })
        console.log('result : ', res.data)
        const { Header, Search } = res.data

        commit('updateState', {
          users: _uniqBy(Search, 'User'),
          header: Header
        })

      } catch ({ message }) {
        commit('updateState', {
          users: []
        })
      } 
    },
    async setUpdateUser({ state, commit }, payload) {
      const {row, item } = payload

      try {
        const res = await _fetchUpdateUser({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          console.log('setUpdateUser success :' + res.data)
          commit('updateUser', {
            row: row,
            item: item
          })
        }
        else {
          console.log('setUpdateUser error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setUpdateUser catch error' + message)
      }
    },
    async setAddUser({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _fetchAddUser({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          console.log('setAddUser success :' + res.data)
          commit('addUser', {
            item: item
          })
        }
        else {
          console.log('setAddUser error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setAddUser catch error' + message)
      }
    },
    async setDelUser({ state, commit }, payload) {
      const { item } = payload
      try {
        const res = await _fetchDelUser({
          ...item
        })
        if (res.status === 200) {
          // 성공시
          console.log('setDelUser success :' + res.data)
          commit('deleteUser', {
            item: item
          })
        }
        else {
          console.log('setDelUser error' + res.data)
        }

      } catch ({ message }) {
        onsole.log('setDelUser catch error' + message)
      }
    },
  }
}

// eslint-disable-next-line
async function _fetchAllUser(payload) {
  const url = process.client
    ? '/api/maero/login/R'
    : `${process.env.CLIENT_URL}/api/maero/login/R`
  return await axios.post(url, payload)
}

async function _fetchUpdateUser(payload) {
  const url = process.client
    ? '/api/maero/login/U'
    : `${process.env.CLIENT_URL}/api/maero/login/U`
  return await axios.post(url, payload)
}

async function _fetchAddUser(payload) {
  const url = process.client
    ? '/api/maero/login/U'
    : `${process.env.CLIENT_URL}/api/maero/login/U`
  return await axios.post(url, payload)
}

async function _fetchDelUser(payload) {
  const url = process.client
    ? '/api/maero/login/D'
    : `${process.env.CLIENT_URL}/api/maero/login/D`
  return await axios.post(url, payload)
}