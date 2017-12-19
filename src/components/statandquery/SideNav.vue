<!-- 数据处理侧边栏 -->
<style lang="less">
  @import url("../../../static/less/color.less");

  .dataexchange-nav {
    .ivu-menu-light {
      color: white;
      background-color: @navBg !important;
      height: calc(~"100vh - 60px");
    }
    .ivu-menu-submenu-title {
      background-color: @navColor;
    }
    .ivu-menu-item-selected {
      color: rgb(100, 186, 255) !important;
      background-color: white;
    }
    .yellow {
      color: yellow !important;
    }
  }
</style>


<template>
  <div class="dataexchange-nav">
    <i-col span="3">
      <Menu active-name="multiple" width="auto" @on-select="clickFn">
        <Submenu name="1">
          <template slot="title">
            <!--<img src="../../../static/image/dataexchange/datasource.png" height="20" width="20" alt="">-->
            <span>实况查询</span>
          </template>
          <!--查询  -->
          <Menu-item v-for="i in nav1" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
          </MenuGroup>
        </Submenu>

        <Submenu name="1">
          <template slot="title">
            <!--<img src="../../../static/image/dataexchange/datasource.png" height="20" width="20" alt="">-->
            <span>统计分析</span>
          </template>
           <Menu-item v-for="i in na" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
          <MenuGroup title="风统计">
            <Menu-item v-for="i in navWind" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
          </MenuGroup>
          <MenuGroup title="气温统计">
            <Menu-item v-for="i in navTemp" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
          </MenuGroup>
          <MenuGroup title="雨量统计">
            <Menu-item v-for="i in navRain" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
          </MenuGroup>
        </Submenu>

        <!--其他  -->
           <Submenu name="1">
          <template slot="title">
            <!--<img src="../../../static/image/dataexchange/datasource.png" height="20" width="20" alt="">-->
            <span>其他</span>
          </template>
         <Menu-item v-for="i in nav3" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
            </Menu-item>
        </Submenu>

      </Menu>
    </i-col>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        nav1: [{
          name: '自动站实时查询',
          link: "districtInstQuery"
        }, {
          name: '时极值统计查询',
          link: "districtHourExtremumQuery"
        }, {
          name: "日极值统计查询",
          link: "districtDayExtremumQuery"
        }, {
          name: "单站多时对比查询",
          link: "stationHoursCompare"
        }, {
            name: "单站多日对比查询",
            link: "stationDaysCompare"
        }, {
            name: "单站多日小时极值对比查询",
            link: "stationDaysHoursCompare"
        }/*,{
          name: "大气电场统计查询",
          link: "aefStatQuery"
        }*/,
         {
          name: "镇街代表站查询",
          link: "streetStationStats"
        },
        {
          name: "能见度查询",
          link: "visStatQuery"
        },
          /*,{
          name: "单站多时极值对比查询",
          link: "stationHoursExtremumCompare"
        }, {
          name: "雨量实况查询",
          link: "rainInstQuery"
        }*/
        ],
        na:[
          {name:"风力图统计",link:"monthAvgtu"}
        ],
        navWind: [
          {
            name: '年最大10分钟风速统计',
            link: "yearMax10minWind"
          },{
            name: '年最大2分钟风速统计',
            link: "yearMax2minWind"
          },{
            name: '月最大10分钟风速统计',
            link: "monthMax10minWind"
          },{
            name: '月平均10分钟风速统计',
            link: "monthAvg10minWind"
          },{
            name: '月最大2分钟风速统计',
            link: "monthMax2minWind"
          },{
            name: '月平均2分钟风速统计',
            link: "monthAvg2minWind"
          },{
            name: '旬平均2分钟风速统计',
            link: "xunAvg2minWind"
          },{
            name: '旬平均10分钟风速统计',
            link: "xunAvg10minWind"
          }],
        navTemp:[{
          name: '年平均日温度统计',
          link: "yearAvgTemp"
        },{
          name: '年最低日温度统计',
          link: "yearMinTemp"
        },{
          name: '年最高日温度统计',
          link: "yearMaxTemp"
        },{
          name: '月平均日温度统计',
          link: "monthAvgTemp"
        },{
          name: '月最低日温度统计',
          link: "monthMinTemp"
        },{
          name: '月最高日温度统计',
          link: "monthMaxTemp"
        },{
          name: '旬平均温度统计',
          link: "xunAvgTemp"
        }],
        navRain:[{
          name:'年雨量统计',
          link:'yearRain'
        },{
          name:'月雨量统计',
          link:'monthRain'
        },{
          name:'旬雨量统计',
          link:'xunRain'
        }],
        nav3:[
          {
          name: "雨滑动统计查询",
          link: "rainStatQuery"
        }, {
          name: "风滑动统计查询",
          link: "windStatQuery"
        }, {
          name: "镇街雨量实况查询",
          link: "streetRainInstStatQuery"
        }, {
          name: "镇街风力实况查询",
          link: "streetWindInstStatQuery"
        },{
          name: "环境生活指数查询",
          link: "livingIndexQuery"
        },{
          name: "预报数据查询",
          link: "forecastQuery"
        },
        {
          name:"时段雨量查询",
          link: "rainInstIntervalStatics"
        },

        {
          name: "紫外线查询",
          link: "ultravioletStatQuery"
        },
        ]

      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/statandquery/' + name);
      }
    },
    mounted: function() {
      //this.$router.push('/main/statandquery/districtInstQuery');
    }
  }
</script>
