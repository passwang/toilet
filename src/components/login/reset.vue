<template>
    <div class="reset">
        <van-nav-bar left-arrow  @click-left="onClickLeft"/>
       <div class="user-message">
          <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
      </div>
    <div class="login-group">
      <van-cell-group>
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入新密码"
          right-icon="closed-eye"
        />
      </van-cell-group>
    </div>
     <div class="van-cell  reset-tip">
          密码由6-10个字符构成哦
      </div>
      <div class="van-cell">
        <van-button square type="primary" class="login-btn" style="width: 90%;margin: 0 auto;" @click="ToLogin">确认修改</van-button>
      </div>
  </div>
</template>
<script>
import { doReset } from '@/apis/user.js'
export default {
  data() {
    return {
      password: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/forget'
      })
    },
    ToLogin() {
      console.log(this.password)
      doReset({ 'password': this.password, 'mobile': this.$route.params.mobile }).then(res => {
        if (res.status === true) {
          this.$toast.loading({
            mask: true,
            duration: '200',
            message: '修改成功，即将跳到登录'
          })
          this.$router.push({
            path: '/login'
          })
        }
      })
    }
  }
}
</script>
<style>
.reset {
  height: 100%;
  background: #ffffff;
}
.reset [class*=van-hairline]::after {
    border: none;
}
.reset .van-nav-bar__title {
    color: #ffffff;
}
/* .reset .van-cell__value {
   border-bottom: 1px solid rgb(223, 218, 218);
} */
.reset .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.reset .van-field__label {
  text-align: center;
}
.reset .van-cell:not(:last-child)::after {
    border-bottom: none;
}
.reset .reset-tip {
    color: #ccc;
    font-size: 0.8em;
}
</style>


