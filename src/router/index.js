import { createRouter, createWebHistory } from 'vue-router'
//import Style from '@/views/StyleView.vue'
//import Home from '@/views/HomeView.vue'



const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/HomeView.vue')
  },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: () => import('../views/UserView.vue')
  // },
  // {
  //   path: '/shop',
  //   name: 'shop',
  //   component: () => import('../views/ShopView.vue')
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'dashboard',
    component: () => import('@/views/HomeView.vue') // No necesitamos por el momento una pagina de no encontrado, por eso lo envio al dashboard
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
