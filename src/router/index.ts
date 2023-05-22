import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    children: [
      {
        path: '',
        redirect: 'detail/about'
      },
      {
        path: 'moves',
        name: 'Moves',
        component: () => import('../views/Moves.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/message/:id',
    component: () => import('../views/ViewMessagePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
