<template>
    <div class="login-header">
        <van-nav-bar :left-arrow="leftArrow"  @click-left="onClickLeft"/>
        <div class="user-message">
            <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['leftArrow', 'url'],
  methods: {
      onClickLeft() {
        this.$router.push({
            path: this.url
        })
      }
   }
}
</script>
<style>
.login-header {
  height: 100%;
  background: #ffffff;
}
.login-header [class*=van-hairline]::after {
    border: none;
}
.login-header .van-nav-bar__title {
    color: #ffffff;
}
.login-header .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
</style>


