<template>
   <div class="comment">
     <van-nav-bar
        title="卫生间问题反馈"
      />
      <van-cell-group class="comment-form">
          <van-field v-model="address"  label="选择地点" placeholder="请选择您想反馈的卫生间地点" right-icon="location-o" @click-right-icon="ToLocation"/>
          <div class="van-cell van-field" style="margin:10px 0">
            <div class="van-cell__title van-field__label" style="margin-top">反馈类型</div>
            <div class="van-cell__value">
              <van-radio-group v-model="radio">
              <van-radio name="1">环境</van-radio>
              <van-radio name="2">报修</van-radio>
            </van-radio-group>
            </div>
          </div>
          <div class="form-label">反馈问题</div><van-field v-model="message" type="textarea" placeholder="请输入您想反馈的卫生间问题" rows="2" autosize/>
          <!-- 暂时做成自定位 -->
          <div class="form-label">上传照片</div>
          <div class="upload van-cell van-field">
            <!-- <div class="van-cell__title van-field__label">上传照片最多3张</div> -->
            <div class="posting-uploader van-cell__value">
                  <span class="posting-uploader-item" v-for="(item,index) in postData" :key="index">
                    <img :src="item.content" alt="图片" class="imgPreview" width="50px" height="50px;">
                    <van-icon name="close" @click="delImg(index)" class="delte"/>
                  </span>
                  <van-uploader  type="file" :after-read="onRead" :accept="'image/*'" v-show="postData.length<=3">
                    <van-icon name="photo-o" size="2em"/>
                  </van-uploader>
                </div>
          </div>
          <div class="form-label">联系方式</div>
          <van-field v-model="username" label="联系人" placeholder="请输入用户名" required @blur="testuser" :error-message="userErr"/>
          <van-field v-model="phone"  ref="phone" type="tel" label="手机号" placeholder="请输入手机号" required @blur="testPhone"  :error-message="phoneErr"/>
        </van-cell-group>
        <div class="submit-btn">
          <van-button type="primary" style="width: 90%;" @click="sublitComent">提交申请</van-button>
        </div>
    </div>
</template>
<script>
import AMap from 'AMap'
import { submitResult } from '@/apis/comment.js'
export default {
  data() {
    return {
      address: '',
      message: '',
      username: '',
      phone: '',
      userErr: '',
      phoneErr: '',
      postData: [],
      flag: false,
      filesArr: [],
      radio: ''
    }
  },
  methods: {
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    delImg(index) {
      if (isNaN(index) || index >= this.postData.length) {
        return false
      }
      this.postData = this.postData.filter((item, i) => {
        return i !== index
      })
    },
    onRead(file, detail) {
      this.postData.push(file)
      this.filesArr.push(file.file)
      console.log(this.postData)
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
    testuser() {
      if (!this.username) {
        this.userErr = '请填写联系人'
        this.flag = false
      } else {
        this.flag = true
        this.userErr = ''
      }
    },
    sublitComent() {
      let formData = new FormData()
      formData.append('username', this.username)
      formData.append('mobile', parseInt(this.phone))
      formData.append('address', this.address)
      formData.append('comment', this.message)
      formData.append('type', this.radio)
      for (let i = 0; i < this.filesArr.length; i++) {
        formData.append('file[]', this.filesArr[i])
      }
      if (this.flag) {
        submitResult(formData).then(res => {
          if (res === 1) {
            this.$toast.loading({
            mask: true,
            duration: '1000',
            message: '反馈成功'
             })
          setTimeout(() => {
            this.$router.go(0)
          }, 500)
          }
        })
      }
    },
    ToLocation() {
      this.$router.push({
        path: '/comment/place'
      })
    }
  },
   watch: {
    $route(to, from) {
     if(from.name === 'place') {
       this.address = this.$route.params.address
     }
    }
  }
}
</script>
<style>
.comment {
  height: 100%;
  background: #ebedf0;
}
.comment .comment-form {
  background: #ebedf0;
  padding: 10px 0;
}
.comment .comment-form .form-label {
  margin: 10px;
  font-size: 0.9em;
  color: #323233;
}
.comment .van-radio {
  display: inline-block;
}
.comment .van-nav-bar .van-icon{
  color: black;
}
.comment .van-nav-bar__text {
  color: black;
}
.comment .van-field__right-icon {
  color: #07c160;
}
.comment .upload{
  height: 5em;
}
.comment .upload .upload-photo {
  text-align: left;
  padding-left: 1em;
  border: 1px solid #ebedf0;
}
.comment .submit-btn {
  text-align: center;
  padding: 2em 0;
  background: #ebedf0;
}
.comment [class*=van-hairline]::after {
  border: none;
}

</style>


