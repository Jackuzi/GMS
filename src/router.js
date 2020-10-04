import Vue from 'vue'
import Router from 'vue-router'
import Jobs from './views/Jobs.vue'
import Cars from './views/Cars.vue'
import Parts from './views/Parts.vue'
import Settings from './views/Settings.vue'
import Customers from './views/Customers.vue'
import Invoices from './views/Invoices.vue'
import Mots from './views/Mots.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/cars',
      name: 'cars',
      component: Cars
    },
    {
      path: '/parts',
      name: 'parts',
      component: Parts
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices
    },
    {
      path: '/mots',
      name: 'mots',
      component: Mots
    },

    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard
    // },
  ]
})