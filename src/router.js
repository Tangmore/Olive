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


import Add_travel from './views/Add_travel.vue'
import Travel_detail from './views/Travel_detail.vue'

import Movie_details from './views/Movie_details.vue'

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
      {path: '/travel_detail', component: Travel_detail},
      {path: '/comments', component: Comments},
      {path: '/movie_details', component: Movie_details},
      {path: '/add_travel', component: Add_travel}
    ]},
    {path:'/login_register',component:Register_Login},
    {path: '**', component: NotFound}
    ],
})
