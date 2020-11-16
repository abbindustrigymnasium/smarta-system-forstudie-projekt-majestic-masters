const routes = [
  {
    path: '/People',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/People.vue') },
      { path: 'Person', component: () => import('pages/Person.vue') },
      { path: 'Person/Medicine', component: () => import('pages/Medicine.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('pages/Init.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
