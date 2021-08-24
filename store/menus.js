export default {
  namespaced: true,
  state: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', target: "/about" },
      { title: 'Photos', icon: 'mdi-view-dashboard-variant', target: "/about" },
      { title: 'Orders', icon: 'mdi-order-alphabetical-ascending', target: "/orders" },
      { title: 'About', icon: 'mdi-moped-electric', target: "/about" },
      { title: 'tagging', icon: 'mdi-tag-arrow-right', target: "/about" },
      { title: 'Setup', icon: 'mdi-cog', target: "/about" },
    ],
  })
}