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
        <div class="ivu-menu-submenu-title" @click="clickFn('usermanage')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="shareInterface1" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="shareInterface2" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: user2}">用户管理</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('rolemanage')">
          <!--<img src="../../../static/image/dataexchange/datasource.png" v-if="validRegister1" height="20" width="20" alt="">
          <img src="../../../static/image/dataexchange/datasource1.png" v-if="validRegister2" height="20" width="20" alt="">-->
          <span v-bind:class="{ yellow: role2}">角色管理</span>
        </div>
      </Menu>
    </i-col>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        user1: false,
        user2: true,
        role1: true,
        role2: false,
      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/sysmanage/' + name);
        if (name === 'usermanage') {
          this.user1 = false;
          this.user2 = true;
          this.role1 = true;
          this.role2 = false;
          return;
        }
        if (name === 'rolemanage') {
          this.user1 = true;
          this.user2 = false;
          this.role1 = false;
          this.role2 = true;
          return;
        }
      }
    },
    mounted: function() {
      //this.$router.push('/main/datamanage/collectionTaskList');
    }
  }
</script>
