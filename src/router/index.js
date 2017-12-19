import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '../components/Login.vue'

//入口
import main from '../components/Main.vue'

//主页
import home from '../components/home/home.vue';

//数据交换
import dataexchange from '../components/dataexchange/Index.vue'

//数据质量监控
import shujuzhiliang from '../components/shujuzhiliang/index.vue'

//采集任务列表
import collectiontask from '../components/dataexchange/CollectionTaskList.vue'

//同步任务列表
import synctask from '../components/dataexchange/SyncTaskList.vue'

//采集日志列表
import collectionlog from '../components/dataexchange/CollectionLogList.vue'

//同步日志列表
import synclog from '../components/dataexchange/SyncLogList.vue'

//下载列表
import weatherProdDownload from '../components/dataexchange/WeatherProdDownloadTask.vue'

//下载日志列表
import weatherProdDownloadLog from '../components/dataexchange/WeatherProdDownloadLog.vue'

//数据接收管理
import dataReceiveManage from '../components/dataexchange/DataReceiveManage.vue'

//数据管理
import datamanage from '../components/datamanage/Index.vue'

//数据处理
import datahandle from '../components/datahandle/Index.vue'

//历史数据统计分析
import historyDataQuery from '../components/datahandle/historyDataQuery.vue'

//数据共享
import datashare from '../components/datashare/Index.vue'

//报表统计查询
import statandquery from '../components/statandquery/Index.vue'

//自动站实时查询
import districtInstQuery from '../components/statandquery/StationInstQuery.vue'

//时极值统计
import districtHourextremum from '../components/statandquery/HourExtremum.vue'

//日极值统计
import districtDayextremum from '../components/statandquery/DayExtremum.vue'

//单站多时对比
import stationHoursCompare from '../components/statandquery/StationHoursCompare.vue'

//单站多日对比
import stationDaysCompare from '../components/statandquery/StationDaysCompare.vue'

//单站多日小时极值对比
import stationDaysHoursCompare from '../components/statandquery/StationDaysHoursCompare.vue'

//时段雨量统计
import rainInstIntervalStatics from '../components/statandquery/rainInstIntervalStatics.vue'

//雨滑动统计查询
import rainStatQuery from '../components/statandquery/rainStatQuery.vue'

//风滑动统计查询
import windStatQuery from '../components/statandquery/windStatQuery.vue'

//镇街雨量实况统计查询
import streetRainInstStatQuery from '../components/statandquery/streetRainInstStatQuery.vue'

//镇街风力实况统计查询
import streetWindInstStatQuery from '../components/statandquery/streetWindInstStatQuery.vue'

//自动站风数据统计查询
import windInstQuery from '../components/statandquery/WindInstQuery.vue'

//镇街代表站统计
import streetStationStats from '../components/statandquery/streetStationStats.vue'

//能见度统计
import visStatQuery from '../components/statandquery/visStatQuery.vue'

//备份任务
import dataBackupTask from '../components/datamanage/BackupTask.vue'

//备份日志
import backupLog from '../components/datamanage/BackupLog.vue'

//警戒值列表
import dataWarnValueList from '../components/datamanage/WarningValue.vue'

//webapi列表
import webapiInterface from '../components/datashare/WebApiInterfaceList.vue'

//有效ip列表
import validRegister from '../components/datashare/validRegister.vue'

//用户服务列表
import userService from '../components/datashare/userService.vue'
//数据可视化
import datavisual from '../components/datavisual/datavisual.vue'

//大气电场列表
import aef from '../components/statandquery/aefStatQuery.vue'

//系统管理
import sysmanage from '../components/systemmanger/Index.vue'

//用户管理
import usermanage from '../components/systemmanger/UserManage.vue'

//角色管理
import rolemanage from '../components/systemmanger/RoleManage.vue'

//紫外线统计
import ultravioletStatQuery from '../components/statandquery/ultravioletStatQuery.vue'

//环境生活指数
import livingIndexQuery from '../components/statandquery/livingIndexQuery.vue'

//预报数据查询
import forecastQuery from '../components/statandquery/forecastQuery.vue'

//年最大10分钟风速
import yearMax10minWind from '../components/statandquery/yearMax10minWind.vue'

//月最大10分钟风速
import monthMax10minWind from '../components/statandquery/monthMax10minWind.vue'

//月平均10分钟风速
import monthAvg10minWind from '../components/statandquery/monthAvg10minWind.vue'

//旬平均10分钟风速
import xunAvg10minWind from '../components/statandquery/xunAvg10minWind.vue'

//年最大2分钟风速
import yearMax2minWind from '../components/statandquery/yearMax2minWind.vue'

//月最大2分钟风速
import monthMax2minWind from '../components/statandquery/monthMax2minWind.vue'

//月平均2分钟风速
import monthAvg2minWind from '../components/statandquery/monthAvg2minWind.vue'

//旬平均2分钟风速
import xunAvg2minWind from '../components/statandquery/xunAvg2minWind.vue'

//年平均日温度
import yearAvgTemp from '../components/statandquery/yearAvgTemp.vue'

//年最低日温度
import yearMinTemp from '../components/statandquery/yearMinTemp.vue'

//年最高日温度
import yearMaxTemp from '../components/statandquery/yearMaxTemp.vue'

//月平均日温度
import monthAvgTemp from '../components/statandquery/monthAvgTemp.vue'

//月最低日温度
import monthMinTemp from '../components/statandquery/monthMinTemp.vue'

//年最高日温度
import monthMaxTemp from '../components/statandquery/monthMaxTemp.vue'

//年雨量统计
import yearRain from  '../components/statandquery/yearRain.vue'

