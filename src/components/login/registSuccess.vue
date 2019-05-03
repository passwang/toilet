<template>
    <div class="registSuccess">
      <van-nav-bar  left-arrow  @click-left="onClickLeft"/> 
      <div class="user-message">
          <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
      </div>
      <div class="lead-span"><van-icon name="checked" class="lead-icon"/>注册成功</div>
      <div class="lead-span">终于等到你，欢迎使用</div>
      <div class="lead-route"><a @click="ToHome">进入地图</a></div>  
    </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/regist'
      })
    },
    ToHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style>
.registSuccess {
  height: 100%;
  background: #ffffff;
}
.registSuccess [class*=van-hairline]::after {
    border: none;
}
.registSuccess .van-nav-bar__title {
    color: #ffffff;
}

.registSuccess .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.registSuccess .lead-span {
  height: 15%;
  text-align: center;
  font-size: 2em;
  color: #ccc;
}
.registSuccess .van-icon {
  color: #07c160;
}
.registSuccess .lead-icon {
  margin-right: 10px;
}
.registSuccess .lead-route {
  text-align: right;
  font-size: 1.5em;
  margin-right: 2em;
  color: #07c160;
}
</style>


