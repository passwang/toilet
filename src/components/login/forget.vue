<template>
    <div class="forget">
         <van-nav-bar title="注册"  left-arrow  @click-left="onClickLeft"/>
       <div class="user-message">
          <div class="user-img"><img class="user-avater" src="../../assets/imgs/logo.png" width="100px" height="100px"></div>
      </div>
    <div class="login-group">
      <van-cell-group>
         <van-field
            v-model="mobile"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
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
        <van-button square type="primary" class="login-btn" style="width: 90%;margin: 0 auto;" @click="handleStep">下一步</van-button>
      </div>
    </div>
    </div>
</template>
<script>
import { sendResetCode, checkForget } from '@/apis/user.js'
export default {
  data() {
    return {
      mobile: '',
      sms: ''
    }
  },
  methods: {
    sendNews() {
      sendResetCode({ 'mobile': this.mobile }).then(res => {
        if (res.status === true) {
          this.$toast('验证码已经成功发送！')
        } else if (res.ststus === false) {
          this.$toast(res.message)
        }
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/login'
      })
    },
    handleStep() {
      const params = {
        'mobile': this.mobile,
        'sms': this.sms
      }
      checkForget(params).then(res => {
        if (res.status === true) {
          this.$router.push({
            name: 'reset',
            params: {
              mobile: this.mobile
            }
          })
        } else if (res.status === false) {
          this.$toast(res.message)
        }
      })
    }
  }
}
</script>
<style>
.forget {
  height: 100%;
  background: #ffffff;
}
.forget [class*=van-hairline]::after {
    border: none;
}
.forget .van-nav-bar__title {
    color: #ffffff;
}
/* .forget .van-cell__value {
   border-bottom: 1px solid rgb(223, 218, 218);
} */
.forget .user-message {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.forget .van-field__label {
  text-align: center;
}
</style>

