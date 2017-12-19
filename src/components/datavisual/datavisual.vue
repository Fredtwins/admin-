<style scoped lang="less">
  @import url("../../../static/less/color.less");
  #data_visual{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    /*左边菜单样式开始*/
    .leftMenu{
      z-index: 2;
      top:130px;
      position: fixed;
      top: 130px;
      left: 0;
      width: 60px;
      border: 1px solid #6293d6;
      //background: rgb(217, 236, 253);
      background-color: white;
      border-radius: 0 5px 5px 0;
      .menu{
        font-size: 12px;
        width: 50px;
        text-align: center;
        height: 50px;
        margin: 10px 0;
        background-size: 100% 100%;
        background: url("../../../static/image/datavisual/unchoose.png");
        cursor: pointer;
        .menu_name{
          display: inline-block;
          margin-top: 30px;
        }
      }
      .menu_active {
        background: url("../../../static/image/datavisual/choose.svg");
      }

    }
    /*站点信息样式开始*/
    .station_info_box{
      position:absolute;
      top: 100px;
      left: 35%;
      z-index: 12;
      width: 600px;
      height: 600px;
      border: 1px solid #00aaff;
      background-color: white;
      .info_head{
          width: 100%;
          height:40px;
          background: @navColor;
          color: white;
          font-size: 16px;
          position: relative;
        .info_title{
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .info_close{
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            position: absolute;
            right: 0;
            top: 0px;
            cursor: pointer;
        }
        .info_close:hover{
          color: #ccc;
        }
      }
      .info_container{
        width: 100%;
        height: 100%;
        padding: 5px;

      }
      .chart{
        width: 650px;
        height: 520px;
      }
      .act_img_container {
         width: 100%;
         height: 100%;
         img{
           width: 580px;
           height: 470px;
         }
        .actuality_time{
          height: 80px;
          line-height: 80px;
          margin-top: 10px;
          position: relative;
          .timeZ{
            width: 56px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            border-radius: 50%;
            border: 1px solid #8cbe46;
            font-size: 14px;
            color: rgb(49,49,49);
            margin-top: 15px;
            float: left;
          }
          .timeS{
            float: left;
            li{
              width: 34px;
              height: 13px;
              background: rgb(123,181,43);
              float: left;
              margin-right: 1px;
              margin-top: 37px;
            }
            li:hover{
              background: rgb(85,107,47);
            }
          }
          .timeSlide{
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid rgb(123,181,43);
              position: absolute;
              top:33px;
              background: white;
          }
          .timeShow{
            width: 134px;
            height: 30px;
            position: absolute;
            line-height: 30px;
            text-align: center;
            border: 2px solid rgb(123,181,43);
            border-radius: 5px;
            font-size: 14px;
            color:rgb(49,49,49)
          }
        }
      }
    .visibility_container{
      width: 100%;
      height: 100%;
      padding: 10px;
    }
    }
  }
</style>
<template>
  <div id="data_visual">
    <base-map ref="baseMap"></base-map>
    <!--左边菜单开始-->
    <div class="leftMenu">
      <ul>
        <li v-for="item in leftMenus" class="menu" :class="{'menu_active':item.selected}" @click="chooseMenu(item)">
          <span class="menu_name">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!--左边菜单结束-->
    <!--站点信息box开始-->
    <div class="station_info_box" v-if="station_info_show">
      <div class="info_head">
          <div class="info_title">{{station_info.title}}</div>
          <div class="info_close" @click="station_info_show=false">X</div>
      </div>
      <Tabs v-if="current_station_view =='autoStation'">
        <TabPane label="雨量">
          <div class="info_container">
            <div id="rainChart" class="chart"></div>
          </div>
        </TabPane>
        <TabPane label="风速及风向">
          <div class="info_container">
            <div id="windChart" class="chart">风速图</div>
          </div>
        </TabPane>
        <TabPane label="温度">
          <div class="info_container">
            <div id="temperature_chart" class="chart">温度图</div>
          </div>
        </TabPane>
        <TabPane label="湿度">
          <div class="info_container">
            <div id="humidity_chart" class="chart">湿度图</div>
          </div>
        </TabPane>
        <TabPane label="气压">
          <div class="info_container">
            <div id="pressure_chart" class="chart">气压图</div>
          </div>
        </TabPane>
      </Tabs>
      <!--实况-->
      <div v-if="current_station_view == 'actuality'" class="act_img_container">
        <img v-bind:src="actualityImageSrc">
        <div class="actuality_time">
          <div class="timeZ">时间轴</div>
          <ul class="timeS" id="timeS">
            <li v-for="item in actualityImages" :data-url=item.url></li>
          </ul>
          <div class="timeSlide" id="timeDrag" style="left: 447px"></div>
          <!--<div class="timeShow" style="left: 43px" id="picTime">2071-10-10 14:06</div>-->
        </div>
      </div>
      <!--能见度-->
      <div v-if="current_station_view == 'visibility'" class="visibility_container">
        <div id="visi_chart" class="chart"></div>
      </div>
    </div>
    <!--站点信息box结束-->
  </div>
