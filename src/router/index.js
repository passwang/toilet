import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import Location from 'components/location/index'
import Read from 'components/read/index'
import Comments from 'components/comment/index'
import User from 'components/user/index'
import ReadContent from 'components/read/readCon'
import Edit from 'components/user/edit'
import Avater from 'components/user/avater'
import Username from 'components/user/username'
import Login from 'components/login/login.vue'
import Forget from 'components/login/forget.vue'
import Reset from 'components/login/reset.vue'
import Regist from 'components/login/regist.vue'
import registSuccess from 'components/login/registSuccess'
import { checkLogin } from '@/apis/session.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/home',
          component: Location
        },
        {
          path: '/read',
          component: Read
        },
        {
          path: '/read/detail',
          component: ReadContent
        },
        {
          path: '/comment',
          component: Comments
        },
        {
          path: '/user',
          component: User
        },
        {
          name: 'edit',
          path: '/user/edit',
          component: Edit
        },
        {
          name: 'Editavatar',
          path: '/user/edit/avater',
          component: Avater
        },
        {
          name: 'Editname',
          path: '/user/edit/name',
          component: Username
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'regist',
      path: '/regist',
      component: Regist
    },
    {
      path: '/forget',
      component: Forget
    },
    {
      path: '/regist/result',
      component: registSuccess
    },
    {
      path: '/reset',
      component: Reset
    }
  ]
})

checkLogin().then(res => {
  localStorage.setItem('user', res)
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user') === false && to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
})
export default router
