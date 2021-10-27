<template>
  <v-app>
    <Menus />
    
    <v-main>
      <Header />  
      <Nuxt />      
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Menus from '~/components/Menus'
import Header from '~/components/Header'
// import PageHeader from '~/components/PageHeader'
import Footer from '~/components/Footer'

export default {
  components: {
    Menus,
    Header,
    // PageHeader,
    Footer
  }
}
</script>