</template>

<script>
  import baseMap from './baseMap.vue';
  let map = null;
  let autoStationLayer = null;
  let actualityLayer = null;
  let visibilityLayer = null;
  export default {
    components: {
      'baseMap':baseMap,
    },
    data() {
      return {
        station_info_show: false,
        current_station_view:'autoStation',
        station_info:{title:''},
        leftMenus:[
          {name:'自动站',layer:'autoStationLayer',selected:false},
          {name:'实况',layer:'actualityLayer',selected:false},
          {name:'能见度',layer:'visibilityLayer',selected:false}
        ],
        autoStationList: [],
        actualityList: [],
        visibilityList: [],
        station_img_src: '',
        actualityImages:[],
        actualityImageSrc:''
      }
    },
    created() {
      /*this.$bus.on('createRainChart',this.createRainChart);
      this.$bus.on('createWindChart',this.createWindChart);
      this.$bus.on('createTemperatureChart',this.createTemperatureChart);*/
    },
    beforeDestroy() {
      /*this.$bus.off('createRainChart',this.createRainChart);
      this.$bus.off('createWindChart',this.createWindChart);
      this.$bus.off('createTemperatureChart',this.createTemperatureChart);*/
    },
    mounted() {

      map = this.$refs.baseMap.getBaseMap();
      //创建自动站layer
      autoStationLayer = this.$createFeaturesLayer('autoStation');
      map.addLayer(autoStationLayer);
      //创建实况layer
      actualityLayer = this.$createFeaturesLayer('actuality');
      map.addLayer(actualityLayer);
      //创建能见度layer
      visibilityLayer = this.$createFeaturesLayer('visibility');
      map.addLayer(visibilityLayer);
//地图单击事件监听
      map.on('singleclick',(evt) =>{
        this.displayFeatures(evt);
      })
      //初始化页面时默认勾选菜单：自动站
      this.chooseMenu(this.leftMenus[0]);
    },
    methods: {
      //选择菜单显示不同菜单内容
      chooseMenu: function (item) {
        item.selected = !item.selected;
        if(item.selected){
          switch(item.layer){
            case'autoStationLayer':
              //this.getStationInfo('自动站');
              this.station_img_src = 'static/image/datavisual/zidongzhan.svg';
              //获取站点信息
              var that = this;
              var params = {};
              params.url='gmmeteo/datacenter/station/aws';
              params.data = {searchValue:{"dist":'高明区'}};
              params.token = this.getKey('token');
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                that.$Loading.finish();
                if(res.data.code =='0000'){
                  if(res.data.result.result){
                    let data = res.data.result.result;
                    that.autoStationList = data;
                    //创建图标
                    that.changeLayerFeatures(autoStationLayer,data);
                  }
                }
              };
              this.ajaxPost(params);
              break;
            case'actualityLayer':
              this.station_img_src = 'static/image/datavisual/shikuang.svg';
              //this.getStationInfo('实况');
              var that = this;
              var params = {};
             // params.url='gmmeteo/datacenter/station/dev';
              params.url='gmmeteo/datacenter/station/camera';
              params.data = {searchValue:{}};
              params.token = this.getKey('token');
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                that.$Loading.finish();
                if(res.data.code =='0000'){
                  if(res.data.result.result){
                    let data = res.data.result.result;
                    that.actualityList = data;
                    that.changeLayerFeatures(actualityLayer,data);
                  }
                }
              };
              this.ajaxPost(params);
              break;
            case'visibilityLayer':
              //this.getStationInfo('能见度');
              this.station_img_src = 'static/image/datavisual/nengjiandu.svg';
              var that = this;
              var params = {};
              params.url='gmmeteo/datacenter/station/vis';
              params.data = {searchValue:{"territory_name" : "高明区"}};
              params.token = this.getKey('token');
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                that.$Loading.finish();
                if(res.data.code =='0000'){
                  if(res.data.result.result){
                    let data = res.data.result.result;
                    that.visibilityList = data;
                    that.changeLayerFeatures(visibilityLayer,data);
                  }
                }
              };
              this.ajaxPost(params);
              break;
          }
        }else {//没有选中，隐藏图标
          switch(item.layer){
            case'autoStationLayer':
              autoStationLayer.setVisible(false);
              break;
            case'actualityLayer':
              actualityLayer.setVisible(false);
              break;
            case'visibilityLayer':
              visibilityLayer.setVisible(false);
              break;
          }
        }

      },
      //改变地图站点图标
      changeLayerFeatures: function (layer,data) {
        layer.getSource().clear();
        layer.getSource().addFeatures(this.createFeaturesImg(data));
        layer.setVisible(true)
      },
      //创建layer 图标,return features
      createFeaturesImg: function(data) {
        let features = [];
        data.map((item) =>{
          if(item.cn){
            item.name = item.cn.substring(item.cn.indexOf('|')+1);
          }else if(item.camera_name){
            //item.name = item.DevName;
            item.name = item.camera_name;
          }
          if(item.longitude && item.latitude){
            let feature = new ol.Feature(new ol.geom.Point(ol.proj.transform([parseFloat(item.longitude),parseFloat(item.latitude)],'EPSG:4326','EPSG:3857')));
            feature.setStyle(new ol.style.Style({
              image: new ol.style.Icon({
                src: this.station_img_src
              }),
              text: new ol.style.Text({
                offsetX: 0,
                offsetY: 10,
                text: item.name,
                fill: new ol.style.Fill({
                  color: 'rgb(49,49,49)'
                })
              })
            }));
            feature.set('content',item);
            features.push(feature);
          }
        });
        return features;

      },
      //创建图表
      createCharts: function (chartObj) {
        var myChart = echarts.init(document.getElementById(chartObj.chartId));
        myChart.setOption(chartObj.option);
      },
      //雨量图
      createRainChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'rainChart';
        var xData = [];
        var yData = [];
        if(data){
          for(var i=data.length-1;i>=0;i--){
            xData.push(data[i].datetime.substring(11,13)+'时');
            yData.push(data[i].r1)
          }
        }
        chartObj.option = {
          color: ['rgb(25, 183, 207)'],
          title: {
            text:'过去12小时雨量统计图'
          },
          tooltip: {
            trigger:'axis',
            axisPointer:{
                type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}mm'
            }
          },
          series: [
            {
              type: 'bar',
              name: '雨量',
              data: yData
            }
          ]
        };
        this.createCharts(chartObj);
      },
      createWindChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'windChart';
        var xData = [];
        var yData = [];
        if(data){
          for(var i=data.length-1;i>=0;i--){
            xData.push(data[i].datetime.substring(11,13)+'时');
            var wf10 = data[i]["wf10"];
            var img_src;
            if (wf10 < 2) {
              img_src = 'image://url' + '../../../static/image/datavisual/1.svg';
            } else if (wf10 >= 2 && wf10 < 4) {
              img_src = 'image://url' + '../../../static/image/datavisual/2.svg';
            } else if (wf10 >=4  && wf10 < 6) {
              img_src = 'image://url' + '../../../static/image/datavisual/3-4.svg';
            } else if (wf10 >=6  && wf10 < 11) {
              img_src = 'image://url' + '../../../static/image/datavisual/5-6.svg';
            } else if (wf10 >=11  && wf10 < 17) {
              img_src = 'image://url' + '../../../static/image/datavisual/11-12.svg';
            } else if (wf10 >=17  && wf10 < 19) {
              img_src = 'image://url' + '../../../static/image/datavisual/17-18.svg';
            } else if (wf10 >=19  && wf10 < 23) {
              img_src = 'image://url' + '../../../static/image/datavisual/19-20.svg';
            } else if (wf10 >= 23) {
              img_src = 'image://url' + '../../../static/image/datavisual/23-24.svg';
            }
            var yDataObj = {
                symbol:img_src,
                value:data[i]["wf10"],
                symbolSize:60,
                symbolRotate:data[i]["wd10"],
                symbolOffset:[0,-30]
            };
            yData.push(yDataObj)
          }
        }
        chartObj.option = {
          //color:['#231815'],
          title: {
            text:'过去12小时风速风向'
          },
          tooltip: {
            trigger:'axis',
            //formatter:'{b}<br>{a}:{c}m/s'
            formatter:function (params) {
              var param = params[0];
              var direction = param.data.symbolRotate;
              var wd = '';
              if (direction>=0 && direction<90) {
                  wd = "东北风"
              } else if (direction>=90 && direction<180) {
                  wd = "东南风"
              } else if (direction>=180 && direction<270) {
                  wd = "西南风";
              } else {
                  wd = "西北风";
              }
              var res = '<div><p>时间：'+param.axisValue+'</p></div>';
              res = res + '<p>'+param.seriesName+':'+param.value+'</p>';
              res = res + '<p>风向:'+ wd + param.data.symbolRotate+'度</p>';
              return res;
            }
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}m/s'
            }
          },
          series: [
            {
              type: 'line',
              smooth: true,
              name: '风速',
              data: yData,
            },
          ]
        };
        this.createCharts(chartObj);
        },
      createTemperatureChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'temperature_chart';
        var xData = [];
        var yData = [];
        if(data){
            for(var i=data.length-1;i>=0;i--){
              xData.push(data[i].datetime.substring(11,13)+'时');
              yData.push(data[i].t)
            }
        }
        chartObj.option = {
          color:['#f68730'],
          title: {
            text:'过去12小时温度'
          },
          tooltip: {
            trigger:'axis',
            formatter:'{b}<br>{a}:{c}℃'
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}℃'
            },
            axisTick:{
              alignWithLabel:true,
            }
          },
          series: [
            {
              type: 'line',
              name: '温度',
              data: yData,
              label:{
                  normal: {
                      show:true,
                      formatter:'{c}℃',
                      color: 'rgb(49,49,49)',
                      position:'top',
                      distance:12
                  }
              }
            },
          ]
        };
        this.createCharts(chartObj);
      },

      //湿度表
      createHumidityChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'humidity_chart';
        var xData = [];
        var yData = [];
        if(data){
          for(var i=data.length-1;i>=0;i--){
            xData.push(data[i].datetime.substring(11,13)+'时');
            yData.push(data[i].u)
          }
        }
        chartObj.option = {
          color:['#f68730'],
          title: {
            text:'过去12小时湿度'
          },
          tooltip: {
            trigger:'axis',
            formatter:'{b}<br>{a}:{c}%'
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            min:60,
            axisLabel: {
              formatter: '{value}%'
            },
            axisTick:{
              alignWithLabel:true,
            }
          },
          series: [
            {
              type: 'line',
              name: '湿度',
              data: yData,
              label:{
                normal: {
                  show:true,
                  formatter:'{c}%',
                  color: 'rgb(49,49,49)',
                  position:'top',
                  distance:12
                }
              }
            },
          ]
        };
        this.createCharts(chartObj);
      },

      //气压图
      createPressureChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'pressure_chart';
        var xData = [];
        var yData = [];
        if(data){
          for(var i=data.length-1;i>=0;i--){
            xData.push(data[i].datetime.substring(11,13)+'时');
            yData.push(data[i].p)
          }
        }
        chartObj.option = {
          color:['#f68730'],
          title: {
            text:'过去12小时气压（hPa）'
          },
          tooltip: {
            trigger:'axis',
            formatter:'{b}<br>{a}:{c}hPa'
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            min:1010,
            axisLabel: {
              formatter: '{value}'
            },
            axisTick:{
              alignWithLabel:true,
            }
          },
          series: [
            {
              type: 'line',
              name: '气压',
              data: yData,
              label:{
                normal: {
                  show:true,
                  formatter:'{c}',
                  color: 'rgb(49,49,49)',
                  position:'top',
                  distance:14
                }
              }
            },
          ]
        };
        this.createCharts(chartObj);
      },
      createVisiChart:function (data) {
        var chartObj = {};
        chartObj.chartId = 'visi_chart';
        var xData = [];
        var yData = [];
        if(data){
          for(var i=data.length-1;i>=0;i--){
            xData.push(data[i].datetime.substring(11,13)+'时');
            yData.push(data[i].vis)
          }
        }
        chartObj.option = {
          title: {
            text:'过去12小时能见度'
          },
          tooltip: {
            trigger:'axis',
            axisPointer:{
              type: 'shadow'
            }
          },
          grid: {
              left:'12%'
          },
          xAxis: {
            type: 'category',
            data: xData,
            axisTick:{
              alignWithLabel:true,
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}(m)'
            }
          },
          series: [
            {
              type: 'line',
              smooth:true,
              name: '能见度',
              data: yData,
              itemStyle:{
                  normal:{
                      color: new echarts.graphic.LinearGradient(
                          0,0,0,1,
                          [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#2378f7'},
                        {offset: 0.7, color: '#2378f7'},
                        {offset: 1, color: '#83bff6'}
                      ]
                    )
                  }
              }
            }
          ]
        };
        this.createCharts(chartObj);
      },
      //遍历地图features
      displayFeatures: function(evt) {
        var that = this;
        let features = [];
        let layerNames= [];
        map.forEachFeatureAtPixel(evt.pixel,function(feature,layer){
          features.push(feature);
          if(layer){
            layerNames.push(layer.get('name')==null?"":layer.get('name'));
          }
        });
        if(features.length >0){
          var that = this;
          var station_name = '';
          var params = {};
          var data = [];
          switch(layerNames[0]){
            case 'autoStation'://自动站
              this.station_info_show = true;
              this.current_station_view = 'autoStation';
              station_name =features[0].get('content').cn;
              this.station_info.title = station_name;
              params.url = 'gmmeteo/datacenter/stationinstquery/list';
              params.token = this.getKey('token');
              params.data = {"page":1,"pageSize":"12","order" : {"datetime":-1},"searchValue":{"minute" : 0, "second" : 0,"station_name":station_name}}
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                that.$Loading.finish();
                if(res.data.code == '0000'){
                  data = res.data.result.result;
                  console.log(data)
                  that.createRainChart(data);
                  that.createWindChart(data);
                  that.createTemperatureChart(data);
                  that.createHumidityChart(data);
                  that.createPressureChart(data);
                }
              }
              this.ajaxPost(params);
              break;
            case 'actuality':
              this.station_info_show = true;
              this.current_station_view = 'actuality';
              station_name=features[0].get('content').name;
              this.station_info.title = station_name+'实况图';
              params.url = 'gmmeteo/datacenter/picturelog/list';
              params.token = this.getKey('token');
              params.data = {
                "page":1,
                "pageSize":12,
                "order":{"createdt":-1, "filename":-1},
                "searchValue":{"station_name" :station_name}
              };
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                  if(res.data.code =='0000'){
                    that.actualityImages = res.data.result.result;
                    console.log(that.actualityImages)
                    that.actualityImageSrc = that.actualityImages[11].url;
                  }

              }
              this.ajaxPost(params);
              setTimeout(function () {
                that.timeChange();
              },50)

              break;
            case 'visibility':
              this.station_info_show = true;
              this.current_station_view = 'visibility';
              station_name=features[0].get('content').name;
              this.station_info.title = station_name+'能见度';
              params.url = 'gmmeteo/datacenter/vis/list';
              params.token = this.getKey('token');
              params.data = {"page":1, "pageSize":"12", "order":{"datetime":-1}, "searchValue":{"minute" : 0, "second" : 0, "station_name":station_name}};
              params.data.system_id = parameters.system_id;
              params.success = function (res) {
                that.$Loading.finish();
                if(res.data.code =='0000'){
                    data = res.data.result.result;
                    that.createVisiChart(data)
                }

              }
              this.ajaxPost(params);

              break;
          }
        }
      },
      //时间轴
      timeChange: function () {
          var that = this;
        //var picTimeLeft=$('#picTime').css('left');
        var left = '';
        var timeDragLeft = '';
        $('#timeS li').on('mouseover',function () {
            left = ($(this).index()+1)*35+9;
           // picTimeLeft=$('#picTime').css('left');
            timeDragLeft = ($(this).index())*35+62;
           // $('#picTime').css('left',left+'px');
            $('#timeS li').on('mouseout',function () {
               // $('#picTime').css('left',picTimeLeft);
          })
        }).mouseout(function () {
            //$('#picTime').css('left',picTimeLeft);
        }).click(function () {
            //$('#picTime').css('left',left+'px');
            $('#timeDrag').css('left',timeDragLeft);
            $('#timeS li').off('mouseout');
            that.actualityImageSrc = $(this).attr('data-url');
            console.log($(this).attr('data-url'));

        })
      }
    }
  }
</script>

