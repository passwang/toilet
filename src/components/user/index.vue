<template>
  <div class="user">
      <van-nav-bar title="我的" @click-right="logout"><van-icon name="ellipsis" slot="right" /></van-nav-bar>
    <div class="user-message">
        <div class="user-img"><img class="user-avater" src="../../assets/imgs/user.png" width="100px" height="100px"></div>
        <div class="user-name">{{username}}</div>
    </div>
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="修改信息" is-link to="/user/edit"/>
    </van-cell-group>
   <van-collapse v-model="activeNames">
        <van-collapse-item title="我的反馈" name="2" icon="user-o">
           <van-cell v-for="(item,index) in comments" :key="index" :value="item" class="user-comment"></van-cell>
        </van-collapse-item>
    </van-collapse>
    <div style="height: 50px"></div>
    <van-actionsheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />
  </div>
</template>

<script>
import { getUser, doOut } from '@/apis/user.js'
export default {
  data() {
    return {
      activeNames: ['2'],
      username: '',
      img: '',
      comments: '',
      show: false,
      actions: [
        {
          name: '退出登录'
        }
      ]
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      getUser().then(res => {
        const data = res[0]
        this.username = data.username
        this.img = '1557634914093.jpeg'
        this.comments = data.comments.length === 0 ? ['你还没有反馈哦'] : data.comments
      })
    },
    onCancel() {
      this.show = false
    },
    logout() {
      this.show = true
    },
    onSelect() {
      localStorage.clear()
      doOut()
      this.$toast.loading({
        mask: true,
        duration: '500',
        message: '您将跳转到登录页面'
      })
      this.$router.push({
        path: '/login'
      })
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === 'edit') {
        this.loadUser()
      }
    }
  }
}
</script>

<style>
.user {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.user  .van-nav-bar {
    background: #ff4d4d;
    border: none;
}
.user [class*=van-hairline]::after {
  border: none;
}
.user .van-nav-bar__title {
    color: #ffffff;
}
.user .user-message {
    height: 40%;
    background:   #ff4d4d;
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
}
.user .user-message .user-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.user .user-message .user-name {
  margin-top: 2em;
  color: #ffffff;
}
.user .van-cell__left-icon  {
    color: #ff976a;
}
.user .user-edit {
    margin-left: 5px;
}
.user .van-nav-bar__text {
  color: #ffffff;
}
.user .van-nav-bar .van-icon {
  color: #ffffff;
}
.user .user-comment .van-cell__value--alone {
  color: #969799;
}
</style>