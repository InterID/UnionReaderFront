const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      {
        path: "/settings",
        name: "settings",
        component: () => import("pages/SettingsPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/readers",
        name: "readers",
        component: () => import("pages/ReadersPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
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
