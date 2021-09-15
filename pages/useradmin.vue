<template>
  <div>
    <!-- <Search /> -->
    <!-- <OrderTable /> -->
    <CRUDTable />
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import Search from '~/components/Search'
// import OrderTable from '~/components/OrderTable'
import CRUDTable from '~/components/UserAdminTable'

export default {
  components: {
    // Search,
    // OrderTable,
    CRUDTable
  },
  // computed: {
  //   ...mapState('orders', [
  //     'orderheaders',
  //     'orderdesserts'
  //   ])
  // },
  // v-on:desserts="updateValue($event.target.desserts)"
  // methods: {
  //   updateValue: function (value) {
  //     console.log('updateValue : ', value)
  //     // this.$emit('orderdesserts', value)
  //   }
  // },
  created() {

  }
}
</script>