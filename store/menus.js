export default {
  namespaced: true,
  state: () => ({
    menus: [
      {
        id:1,
        icon: "mdi-loop",
        title: "메뉴 설정",
        target: "/callback",
      },
      {
        id:2,
        icon: "android",
        title: "페이지2",
        target: "/about",
        model: false,
        // childrens: [
        //   {
        //     id:21,
        //     icon: "assignment_ind",
        //     title: "페이지2_1",
        //     target: "/sign",
        //   },
        //   {
        //     id:22,
        //     icon: "people_alt",
        //     title: "페이지2_2",
        //     target: "/sign",
        //   }
        // ]
      },
      {
        id:3,
        icon: "trending_up",
        title: "페이지3",
        target: "/asbout",
      },
    ]
  })
}