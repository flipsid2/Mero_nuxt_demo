
// permanent
<template>
  <v-navigation-drawer 
    id="appDrawer"
    app
    v-model="drawer"
    floating
    persistent
    width="260"
    :mini-variant="mini"
  >
    <v-toolbar color="primary darken-1" dark>
      <Logo />
    </v-toolbar>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        @click="movePage(item.target);"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data () {
    return {
      mini: false,
      responsive: false,
      right: null,
    }
  },
  computed: {
    ...mapState('menus', [
      'items'
    ]),
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(val) {
        this.$store.commit('drawer', val)
      }
    },
  },
  // computed: _.extend(
  //   ...mapState(['menus', 'colors']),
  // ),
  mounted(){
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    movePage(target){
      this.$router.push(target);
    },
    onResponsiveInverted () {
      if (window.innerWidth < 1000) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.appDrawer {
  overflow: hidden;
  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>