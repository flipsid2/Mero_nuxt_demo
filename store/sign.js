import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
var qs = require('querystring');


export default {
  // 현재 파일을 Store 모듈로 활용하려면 다음 옵션이 필요합니다.
  namespaced: true,

  // Vue.js data 옵션과 유사합니다.
  // 상태(State)는 함수로 만들어서 객체 데이터를 반환해야 가변 이슈(데이터 불변성)가 발생하지 않습니다!
  state: () => ({
    // loading: false,
    token: '',
    user: '',
    password: '',
  }),

  // Vue.js computed 옵션과 유사합니다.
  getters: {},

  // Vue.js methods 옵션과 유사합니다.
  // 상태(State)는 변이(Mutations)를 통해서만 값을 바꿀 수 있습니다.
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    signin(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetLogin(state) {
      state.user = ''
      state.password = ''
      state.token = ''
    }
  },

  // Vue.js methods 옵션과 유사합니다.
  // 변이(Mutations)가 아닌 나머지 모든 로직을 관리합니다.
  // 비동기로 동작합니다.
  actions: {
    async getItem({ state, commit }, payload) {
      const { id, pwd } = payload;
      console.log(`fetchlogin userId : ${id} userPassword : ${pwd}`)
      try {
        const resp = await _fetchloign(payload)
        console.log('_fetchloign: ' + resp)
        commit('updateState', {
          token : resp.data,
          password : pwd,
          user : id
        })
      } catch (error) {
        console.log("_fetchloign error...", error)
        // commit('updateState', {
        //   res_err: error
        // })
      } finally {
        console.log("_fetchloign finally...")
      }
    },
  }
} 

async function _fetchlogin(payload) {
  const url = process.client
    ? '/api/maero/login/R'
    : `${process.env.CLIENT_URL}/api/maero/login/R`
  return await axios.post(url, payload)
}