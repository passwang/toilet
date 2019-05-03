<template>
<<<<<<< HEAD
  <div id="map" style="width:100%; height:calc(100%)">
    <div id="container" style="width:100%; height:93%"></div>
    <div id="panel"></div>
    <!-- <van-button type="default">定位失败</van-button> -->
=======
  <div id="map" style="width:100%; height:600px">
    <div id="container" style="width:100%; height:88%"></div>
    <div id="panel"></div>
>>>>>>> 7913ac186aeafff76ab62154688e2a797d4a86e7
  </div>
</template>
<script>
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
      num: num
    }
  },
  methods: {
    init() {
      let _self = this;
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
        geolocation.getCurrentPosition(function(status, result) {
          if (status === 'complete') {
            _self.searchData(result.position.lng, result.position.lat)
          } else {
            // 定位失败
            console.log(result)
          }
        })
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
      let distance = [1000, 3000, 3000, 3000]
      placeSearchOptions = {
        // 构造地点查询类
        pageSize: 5,
        pageIndex: 1,
        city: '029', // 城市
        citylimit: true,
        map: map,
        visible: false,
        panel: 'panel',
        autoFitView: true
      }
      AMap.service('AMap.PlaceSearch', function() {
        map.clearMap() // 清除地图覆盖物
        placeSearch = new AMap.PlaceSearch(placeSearchOptions)
        for (let i = 0; i < keyWords.length; i++) {
          placeSearch.searchNearBy(keyWords[i], [lng, lat], distance[i], function(status, result) {
            console.log(result)
            const pois = result.poiList.pois
            pois.forEach(item => {
              var marker = new AMap.Marker({
                map: map,
                position: [item.location.lng, item.location.lat],
                content: '<div class="content">评分</div>'
              })
              // 根据搜索出来的结果添加marker
              // var marker = []
              // marker[i] = new AMap.Marker({
              //   position: item.location,
              //   title: item.name
              // })
              // map.add(marker[i])
              var infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -31)
              })
              infoWindow.open(map, marker.getPosition())
            })
          })
        }
      })
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
#panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
    border-bottom: solid 1px silver;
}
.content{
  position: relative;
  left: 2em;
  width: 5em;
  height: 2em;
  line-height: 2em;
  border-radius: 5px;
  background-color:#FFF;
  text-align: center;
  font-size: 0.8em;
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

