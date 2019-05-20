import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import Location from 'components/location/index'
import Read from 'components/read/index'
import Comments from 'components/comment/index'
import Place from 'components/comment/place'
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
          name: 'home',
          component: Location,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/read',
          component: Read,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/read/detail',
          component: ReadContent,
          meta: {
            isLogin: true
          }
        },
        {
          name: 'comment',
          path: '/comment',
          component: Comments,
          meta: {
            isLogin: true
          }
        },
        {
          name: 'place',
          path: '/comment/place',
          component: Place,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/user',
          component: User,
          meta: {
            isLogin: true
          }
        },
        {
          name: 'edit',
          path: '/user/edit',
          component: Edit,
          meta: {
            isLogin: true
          }
        },
        {
          name: 'Editavatar',
          path: '/user/edit/avater',
          component: Avater,
          meta: {
            isLogin: true
          }
        },
        {
          name: 'Editname',
          path: '/user/edit/name',
          component: Username,
          meta: {
            isLogin: true
          }
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {
        isLogin: false
      }
    },
    {
      name: 'regist',
      path: '/regist',
      component: Regist,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/forget',
      component: Forget,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/regist/result',
      component: registSuccess,
      meta: {
        isLogin: false
      }
    },
    {
      name: 'reset',
      path: '/reset',
      component: Reset,
      meta: {
        isLogin: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  checkLogin().then(res => {
    localStorage.setItem('user', res)
  })
  const user = localStorage.getItem('user')
  if(user){
    next()
    if (!to.meta.isLogin) {
      next({
        path: '/home'
      })
    }
  }else{
    if(to.meta.isLogin){
      next({
        path: '/login',
      })
    }else{
      next()
    }
  }
})
export default router
