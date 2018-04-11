import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ItemList from '@/components/items/ItemList'
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
import MyAccount from '@/components/auth/MyAccount'
import ChangePassword from '@/components/auth/ChangePassword'
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
      path: '/logout',
      name: 'Logout',
      beforeEnter: logout
    },
    {
      path: '/my-account',
      name: 'MyAccount',
      component: MyAccount,
      beforeEnter: requireAuth
    },
    {
      path: '/my-account/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter: requireAuth
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