//月雨量统计
import monthRain from  '../components/statandquery/monthRain.vue'

//旬雨量统计
import xunRain from '../components/statandquery/xunRain.vue'

//旬平均气温统计
import xunAvgTemp from '../components/statandquery/xunAvgTemp.vue';

//数据质量监控
import collectList from '../components/shujuzhiliang/collectList.vue';

//数据质量监控的数据采集
import collectionTaskList from '../components/shujuzhiliang/collectionTaskList.vue';

//数据质量监控的同步
import syncTaskList from '../components/shujuzhiliang/syncTaskList.vue';

//风力图统计
import monthAvgtu from '../components/statandquery/monthAvgtu.vue';




Vue.use(Router)

export const router= new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: login,
      children: []
    },
    {
      path: '/main',
      component: main,
      children:[{
        path: 'sysmanage',
        component: sysmanage,
        children:[{
          path: 'usermanage',
          component: usermanage
        },{
          path: 'rolemanage',
          component: rolemanage
        }]
        },{
        path: 'home',
        component: home
        },
      // 数据交换
        {
        path:'dataexchange',
        component: dataexchange,
        children:[{
          path: 'collectionTaskList',
          component: collectiontask
        },{
          path: 'syncTaskList',
          component: synctask
        },{
          path: 'collectionLogList',
          component: collectionlog
        },{
          path: 'syncLogList',
          component: synclog
        },{
          path: 'weatherFileDownloadTask',
          component: weatherProdDownload
        },{
          path: 'weatherFileDownloadLog',
          component: weatherProdDownloadLog
        },{
          path: 'dataReceiveManage',
          component: dataReceiveManage
        },
        {
          path: 'dataWarnValueList',
          component: dataWarnValueList     
        },
        {
          path: 'backupLog',
          component: backupLog
        },
        {
            path: 'historyDataQuery',
            component: historyDataQuery
        }
      ]
      },
      

      {
        path:'datamanage',
        component: datamanage,
        children:[{
          path: 'dataBackupTask',
          component: dataBackupTask
        },{
          path: 'backupLog',
          component: backupLog
        }
      ]
      }, {
        path:'datahandle',
        component: datahandle,
        children:[]
      }, {
        path:'datashare',
        component: datashare,
        children:[{
          path: 'webapiInterface',
          component: webapiInterface
        },{
          path: 'validRegister',
          component: validRegister
        },{
          path: 'userService',
          component: userService
        }]
      }, 
      // 统计分析
      
      {
        path:'statandquery',
        component: statandquery,
        children:[{
          path: 'districtInstQuery',
          component: districtInstQuery
        },{
          path: 'districtHourExtremumQuery',
          component: districtHourextremum
        },{
          path: 'districtDayExtremumQuery',
          component: districtDayextremum
        },{
          path: 'stationHoursCompare',
          component: stationHoursCompare
        },{
            path: 'stationDaysCompare',
            component: stationDaysCompare
        },{
            path: 'stationDaysHoursCompare',
            component: stationDaysHoursCompare
        },{
            path: 'rainInstIntervalStatics',
            component: rainInstIntervalStatics
        },{
            path: 'rainStatQuery',
            component: rainStatQuery
        },{
            path: 'windStatQuery',
            component: windStatQuery
        },{
            path: 'streetRainInstStatQuery',
            component: streetRainInstStatQuery
        },{
            path: 'streetWindInstStatQuery',
            component: streetWindInstStatQuery
        },{
            path: 'windInstQuery',
            component: windInstQuery
        },{
            path: 'streetStationStats',
            component: streetStationStats
        },{
          path: 'aefStatQuery',
          component: aef
        },{
          path:'visStatQuery',
          component:visStatQuery
        },{
          path:'ultravioletStatQuery',
          component:ultravioletStatQuery
        },{
          path:'livingIndexQuery',
          component:livingIndexQuery
        },{
          path:'forecastQuery',
          component:forecastQuery
        },{
          path:'yearMax10minWind',
          component:yearMax10minWind
        },{
          path:'monthMax10minWind',
          component:monthMax10minWind
        },{
          path:'monthAvg10minWind',
          component:monthAvg10minWind
        },{
          path:"xunAvg10minWind",
          component:xunAvg10minWind
        },{
          path:"yearMax2minWind",
          component:yearMax2minWind
        },{
          path:"monthMax2minWind",
          component:monthMax2minWind
        },{
          path:"monthAvg2minWind",
          component:monthAvg2minWind
        },
        // 风力图
        {
          path:"monthAvgtu",
          component:monthAvgtu
        },
        {
          path:"xunAvg2minWind",
          component:xunAvg2minWind
        },{
          path:"yearAvgTemp",
          component:yearAvgTemp
        },{
          path:"yearMinTemp",
          component:yearMinTemp
        },{
          path:"yearMaxTemp",
          component:yearMaxTemp
        },{
          path:"monthAvgTemp",
          component:monthAvgTemp
        },{
          path:"monthMinTemp",
          component:monthMinTemp
        },{
          path:"monthMaxTemp",
          component:monthMaxTemp
        },{
          path:"xunAvgTemp",
          component:xunAvgTemp
        },{
          path:"yearRain",
          component:yearRain
        },{
          path:"monthRain",
          component:monthRain
        },{
          path:"xunRain",
          component:xunRain
        }]
      },
      // 数据质量管理
      {
        path:"shujuzhiliang",
        component:shujuzhiliang,
        children:[
          {path:"collectList",component:collectList},
          {path:"collectionTaskList",component:collectionTaskList},
          {path:"syncTaskList",component:syncTaskList}
        ]
      },
      {
        path: 'datavisual',
        component: datavisual,
      }]
    }
  ]
});

