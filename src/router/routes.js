const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import('src/pages/MealsView.vue')}, 
      //{ path: "/bldg2kor", component: () => import("src/pages/Bldg2Kor.vue") },
      //{ path: "/bldg2eng", component: () => import("src/pages/Bldg2Eng.vue") },
      //{ path: "/bldg1kor", component: () => import("src/pages/Bldg1Kor.vue") },
      //{ path: "/bldg1eng", component: () => import("src/pages/Bldg1Eng.vue") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
