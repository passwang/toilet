import Vue from 'vue'
import Router from 'vue-router'
import Location from 'components/location/index'
import Read from 'components/read/index'
import Comments from 'components/comment/index'
import User from 'components/user/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Location
    },
    {
      path: '/read',
      component: Read
    },
    {
      path: '/comment',
      component: Comments
    },
    {
      path: '/user',
      component: User
    }
  ]
})
