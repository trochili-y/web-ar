
  var map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 11,
    center: [116.397428, 39.90923]
});
   //初始化定位
   map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
 function onComplete(obj){
    var res = '经纬度：' + obj.position +
        '\n精度范围：' + obj.accuracy +
        '米\n定位结果的来源：' + obj.location_type +
        '\n状态信息：' + obj.info +
        '\n地址：' + obj.formattedAddress +
        '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
    console.log("当前位置信息"+res);

}

function onError(obj) {
    alert(obj.info + ',,,,' + obj.message);
    console.log(obj);
}

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
aMapSearchNearBy([118.76431,31.9844], '');


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