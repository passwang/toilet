<template>
   <div class="read-content">
        <van-nav-bar
            :title="readDetail.title"
            left-text="返回"
          
            left-arrow
            @click-left="onClickLeft"
        >
          <!-- <van-button class="view-button" type="default" slot="right">
            <van-icon name="eye-o" class="view-icon"/>{{readDetail.views}}  views
        </van-button> -->
        </van-nav-bar>
        <van-notice-bar wrapable :scrollable="false">{{readDetail.content1}}</van-notice-bar>
        <div class="read-img"><img :src="readDetail.img" style="padding:2px;border:1px solid #999"></div>
        <van-notice-bar wrapable :scrollable="false">{{readDetail.content2}}</van-notice-bar>
   </div>
</template>
<script>
import { getReadContent } from '@/apis/read.js'
export default {
  data() {
    return {
      readDetail: '',
      visible: true,
      id: this.$route.query.id,
      flag: this.$route.query.flag
    }
  },
  mounted() {
    this.loadContent()
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/read'
      })
    },
    loadContent() {
      const params = {
        'id': this.id,
        'flag': this.flag
      }
      getReadContent(params).then(res => {
        this.readDetail = res[0]
      })
    }
  },
  watch: {
    $route() {
      // bug时间戳不起作用
      this.id = this.$route.query.id
      this.flag = this.$route.query.flag
      if (this.id && this.flag) {
        // this.$toast.loading({
        //   mask: true,
        //   message: '加载中...',
        //   duration: '200'
        // })
        this.loadContent()
      }
    }
  }
}
</script>
<style>
.read-content .view-button {
    height: 2em;
    vertical-align: middle;
    text-align: center;
    line-height: 2em;
}
.read-content .van-button__text {
    color: #999;
}
.read-content .view-icon {
    margin-right: 5px;
}
.read-content .read-img {
  text-align: center;
}
.read-content .van-notice-bar {
  color: #999;
  background: #fff;
}
</style>