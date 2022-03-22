import { createRouter, createWebHashHistory } from 'vue-router';
import homePage from '../views/homePage.vue';

const routes = [
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('../views/homePage.vue'),
  },
  {
    path: '/',
    redirect: '/homePage',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
