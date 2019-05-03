<template>
  <div class="login">
      <van-nav-bar title="登录" />
      <div class="user-message">
          <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
      </div>
    <div class="login-group">
      <van-cell-group>
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          label="账号"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="closed-eye"
        />
      </van-cell-group>
      <div class="van-cell login-forget">
        <van-button type="default" tag="a" size="small" class="van-cell__value" to="/forget">忘记密码?</van-button>
      </div>
      <div class="van-cell">
        <van-button square type="primary" class="login-btn" style="width: 90%;margin: 0 auto;" @click="handleLogin">登录</van-button>
      </div>
      <div class="van-cell login-regist">
        <div style="width: 100%; text-align: center">
          <span>新用户?</span>
          <van-button type="default"  class="regist-btn" tag="a" size="small" to="/regist">注册</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { doLogin } from '@/apis/user.js'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    if (this.$route.params) {
      this.username = this.$route.params.username
      this.password = this.$route.params.password
    }
  },
  methods: {
    handleLogin() {
      const params = {
        'username': this.username,
        'password': this.password
      }
      doLogin(params).then(res => {
        if (res.status === false) {
          this.$toast(res.message)
        } else if (res.status === true) {
          localStorage.setItem('user', this.username)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style>
.login {
  height: 100%;
  z-index: 99;
  background: #ffffff;
}
.login [class*=van-hairline]::after {
    border: none;
}
.login .van-nav-bar__title {
    color: #ffffff;
}
.login .van-cell__value {
   border-bottom: 1px solid rgb(223, 218, 218);
}
.login .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.login .van-field__label {
  text-align: center;
}
.login .login-forget {
  text-align: right;
  padding-top: 0;
  padding-bottom: 0;
}
.login .login-forget .van-button--default,  .login .login-regist .van-button--default{
  border: none;
}
.login .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
/* .login .login-btn {
  background: rgb(134, 209, 184);
  border-color: aqua;
}
.login .login-regist .van-button__text {
  color: rgb(134, 209, 184);
} */
.login .login-regist .van-button__text {
  color:   #07c160;
}  
.login .regist-btn {
  text-align: left;
}
</style>

