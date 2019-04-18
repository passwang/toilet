<template>
  <div id="map" style="width:100%; height:600px">
    <div id="container" style="width:100%; height:88%"></div>
    <div id="panel"></div>
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
    let _self = this
    let promise = new Promise(function(resolve, reject) {
      _self.init()
      resolve()
    })
    promise
      .then(function() {
        _self.searchData()
        // _self.demo()
      })
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
          buttonPosition: 'RB',    //  定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20),  //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //  定位成功后是否自动调整地图视野到定位点
        })
        geolocation.getCurrentPosition(function(status, result) {
          if (status === 'complete') {
            _self.center.push(result.position.lng, result.position.lat)
          } else {
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
    searchData() {
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
          placeSearch.searchNearBy(keyWords[i], [108.90217, 34.154305], distance[i], function(status, result) {
            console.log(result)
          })
        }
      })
    }

    // callback: function(status, result) {
    //   var promise = new Promise(function(resolve, reject) {
    //     let _result = result
    //     const pois = _result.poiList.pois
    //     poisArrCopy = pois.copyWithin(0)
    //     self.num.push(poisArrCopy)
    //     //          self.listText = pois
    //     //          self.listCount = _result.poiList.count
    //     //          placeSearch.M.pageSize = 10
    //     resolve()
    //   })
    //   promise.then(function() {
    //     console.log('Resolved.')
    //     return self.demo()
    //   })
    // },
    // demo: function() {
    //   numIndex++
    //   if (numIndex > 4) {
    //     if (self.num.length > 0) {
    //       return map.clearMap() // 清除地图覆盖物
    //     }
    //   }
    // }
  }
}
</script>
<style lang="scss">
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
.footer_map_buttons {
  background: #ffffff;
  width: 100%;
  font-size: 0;
  button {
    font-size: 15px;
    background: #ffffff;
    border: none;
    width: 24%;
    display: inline-block;
    line-height: 40px;
  }
  .enroll {
    display: inline-block;
    width: 28%;
    background: #fe4a4a;
    color: #ffffff;
  }
  .active {
    color: #fe4a4a;
    /* border-top: 1px solid #fe4a4a; */
  }
}
.content {
  position: absolute;
  background: #ffffff;
  left: 0;
  top: 0;
  width: 100%;
  height: 40%;
  visibility: hidden;
  z-index: 9999;
  > .content-top {
    height: 84%;
    overflow: hidden;
    > div {
      font-size: 12px;
      line-height: 0.7rem;
      border-bottom: 1px solid #aeaeae;
      margin: 0 5%;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
    }
  }
  > .content-bottom {
    height: 10%;
    text-align: center;
    font-weight: 300;
    color: #333;
    font-size: 30px;
  }
}
.list-button {
  font-size: 12px;
  position: absolute;
  background: #ffffff;
  left: 1%;
  bottom: 8%;
  width: 20%;
  padding: 2% 0;
  height: 6%;
  z-index: 200;
  > div {
    text-align: center;
  }
}
</style>

