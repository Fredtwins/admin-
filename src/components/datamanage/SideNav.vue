<!-- 综合管理侧边栏 -->
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
        <div class="ivu-menu-submenu-title" @click="clickFn('dataWarnValueList')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="warnValue" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="warnValue1" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: warnValue1}">数据预警阀值</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('dataBackupTask')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="backupTask" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="backupTask1" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: backupTask1}">数据备份任务</span>
        </div>
        <!--<div class="ivu-menu-submenu-title" @click="clickFn('monitorList')">-->
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="monitor" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="monitor1" height="20" width="20" alt="">-->
          <!--<span v-bind:class="{ yellow: monitor1}">过程监控列表</span>-->
        <!--</div>-->
        <div class="ivu-menu-submenu-title" @click="clickFn('backupLog')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="backupLog" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="backupLog1" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: backupLog1}">数据备份日志</span>
        </div>
      </Menu>
    </i-col>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        warnValue: false,
        warnValue1: true,
        backupTask: true,
        backupTask1: false,
        monitor: true,
        monitor1: false,
        backupLog:true,
        backupLog1:false
      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/datamanage/' + name);
        if (name === 'dataWarnValueList') {
          this.warnValue = false;
          this.warnValue1 = true;
          this.backupTask = true;
          this.backupTask1 = false;
          this.monitor = true;
          this.monitor1 = false;
          this.backupLog = true;
          this.backupLog1 = false;
          return;
        }
        if (name === 'dataBackupTask') {
          this.warnValue = true;
          this.warnValue1 = false;
          this.backupTask = false;
          this.backupTask1 = true;
          this.monitor = true;
          this.monitor1 = false;
          this.backupLog = true;
          this.backupLog1 = false;
          return;
        }
        if (name === 'monitorList') {
          this.warnValue = true;
          this.warnValue1 = false;
          this.backupTask = true;
          this.backupTask1 = false;
          this.monitor = false;
          this.monitor1 = true;
          this.backupLog = true;
          this.backupLog1 = false;
          return;
        }
        if (name === 'backupLog') {
          this.warnValue = true;
          this.warnValue1 = false;
          this.backupTask = true;
          this.backupTask1 = false;
          this.monitor = true;
          this.monitor1 = false;
          this.backupLog = false;
          this.backupLog1 = true;
          return;
        }
      }
    },
    mounted: function() {
      //this.$router.push('/main/datamanage/collectionTaskList');
    }
  }
</script>
