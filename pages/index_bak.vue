<template>
  <div>
    <Headline />
    <Search />
    <MovieList />
    <DataTable />
  </div>
</template>

<script>

import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'
import DataTable from '~/components/DataTable'

export default {
  components: {
    Headline,
    Search,
    MovieList,
    DataTable
  },
  created() {
    this.$store.commit('movie/resetMovies')
    this.$store.commit('oauth/resetTokens')
  }
}
</script>
