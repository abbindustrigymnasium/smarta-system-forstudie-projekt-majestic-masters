const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'Person', component: () => import('pages/Person.vue') },
      { path: 'Person/Medicine', component: () => import('pages/Medicine.vue') }
    ]
  },

  {
    path: '/Login',
    component: () => import('pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
