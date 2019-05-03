<template>
<transition>
  <div class="regist">
      <van-nav-bar title="注册"  left-arrow  @click-left="onClickLeft"/>
       <div class="user-message">
          <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
      </div>
    <div class="login-group">
      <van-cell-group>
        <van-field
          v-model="username"
          placeholder="请输入用户名"
          label="账号"
          @blur="haveUser"
          :error-message="userErr"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="密码6-10位数字字母的组合"
          right-icon="closed-eye"
        />
         <van-field
            v-model="phone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            :error-message="phoneErr"
            @blur="testPhone"
          />
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
           >
            <van-button slot="button" size="small" type="primary" @click="sendNews">发送验证码</van-button>
        </van-field>
      </van-cell-group>
       <div class="van-cell">
        <van-button square type="primary" class="login-btn" style="width: 90%;margin: 0 auto;" @click="handleRegist">注册</van-button>
      </div>
     <div class="van-cell back-login">
        <van-button type="default" tag="a" size="small" class="van-cell__value" @click="Tologin">返回登录</van-button>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import { sendMobileCode, doRegist, checkUsername } from '@/apis/user.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      phone: '',
      sms: '',
      phoneErr: '',
      userErr: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/login'
      })
    },
    haveUser() {
      checkUsername({ 'username': this.username }).then(res => {
        if (res.status === false) {
          this.userErr = res.message
          this.flag = false
        } else if (res.status === true) {
          this.userErr = ''
          this.flag = true
        }
      })
    },
    testPhone() {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.phoneErr = '手机格式错误'
        this.flag = false
      } else {
        this.flag = true
        this.phoneErr = ''
      }
    },
    sendNews() {
      sendMobileCode({ 'mobile': this.phone }).then(res => {
        if (res === 1) {
          this.$toast('该用户已经注册过啦')
        } else if (res.status === true) {
          this.$toast('验证码已经成功发送！')
        } else if (res.ststus === false) {
          this.$toast(res.message)
        }
      })
    },
    handleRegist() {
      const params = {
        'username': this.username,
        'password': this.password,
        'mobile': this.phone,
        'sms': this.sms
      }
      doRegist(params).then(res => {
        if (res.status === true) {
          this.$router.push({
            path: '/regist/result'
          })
        } else if (res.status === false) {
          this.$toast(res.message)
        }
      })
    },
    Tologin() {
      // 获取用户名密码登录
      this.$router.push({
        path: '/login',
        params: {
          'username': this.username,
          'password': this.password
        }
      })
    }
  }
}
</script>
<style>
.regist {
  height: 100%;
  background: #ffffff;
}
.regist [class*=van-hairline]::after {
    border: none;
}
.regist .van-nav-bar__title {
    color: #ffffff;
}
.regist .van-cell__value {
   border-bottom: 1px solid rgb(223, 218, 218);
}
.regist .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.regist .van-field__label {
  text-align: center;
}
.regist .back-login {
  text-align: right;
  padding-top: 0;
  padding-bottom: 0;
}
.regist .back-login .van-button--default,  .regist .regist-regist .van-button--default{
  border: none;
}
.regist .back-login .van-button__text {
  color: #07c160;
}
.regist .van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
</style>

