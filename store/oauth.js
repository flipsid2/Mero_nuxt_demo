import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
var qs = require('querystring');


export default {
  // 현재 파일(movie.js)을 Store 모듈로 활용하려면 다음 옵션이 필요합니다.
  namespaced: true,

  // Vue.js data 옵션과 유사합니다.
  // 상태(State)는 함수로 만들어서 객체 데이터를 반환해야 가변 이슈(데이터 불변성)가 발생하지 않습니다!
  state: () => ({
    // loading: false,
    access_token: 'Default',
    returncode: '0000',
    returnstate: '0000',
    refresh_token: 'Default'
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
    resetTokens(state) {
      state.returncode = '0000'
      state.returnstate = '0000'
      state.access_token = 'Default'
      state.refresh_token = 'Default'
    }
  },

  // Vue.js methods 옵션과 유사합니다.
  // 변이(Mutations)가 아닌 나머지 모든 로직을 관리합니다.
  // 비동기로 동작합니다.
  actions: {
    // async getCode({ state, commit }, payload) {
    //   // const { title, type, number, year } = payload
    //   // if (state.loading) return

    //   // commit('updateState', {
    //   //   message: '',
    //   //   loading: true
    //   // })

    //   try {
    //     const res = await _fetchMovie({
    //       ...payload,
    //       page: 1
    //     })
    //     const { Search, totalResults } = res.data
    //     commit('updateState', {
    //       movies: _uniqBy(Search, 'imdbID')
    //     })

    //     // ceil = 올림!
    //     const total = parseInt(totalResults, 10)
    //     const pageLength = Math.ceil(total / 10) // 총 페이지의 길이

    //     // 추가 요청!
    //     if (pageLength > 1) {
    //       for (let page = 2; page <= pageLength; page += 1) {
    //         if (page > (payload.number / 10)) break
    //         const res = await _fetchMovie({
    //           ...payload,
    //           page
    //         })
    //         const { Search } = res.data
    //         commit('updateState', {
    //           movies: [
    //             ...state.movies,
    //             ..._uniqBy(Search, 'imdbID')
    //           ]
    //         })
    //       }
    //     }
    //   } catch ({ message }) {
    //     commit('updateState', {
    //       movies: [],
    //       message
    //     })
    //   } finally {
    //     commit('updateState', {
    //       loading: false
    //     })
    //   }
    // },
    // async searchMovieWithId({ state, commit }, payload) {
    //   // const { id } = payload
    //   if (state.loading) return

    //   commit('updateState', {
    //     theMovie: {},
    //     loading: true,
    //   })

    //   try {
    //     const res = await _fetchMovie(payload)
    //     commit('updateState', {
    //       theMovie: res.data
    //     })
    //   } catch (error) {
    //     commit('updateState', {
    //       theMovie: {}
    //     })
    //   } finally {
    //     commit('updateState', {
    //       loading: false
    //     })
    //   }
    // },
    async getToken({ state, commit }, payload) {
      const { returncode, returnstate } = payload;
      commit('updateState', {
        returncode,
        returnstate
      })
      console.log('fetchToken: code: ' + returncode + '  state : ' + returnstate)
      try {  
        const resp = await _fetchToken(payload)
        console.log('fetchToken: ' + resp.data.access_token + ' access_token : ' + qs.parse(resp.data).access_token)
        commit('updateState', {
          access_token: resp.data.access_token,
          refresh_token: resp.data.refresh_token
        })
      } catch (error) {
        console.log("fetchToken error...")
      } finally {
        console.log("fetchToken finally...")
      }
    },
    async setItem({ state, commit }, payload) {
      const { token } = payload;
      console.log('fetchToken: code: ' + token)
      try {
        const resp = await _fetchCreate(payload)
        console.log('_fetchCreate: ' + resp)
      } catch (error) {
        console.log("_fetchCreate error...")
      } finally {
        console.log("_fetchCreate finally...")
      }
    },
    async getItem({ state, commit }, payload) {
      const { token } = payload;
      console.log('fetchToken: code: ' + token)
      try {
        const resp = await _fetchOrders(payload)
        console.log('_fetchOrders: ' + resp)
      } catch (error) {
        console.log("_fetchOrders error...")
      } finally {
        console.log("_fetchOrders finally...")
      }
    },
  }
} 

// eslint-disable-next-line
// async function _fetchCode(payload) {
//   const url = process.client
//     ? '/api/buyma'
//     : `${process.env.CLIENT_URL}/api/buyma`
//   return await axios.post(url, payload)
// }

async function _fetchToken(payload) {
  const url = process.client
    ? '/api/buyma/login'
    : `${process.env.CLIENT_URL}/api/buyma/login`
  return await axios.post(url, payload)
}

async function _fetchCreate(payload) {
  const url = process.client
    ? '/api/buyma/create'
    : `${process.env.CLIENT_URL}/api/buyma/create`
  return await axios.post(url, payload)
}

async function _fetchOrders(payload) {
  const url = process.client
    ? '/api/buyma/orders'
    : `${process.env.CLIENT_URL}/api/buyma/orders`
  return await axios.post(url, payload)
}