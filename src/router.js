import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/about2',
      name: 'about2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About2.vue')
    },
    {
      path: '/lightingengine',
      name: 'Lighting Engine',
      component: () => import(/* webpackChunkName: "about" */ './views/lightingengine.vue')
    },
    {
      path: '/montecarlotree',
      name: 'Monte Carlo Tree',
      component: () => import(/* webpackChunkName: "about" */ './views/montecarlotree.vue')
    },
    {
      path: '/scheduler',
      name: 'Guelph scheduler 2',
      component: () => import(/* webpackChunkName: "about" */ './views/guelphscheduler2.vue')
    },
    {
      path: '/co-op',
      name: 'co-op_1',
      component: () => import(/* webpackChunkName: "about" */ './views/co-op.vue')
    },
    {
      path: '/co-op2',
      name: 'co-op_2',
      component: () => import(/* webpackChunkName: "about" */ './views/co-op2.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import(/* webpackChunkName: "about" */ './views/resume.vue')
    }
  ]
})
