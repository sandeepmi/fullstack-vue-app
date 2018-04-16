import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ItemList from '@/components/items/ItemList'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import MyAccount from '@/components/auth/MyAccount'
import Profile from '@/components/auth/Profile'
import ChangePassword from '@/components/auth/ChangePassword'
import ForgotPassword from '@/components/auth/ForgotPassword'
import ResetPassword from '@/components/auth/ResetPassword'
import PageNotFound from '@/components/PageNotFound'
import { requireAuth, logout } from '@/helpers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/items',
      name: 'Items',
      component: ItemList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/account/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/account/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: logout
    },
    {
      path: '/account',
      component: MyAccount,
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'MyAccount',
          component: Profile
        },
        {
          path: 'change-password',
          name: 'ChangePassword',
          component: ChangePassword
        }
      ]
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
