import Vue from 'vue'
import Router from 'vue-router'
import Maps from '@/components/views/Maps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maps',
      component: Maps
    }
  ]
})
