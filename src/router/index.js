import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Animate from '@/components/animate'
import trackingTest from "../components/trackingTest";
import trackingTest2 from "../components/trackingTest2";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path:'/animate',
      name: 'Animate',
      component: Animate
    },
    {
      path:'/',
      name: 'trackingTest',
      component: trackingTest
      // component: trackingTest2
    }
  ]
})
