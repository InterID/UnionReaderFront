const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/settings',
    component: () => import('pages/SettingsPage.vue')
  },
  {
    path: '/readers',
    component: () => import('pages/ReadersPage.vue'),
    meta: { 
      requiresAuth: true
    }
  }
]

export default routes
