<template>
  <div>
    <!-- <Search /> -->
    <BuyListTable />
    <!-- <CRUDTable /> -->
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import Search from '~/components/Search'
import BuyListTable from '~/components/BuyListTable'
// import CRUDTable from '~/components/CRUDTable'

export default {
  components: {
    // Search,
    BuyListTable
    // CRUDTable
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