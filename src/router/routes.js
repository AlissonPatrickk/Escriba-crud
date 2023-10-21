const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutSignIn.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  {
    path: '/Register',
    component: () => import('layouts/LayoutSignIn.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/Items',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ListItems.vue') }
    ]
  },
  {
    path: '/AddItems',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddItems.vue') }
    ]
  },
  {
    path: '/MyItems',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyItems.vue') }
    ]
  }
]

export default routes
