import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Selseat from './views/Selseat.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/selseat',
      component: Selseat
    }
  ]
})
