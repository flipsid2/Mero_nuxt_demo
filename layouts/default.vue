<template>
  <v-app>
    <v-navigation-drawer app>
      <Menus />
    </v-navigation-drawer>
    <!-- <v-app-bar app><Header /></v-app-bar> -->
    <v-main>   
      <Header />   
      <Nuxt />
      <Footer />
    </v-main>
    <!-- <v-footer app><Footer /></v-footer> -->
  </v-app>
</template>

<script>
import Menus from '~/components/Menus'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Menus,
    Header,
    Footer
  }
}
</script>