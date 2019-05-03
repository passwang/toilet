<template>
   <div class="comment">
     <van-nav-bar
        title="卫生间问题反馈"
      />
      <van-cell-group>
         <van-field v-model="address"   label="故障地点" placeholder="请选择您想反馈的卫生间地点" right-icon="location-o" @click-right-icon="ToLocation"/>
        <van-field v-model="message"   label="问题" type="textarea" placeholder="请输入您想反馈的卫生间问题" rows="1" autosize/>
        <!-- 暂时做成自定位 -->
        <div class="upload van-cell van-field">
          <div class="van-cell__title van-field__label">上传照片最多3张</div>
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
      filesArr: []
    }
  },
  methods: {
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
      formData.append('phone', this.phone)
      formData.append('address', this.address)
      formData.append('desc', this.message)
      for (let i = 0; i < this.filesArr.length; i++) {
        formData.append('file[]', this.filesArr[i])
      }
      if (this.flag) {
        submitResult(formData).then(res => {
          if (res === 1) {
            this.$toast.success('成功反馈')
            setTimeout(() => {
              this.$router.go(0)
            }, 200)
          }
        })
      }
    },
    ToLocation() {
      let _self = this
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //  是否使用高精度定位，默认:true
          timeout: 10000,          //  超过10秒后停止定位，默认：5s
          buttonPosition: 'RB',   //  定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),  //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //  定位成功后是否自动调整地图视野到定位点
        })
        geolocation.getCurrentPosition(function(status, result) {
          if (status === 'complete') {
            console.log(result)
            _self.address = result.formattedAddress
          } else {
            // 定位失败
            _self.$toast('定位失败,请稍后再试')
          }
        })
      })
    }
  }
}
</script>
<style>
.comment {
  height: 100%;
  background: #ebedf0;
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
  margin: 2em 0;
}
.comment [class*=van-hairline]::after {
  border: none;
}

</style>


