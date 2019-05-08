<template>
<transition>
    <div id="avater">
       <van-nav-bar
            title="个人头像"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
        <van-icon name="ellipsis" slot="right"/>
       </van-nav-bar>
        <div class="img-con">
            <img :src="avatar" width="300em" ref="logo">
        </div>
        <van-actionsheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            @select="onSelect"
            @cancel="onCancel"
        >
        <div class="uploadForm">
           <van-uploader :after-read="onRead" accept="image/×">
                <van-icon name="photograph" />
            </van-uploader>
          </div>
        </van-actionsheet>
  </div>
</transition>
</template>
<script>
import { updateAvatar } from '@/apis/user.js'
export default {
  data() {
    return {
      actions: [],
      show: false,
      avatar: '',
      file: ''
    }
  },
  created() {
    this.avatar = '/static/avatars/' + this.$route.params.avatar
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/user/edit'
      })
    },
    onRead(file, detail) {
      console.log(file)
      this.file = file.file
      this.show = false
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        duration: '200'
      })
      console.log(file)
      this.avatar = file.content
      // 写入数据库
      this.handleAvatar()
    },
    handleAvatar() {
      let formData = new FormData()
      formData.append('file', this.file)
      updateAvatar(formData).then(res => {
        if (res.status === true) {
          this.$toast('头像更新成功')
        }
      })
    },
    onClickRight() {
      this.show = true
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      console.log(1)
      this.show = false
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.$router.go(0)
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
<style>
#avater {
    height: 100%;
    background: black;
    z-index: 99;
    position: relative;
}
#avater  .van-nav-bar {
  background: black;
}
#avater .van-nav-bar__title, #avater .van-nav-bar .van-icon {
  color: #ffffff;
}
#avater .van-hairline--bottom::after {
    border: none;
}
#avater .img-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
#avater .uploadForm {
  text-align: center;
  line-height: 3em;
}
/* #avater .uploadForm .file_upload_box {
                display: inline-block;
                position: relative;
               overflow: hidden;
}
 #avater .uploadForm   .file_upload_box input[type=file] {
               position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                opacity: 0;
                 cursor: pointer;
  }             
  #avater .uploadForm .file_upload_box a {
                display: inline-block;
                width: 100%;
                line-height: 3em;
                text-align: center;
                text-decoration: none;
                color:black;
      } */
</style>

