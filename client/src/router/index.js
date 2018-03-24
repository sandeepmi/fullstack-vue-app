import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ItemList from '@/components/items/ItemList'
import Login from '@/components/Login'

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
    }
  ]
})
