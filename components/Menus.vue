<template>
  <v-card
    height="100%"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
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
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', target: "/about" },
          { title: 'Photos', icon: 'mdi-view-dashboard-variant', target: "/about" },
          { title: 'Orders', icon: 'mdi-order-alphabetical-ascending', target: "/orders" },
          { title: 'About', icon: 'mdi-moped-electric', target: "/about" },
          { title: 'tagging', icon: 'mdi-tag-arrow-right', target: "/about" },
          { title: 'Setup', icon: 'mdi-cog', target: "/about" },
        ],
        right: null,
      }
    },
    methods: {
      movePage(target){
        this.$router.push(target);
      },
    }
  }
</script>