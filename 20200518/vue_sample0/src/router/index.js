import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Userhome from '../views/Userhome.vue'
import Userphotos from '../views/Userphotos.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/userhome',
    name: 'Userhome',
    component: Userhome
  },
  {
    path: '/userphotos',
    name: 'Userphotos',
    component: Userphotos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
