export default {
  namespaced: true,
  state: () => ({
    orderheaders: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    orderdesserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
      },
    ],
  }),
  getters: {
    orderheaders (state) { return state.orderheaders },
    orderdesserts(state) { return state.orderdesserts },
    // orderids(state) { 
    //   var ids = [];
    //   for (var i = 0;i < state.orderdesserts.length; i++) {
    //     ids.push({id: state.orderdesserts[i].id})
    //   }
    //   return ids 
    // }
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateDessert(state, payload) {
      const {row, item } = payload
      // console.log('dessert : ', state.orderdesserts, row, item)
      // console.log('dessert : ', state.orderdesserts[row], item)
      state.orderdesserts[row] = item
      
      // force reload event 
      state.orderdesserts.push(item)
      state.orderdesserts.pop(item)
    },
    addDessert(state, payload) {
      const {item } = payload
      state.orderdesserts.push(item)
    }
  },
  actions: {
    updateItem({ state, commit }, payload) {
      const {row, item } = payload
      commit('updateDessert', {
        row: row,
        item: item
      })
    },
    addItem({ state, commit }, payload) {
      const { item } = payload
      commit('addDessert', {
        item: item
      })
    },
    updateDessert({ state, commit }, payload) {
      console.log('updateDessert: ', payload)
      // for (var i = 0;i < orderdesserts.length; i++) {
        // if(orderdesserts[i].name === payload.name) {
          // console.log('orderdesserts.name: ', orderdesserts[i].name)
          // orderdesserts[i].name === payload.rename
          // console.log('orderdesserts.name: ', orderdesserts[i].name)
        // }
      // }
    }
  }
}