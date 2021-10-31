import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Check from '@/views/CheckSerial.vue'
import Apprisal from '@/views/Apprisal.vue'
import CheckWork from '@/views/Employee/CheckWork.vue'
import SetWork from '@/views/Header/SetWork.vue'
import Bill from '@/views/Bill.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/check-serial',
    name: 'CheckSerial',
    component: Check
  },
  {
    path: '/apprisal',
    name: 'Apprisal',
    component: Apprisal
  },
  {
    path: '/check-work',
    name: 'CheckWork',
    component: CheckWork
  },
  {
    path: '/set-work',
    name: 'SetWork',
    component: SetWork
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill
  }
]

const router = new VueRouter({
  routes
})

export default router
