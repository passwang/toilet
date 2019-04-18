// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// import VueAMap from 'vue-amap'
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(Vant)
// Vue.use(VueAMap)
/* eslint-disable no-new */
// VueAMap.initAMapApiLoader({
//   key: '77f0b751418f3a0bcfcd21e65149170d',
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation'],
//   uiVersion: '1.0.11', // ui库版本，不配置不加载,
//   v: '1.4.4'
// })

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
