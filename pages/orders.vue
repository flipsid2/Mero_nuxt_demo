<template>
  <div>
    <Search />
    <DataTable />
  </div>
</template>

<script>

import Search from '~/components/Search'
import DataTable from '~/components/DataTable'

export default {
  components: {
    Search,
    DataTable
  },
  created() {
    
  }
}
</script>