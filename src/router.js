import Home from './views/Home.vue'
import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import Movies from './views/Movies.vue'
import Order from './views/Order.vue'
import Tickets from './views/Tickets.vue'
import Comments from './views/Comments.vue'

import Personal from './views/Personal.vue'

import NotFound from './views/NotFound.vue'
import Register_Login from './views/Register_Login.vue'

import Movie_details from './views/Movie_details.vue'
import Cinema from './views/Cinema.vue'
import Search from './views/Search.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', component: Home,children:[
      {path: '', component: Index},
      {path: '/index', component: Index},
      {path: '/personal', component: Personal},
      {path: '/movies', component: Movies},
      {path: '/tickets', component: Tickets},
      {path: '/order', component: Order},
      {path: '/comments', component: Comments},
      {path: '/movie_details', component: Movie_details},
      {path: '/cinema', component: Cinema},
      {path:'/search',component:Search}
    ]},
    {path:'/login_register',component:Register_Login},
    {path: '**', component: NotFound}
    ],
})
