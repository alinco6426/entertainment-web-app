import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/CategoryMovie.vue')
    },
    {
      path: '/tv-series',
      name: 'tv-series',
      component: () => import('../views/CategoryTvSeries.vue')
    },
    {
      path: '/bookmarked',
      name: 'about',
      component: () => import('../views/CategoryBookmarked.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../auth/SignUp.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../auth/LoginRoute.vue')
    }
  ]
})

export default router
