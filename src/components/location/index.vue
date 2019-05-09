<template>
  <div id="map" style="width:100%; height:calc(100%)">
    <div id="container" style="width:100%; height:93%">
    </div>
    <van-button type="primary" class="btn" size="small" @click="handleShow">点击展开/收缩全部列表</van-button>
    <div id="panel" v-show="show"></div>
  </div>
</template>
<script>
import { filterData } from '@/apis/location'
import AMap from 'AMap'
var mapListText = []
//  var geolocation, markers
var map, placeSearch, placeSearchOptions, listCount
//  var poisArrr
var num = []
// var poisArrCopy = []
export default {
  components: {},
  mounted: function() {
    this.init()
  },
  data() {
    return {
      listCount: listCount,
      listText: mapListText,
      center: [],
      num: num,
      lng: '108.90217',
      lat: '34.154305',
      show:  false,
      data: ''
    }
  },
  methods: {
    init() {
      let _self = this
      map = new AMap.Map('container', {
        // center: [108.90217, 34.154305],
        resizeEnable: false,
        zoom: 5
      })
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //  是否使用高精度定位，默认:true
          timeout: 10000,          //  超过10秒后停止定位，默认：5s
          buttonPosition: 'RB',   //  定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),  //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //  定位成功后是否自动调整地图视野到定位点
        })
        map.addControl(geolocation)
        // geolocation.getCurrentPosition(function(status, result) {
        //   if (status === 'complete') {
        //     // 暂时固定
        //     _self.searchData(result.position.lng, result.position.lat)
        //   } else {
        //     // 定位失败
        //     console.log(result)
        //   }
        // })
        _self.searchData( _self.lng, _self.lat)
      })
      AMap.plugin(
        ['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.ToolBar'],
        function() {
          map.addControl(new AMap.ToolBar())
        }
      )
    },
    searchData(lng, lat) {
      let keyWords = ['公共厕所', '卫生间']
      let _self = this
      placeSearchOptions = {
        // 构造地点查询类
        pageSize: 5,
        pageIndex: 1,
        city: '029', // 城市
        citylimit: true,
        map: map,
        visible: true,
        panel: 'panel',
        autoFitView: true
      }
      AMap.service('AMap.PlaceSearch', function() {
        map.clearMap() // 清除地图覆盖物
        placeSearch = new AMap.PlaceSearch(placeSearchOptions)
        for (let i = 0; i < keyWords.length; i++) {
          placeSearch.searchNearBy(keyWords[i], [lng, lat], 1000, function(status, result) {
            let pois = result.poiList.pois
            const address = _self.handleData(result.poiList.pois)
            var promise = new Promise(function (resolve, reject) {
              filterData({'place': JSON.stringify(address)}).then(res => {
                // pois = pois.filter(function(item) {
                //   return res.indexOf(item.address) < 0
                // })
                resolve(res[0])
              })
            });
            promise.then(data => {
              var markers = [];
              pois.forEach((item, index) => {
                var marker = new AMap.Marker({
                  map: map,
                  position: [item.location.lng, item.location.lat],
                  content: '<div class="content">距离您' + item.distance + '米</div>'
                })
                markers.push(marker)
              })
            })
          })
        }
      })
    },
    handleShow() {
      this.show = !this.show
    },
    handleData(data) {
      const arr = [];
      data.forEach(item => {
        arr.push(item.address)
      })
      return arr
    }
  }
}
</script>

<style>

#map {
  position: absolute;
  padding: 0;
  width: 100%;
  background: #ffffff;
}
#container {
  width: 100%;
  height: 100%;
  font-size: 15px;
}
#map .btn {
   position: fixed;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    background: #07c160;
    z-index: 999;
}
#map .btn .van-button--primary {
  background: #07c160;
}
#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
    /* border-bottom: solid 1px silver; */
}
.content{
  position: relative;
  left: 2em;
  width: 10em;
  height: 2em;
  line-height: 2em;
  border-radius: 5px;
  background-color:#FFF;
  text-align: center;
  font-size: 0.8em;
  border:1px solid #ccc;
}
.content:before{
    content:"";display:block;
    border-width:5px;
    position:absolute;
    left: -8px;
    top: 2px;
    border-style:solid dashed dashed;
    border-color:  transparent #FFF transparent  transparent ;
    font-size:0;
    line-height:0;
}
.conten p{
  height: 2rem;
}
</style>

