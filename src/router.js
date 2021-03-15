import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/accounts',
          name: 'accounts management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Accounts.vue')
        },
        {
          path: '/managers',
          name: 'managers management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Managers.vue')
        },
        {
          path: '/courses',
          name: 'courses management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Courses.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/tutors',
          name: 'tutors management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables/Tutors.vue')
        },
        {
          path: '/feedbacks',
          name: 'feedback confirmation',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables/Feedback.vue')
        },
        {
          path: '/membership',
          name: 'membership & fees',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables/Membership.vue')
        },
        {
          path: '/manager',
          name: 'manager management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables/Manager.vue')
        },
        {
          path: '/classes',
          name: 'classes management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Class/Classes.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
