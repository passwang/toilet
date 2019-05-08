<template>
<transition>
    <div class="edit">
       <van-nav-bar
            title="我的信息"
            left-arrow
            @click-left="onClickLeft"
        />
    <van-cell-group class="user-group">
      <van-cell title="头像" is-link :to="{name: 'Editavatar', params: { avatar: avatar}}" class="edit-avater">
           <template slot="title">
              <span class="custom-text">头像</span>
              <img  :src="'/static/avatars/' + avatar" class="title-avater"/>
            </template>
      </van-cell>
      <van-cell title="名字" is-link  :value="username" :to="{name: 'Editname', params: {username: username}}"/>
    </van-cell-group>
  </div>
</transition>
</template>
<script>
import { getUser } from '@/apis/user.js'
export default {
  data() {
    return {
      username: '',
      avatar: ''
    }
  },
  created() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      getUser().then(res => {
        const data = res[0]
        this.username = data.username
        this.avatar = data.avatar
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/user'
      })
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'edit') {
        this.loadUser()
      }
    }
  }
}
</script>
<style>
.edit {
  height: 100%;
  background: #f8f8f8;
}
.edit .van-nav-bar {
  background: #f8f8f8;
}
.edit .van-nav-bar__text, .edit .van-nav-bar .van-icon {
  color: black;
}
.edit .edit-avater {
  clear: both;
}
.edit .title-avater {
  width: 2em;
  height: 2em;
  border-radius: 5px;
  float: right;
}
</style>

