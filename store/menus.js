export default {
  namespaced: true,
  state: () => ({
    items: [
      { title: '매입목록', icon: 'mdi-view-dashboard', target: "/buylist" },
      { title: '주문목록', icon: 'mdi-order-alphabetical-ascending', target: "/orders" },
      { title: '상품목록', icon: 'mdi-view-dashboard-variant', target: "/about" },
      { title: 'About', icon: 'mdi-moped-electric', target: "/about" },
      { title: 'tagging', icon: 'mdi-tag-arrow-right', target: "/about" },
      { title: 'Setup', icon: 'mdi-cog', target: "/useradmin" },
      { title: 'Filter_Table', icon: 'mdi-table', target: "/filtertable" },
    ],
  })
}