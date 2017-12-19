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
        <div class="ivu-menu-submenu-title" @click="clickFn('webapiInterface')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="shareInterface1" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="shareInterface2" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: shareInterface2}">共享接口</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('validRegister')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="validRegister1" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="validRegister2" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: validRegister2}">访问注册</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('userService')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="userService1" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="userService2" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: userService2}">用户注册</span>
        </div>
      </Menu>
    </i-col>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        shareInterface1: false,
        shareInterface2: true,
        validRegister1: true,
        validRegister2: false,
        userService1: true,
        userService2: false
      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/datashare/' + name);
        if (name === 'webapiInterface') {
          this.shareInterface1 = false;
          this.shareInterface2 = true;
          this.validRegister1 = true;
          this.validRegister2 = false;
          this.userService1 = true;
          this.userService2 = false;
          return;
        }
        if (name === 'validRegister') {
          this.shareInterface1 = true;
          this.shareInterface2 = false;
          this.validRegister1 = false;
          this.validRegister2 = true;
          this.userService1 = true;
          this.userService2 = false;
          return;
        }
        if (name === 'userService') {
          this.shareInterface1 = true;
          this.shareInterface2 = false;
          this.validRegister1 = true;
          this.validRegister2 = false;
          this.userService1 = false;
          this.userService2 = true;
          return;
        }
      }
    },
    mounted: function() {
      //this.$router.push('/main/datamanage/collectionTaskList');
    }
  }
</script>
