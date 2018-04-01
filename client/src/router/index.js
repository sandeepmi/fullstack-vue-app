import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ItemList from '@/components/items/ItemList'
import Login from '@/components/Login'
import MyAccount from '@/components/MyAccount'
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
      path: '*',
      component: PageNotFound
    }
  ]
})
