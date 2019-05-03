<template>
   <div class="home">
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>
    <van-tabbar v-model="active" active-color="#07c160" @change="toActive">
        <van-tabbar-item icon="friends-o" to="/home">卫生间</van-tabbar-item>
        <van-tabbar-item icon="newspaper-o" to="/read">阅读</van-tabbar-item>
        <van-tabbar-item icon="records" to="/comment">反馈</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/user">设置</van-tabbar-item>
    </van-tabbar>
    </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      index: 0,
      navUrl: ['/home', '/read', '/comment', '/user']
    }
  },
  created() {
    // 回到首页
    // this.$router.push(this.navUrl[0])
    // if (this.$route.path !== this.navUrl[this.index]) {
    //   this.$router.push(this.navUrl[this.index])
    // }
    if (this.navUrl.indexOf(this.$route.path)) {
      this.active = this.navUrl.indexOf(this.$route.path)
    }
  },
  methods: {
    toActive(i) {
      this.active = i
      this.index = i
    }
  },
  watch: {
    // 动态监听路由
    // $route(to, from) {
    //   console.log(to.path)
    // }
  }
}
</script>
<style>
.home {
  height: 100%;
}
</style>

