
// permanent
<template>
  <v-card
    height="100%"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer 
      app
      floating
      persistent
    >
      <v-list-item
        @click="movePage('/');"
      >
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Maero OMS
          </v-list-item-title>
          <v-list-item-subtitle>
            Supervisor
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

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
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  data () {
    return {
      drawer: null,
      responsive: false,
      right: null,
    }
  },
  computed: {
    ...mapState('menus', [
      'items'
    ])
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