<template>
  <div class="read">
    <div class="readList">
      <form action="/">
          <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              @search="onSearch"
              @cancel="onCancel"
          />
      </form>
      <van-tabs v-model="active" @click="onClick" animated  v-show="visible">
          <van-tab v-for="item in title" :key="item.id">
              <div slot="title">
              <van-icon :name="item.icon" style="vertical-align: text-bottom"/>
                {{item.content}}
              </div>
          </van-tab>
      </van-tabs>
      <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.id" @click="selectItem(item)">
              <van-card
              :desc="item.desc"  
              :title="item.title"
              :thumb="item.img"
              />
          </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getReadList, handleSearch } from '@/apis/read.js'
export default {
  data() {
    return {
      value: '',
      list: [],
      readList: [],
      loading: false,
      finished: false,
      active: 0,
      visible: true,
      title: [{'icon': 'hot-o', 'content': '新闻', 'id': '0'}, {'icon': 'gem-o', 'content': '笑料', 'id': '1'}]
    }
  },
  created() {
    this.loadInfo()
  },
  methods: {
    onLoad() {
      // setTimeout(() => {
      //   this.loadInfo()
      //   this.loading = false
      //   if (this.list && this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    loadInfo() {
      getReadList().then(res => {
        const data = res
        const newsArray = []
        const jokArray = []
        data.forEach(item => {
          if (item.flag === '1') {
            newsArray.push(item)
          } else {
            jokArray.push(item)
          }
        })
        const dataArray = []
        dataArray.push(newsArray, jokArray)
        this.readList = dataArray
        this.list = this.readList[this.active]
      })
    },
    onSearch() {
      this.visible = false
      const params = {
        'keywords': this.value
      }
      // this.$toast.loading({
      //   mask: true,
      //   message: '加载中...',
      //   duration: '200'
      // })
      handleSearch(params).then(res => {
        const data = res[0]
        this.list = data
      })
    },
    onCancel() {
      this.visible = true
      this.list = this.readList[this.active]
    },
    onClick(index, title) {
      // this.loading = true
      this.list = this.readList[index]
      this.loading = false
    },
    selectItem(item) {
      if (!item.id) {
        this.$router.push({
          path: '/read'
        })
      } else {
        this.$router.push({
          path: `/read/detail`,
          query: { id: item.id, flag: item.flag }
        })
      }
    }
  },
  watch: {
    list(val, newVal) {
      this.list = val
    }
  }
}
</script>
<style>
.read .van-card__header {
    margin-top: 10px;
}
.read .van-card__content, .read .van-card__thumb {
    height: auto;
}
</style>
