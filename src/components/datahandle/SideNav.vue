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
      color: @color !important;
    }
  }
</style>


<template>
  <div class="dataexchange-nav">
    <i-col span="3">
      <Menu active-name="multiple" width="auto" :open-names="['1']"  @on-select="clickFn">
        <Submenu name="1">
          <template slot="title">
            <!--<img src="../../../static/image/dataexchange/log.png" v-if="history1" height="20" width="20" alt="">
            <img src="../../../static/image/dataexchange/log1.png" v-if="history2" height="20" width="20" alt="">-->
            <span>历史资料分析</span>
          </template>
          <Menu-item v-for="i in nav1" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}
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
               name: '历史资料统计分析列表',
               link: "historyDataQuery"
        }],
        nav2: [],
        observation1: false,
        observation2: true,
        history1: true,
        history2: false
      }
    },
    methods: {
      clickFn: function (name) {
        this.$router.push('/main/datahandle/' + name);
        if (this.isInArray(this.nav1, name)) {
          this.observation1 = false;
          this.observation2 = true;
          this.history1 = true;
          this.history2 = false;
          return;
        }
        if (this.isInArray(this.nav2, name)) {
          this.observation1 = true;
          this.observation2 = false;
          this.history1 = false;
          this.history2 = true;
          return;
        }
      }
    },
    mounted: function() {
      this.$router.push('/main/datahandle/historyDataQuery');
    }
  }
</script>
