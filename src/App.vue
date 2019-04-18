<template>
  <div id="app">
   <keep-alive>
      <router-view ></router-view>
    </keep-alive>
    <van-tabbar v-model="active" active-color="#07c160">
        <van-tabbar-item icon="friends-o" to="/home">卫生间</van-tabbar-item>
        <van-tabbar-item icon="newspaper-o" to="/read">阅读</van-tabbar-item>
        <van-tabbar-item icon="edit" to="/comment">反馈</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/user">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style scoped>
#app{
  width: 100%;
  height: 600px;
}
</style>

