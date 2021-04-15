import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsMain from '../views/ProductsList/ProductsMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductsPage',
    component: ProductsMain
  },
  {
    path: '/bag',
    name: 'ProductsMiniBag',
    component: () => import('../views/ProductsMiniBag.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
