<!-- 综合管理侧边栏 -->
<style lang="less">
  @import url("../../../static/less/color.less");

  .dataexchange-nav {
    .ivu-menu-light {
      color: @color;
      background-color: @color !important;
      height: calc(~"100vh - 60px");
    }
    .ivu-menu-submenu-title {
      background-color: @navColor;
    }
    .ivu-menu-submenu-title:hover {
      color: @color;
      background-color: @color;
    }
    .ivu-menu-item-selected {
      color: rgb(100, 186, 255) !important;
      background-color: @color;
    }
    .yellow {
      color: yellow !important;
    }
  }
  

  
</style>


<template>
  <div class="dataexchange-nav">
    <i-col span="3">
      <Menu active-name="multiple" width="auto" :open-names="['1','2','3','4', '5']" @on-select="clickFn">
        
        <!--数据交换  -->   
        <div class="ivu-menu-submenu-title" >        
          <span>任务</span>
        </div>
         <Submenu name="2">
          <template slot="title">
            <img src="../../../static/image/dataexchange/mission.svg" height="20" width="20" alt="">
            
            <span>日常数据处理</span>
          </template>
          <Menu-item v-for="i in nav1" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
          </Menu-item>
        </Submenu>

        <Submenu name="2">
          <template slot="title">
            <img src="../../../static/image/dataexchange/log.svg" v-if="log" height="20" width="20" alt="">
           
            <span>历史数据处理</span>
          </template>
          <Menu-item v-for="i in nav3" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
          </Menu-item>
        </Submenu>

        <!--二：日志  -->
         <Submenu name="2">
          <template slot="title">           
            <span>日志</span>
          </template>
          <Menu-item v-for="i in nav2" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
          </Menu-item>
        </Submenu>
        
        <!--三：业务部门数据接收  -->
        <div class="ivu-menu-submenu-title" @click="clickFn('dataReceiveManage')">
          <span>业务部门数据接收</span>
        </div>
        
        <!--四、数据预警阀值  -->
        <div class="ivu-menu-submenu-title" @click="clickFn('dataWarnValueList')">
          <span>数据预警阀值</span>
        </div>

      </Menu>
    </i-col>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        // 数据交换里面的
        // 日常数据
        nav1: [
          {
          name: "气象产品更新",
          link: "weatherFileDownloadTask"
        }],
        // 日志
        nav2: [{
          name: '采集日志',
          link: "collectionLogList"
        }, {
          name: "同步日志",
          link: "syncLogList"
        }, {
          name: "气象产品更新日志",
          link: "weatherFileDownloadLog"
        },{
          name:"数据备份日志",
          link:"backupLog"
        }
        ],
      // 历史数据
      nav3:[{
        name:'历史数据',
        link:"historyDataQuery"
      }],


        task: false,
        task1: true,
        log: true,
        log1: false,
        received: true,
        received1: false
      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/dataexchange/' + name);
        if (this.isInArray(this.nav1, name)) {
          this.task = false;
          this.task1 = true;
          this.log = true;
          this.log1 = false;
          this.received = true;
          this.received1 = false;
          return;
        }
        if (this.isInArray(this.nav2, name)) {
          this.task = true;
          this.task1 = false;
          this.log = false;
          this.log1 = true;
          this.received = true;
          this.received1 = false;
          return;
        }
        if (name === 'dataReceiveManage') {
          this.task = true;
          this.task1 = false;
          this.log = true;
          this.log1 = false;
          this.received = false;
          this.received1 = true;
          return;
        }
      }
    },
    mounted: function () {
      this.$router.push('/main/dataexchange/collectionTaskList');
    }
  }

</script>