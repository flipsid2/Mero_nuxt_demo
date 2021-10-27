
const menu = [
  { title: '매입목록', icon: 'mdi-view-dashboard', href: '/buylist' },
  { title: '주문목록', icon: 'mdi-order-alphabetical-ascending', href: '/orders' },
  { title: '상품목록', icon: 'mdi-view-dashboard-variant', href: '/about' },
  { title: 'About', icon: 'mdi-moped-electric', href: '/about' },
  { title: 'tagging', icon: 'mdi-tag-arrow-right', href: '/about' },
  { title: 'Setup', icon: 'mdi-cog', href: '/useradmin' },
];

// reorder menu
menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default menu;