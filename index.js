

function aMapSearchNearBy(centerPoint, city) {
  AMap.service(["AMap.PlaceSearch"], function() {
      var placeSearch = new AMap.PlaceSearch({
          pageSize: 20,    // 每页10条
          pageIndex: 1,    // 获取第一页
          city: city      // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
      });

      // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
      // 第二个参数是经纬度，数组类型
      // 第三个参数是半径，周边的范围
      // 第四个参数为回调函数
      placeSearch.searchNearBy('', centerPoint, 200, function(status, result) {
          if(result.info === 'OK') {
              console.log(result);
              var locationList = result.poiList.pois; // 周边地标建筑列表
              // 生成地址列表html　　　　　　　　　 createLocationHtml(locationList);
          } else {
              console.log('获取位置信息失败!');
          }
      });
  });
}
aMapSearchNearBy([113.218478,23.403277], '');


// 获取URL
var search = window.location.search;
// 获取经纬度
var data = getSearchString('res', search);
// 转换为JSON
var result = JSON.parse(data)
// alert(result) 不能直接打印整个对象
var x = document.querySelector("#position")
// 正确
x.innerHTML = result.lat + "+" + result.lng
// 获取小程序传过来的位置数据包括周边、距离等
var poi_data = getSearchString('poi_data', search);
// 转换为JSON数据
var poi_data_res = JSON.parse(decodeURIComponent(poi_data))
var poi_info = document.querySelector("#poi_info")
poi_info.innerHTML = poi_data_res.pois


// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(onSuccess , onError);
//   }else{
//     alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
//   }
//   //定位数据获取成功响应

//   function  onSuccess(position){
//         // alert('纬度: '          + position.coords.latitude          + '\n' +
//         // '经度: '         + position.coords.longitude         + '\n' +
//         // '海拔: '          + position.coords.altitude          + '\n' +
//         // '水平精度: '          + position.coords.accuracy          + '\n' +
//         // '垂直精度: ' + position.coords.altitudeAccura)
//             lat=position.coords.latitude  
//             lng=position.coords.longitude 
//             _res={lat,lng}
//             // var search = window.location.search;
//             // var data = getSearchString('data', search);
//             // alert(data)
//   }
//   //定位数据获取失败响应
//   function onError(error) {
//     switch(error.code)
//     {
//       case error.PERMISSION_DENIED:
//       alert("您拒绝对获取地理位置的请求");
//       break;
//       case error.POSITION_UNAVAILABLE:
//       alert("位置信息是不可用的");
//       break;
//       case error.TIMEOUT:
//       alert("请求您的地理位置超时");
//       break;
//       case error.UNKNOWN_ERROR:
//       alert("未知错误");
//       break;
//     }
//   }

function getSearchString(key, Url) {
  var str = Url;
  str = str.substring(1, str.length);
  var arr = str.split("?");
  var obj = new Object();
  for (var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
  }
  return obj[key];
}