import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RobotAccountsPage from '../pages/RobotAccountsPage.vue'
import { getSavedCredentials } from '@/utils/requests'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        loginPage: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        loginPage: true,
      },
    },
    {
      path: '/robots',
      name: 'robots',
      component: RobotAccountsPage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      getSavedCredentials() // Check if credentials are stored
      next() // If credentials are valid, allow the navigation
    } catch {
      next('/') // If credentials are not valid, redirect to login page
    }
  } else if (to.matched.some((record) => record.meta.loginPage)) {
    try {
      getSavedCredentials()
      next('/robots')
    } catch {
      next()
    }
  }
})

export default router
