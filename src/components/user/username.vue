<template>
  <transition>
    <div class="username">
       <van-nav-bar
            title="设置名字"
            left-text="取消"
            right-text="按钮"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
          <van-button type="primary" size="small" slot="right"> 完成</van-button>
       </van-nav-bar>
        <van-cell-group>
            <van-field v-model="username" :clearable="clear" />
        </van-cell-group>
    </div>
  </transition>
</template>
<script>
import { updateName } from '@/apis/user.js'
export default {
  data() {
    return {
      useranme: '',
      clear: true
    }
  },
  created() {
    console.log(this.$route)
    this.username = this.$route.params.username
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/user/edit'
      })
    },
    onClickRight() {
      console.log(1)
      // 写入数据库
      updateName({ 'username': this.username }).then(res => {
        if (res.status === true) {
          this.$toast.loading({
            mask: true,
            duration: '500',
            message: '加载中...'
          })
          setTimeout(() => {
            this.$router.push({
              path: '/user/edit'
            })
          }, 500)
        } else if (res.status === false) {
          this.$toast(res.message)
        }
      })
    }
  }
}
</script>
<style>
.username {
  height: 100%;
  background: #f8f8f8;
}
.username .van-nav-bar {
  background: #f8f8f8;
}
.username .van-nav-bar__text, .username .van-nav-bar .van-icon {
  color: black;
}
</style>

