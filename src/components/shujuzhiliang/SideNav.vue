<template>
  <div class="shujuzhiliang-nav">
    <i-col span="3">
      <Menu active-name="multiple" width="auto" :open-names="['1','2','3','4', '5']">
        <div class="ivu-menu-submenu-title" @click="clickFn('collectList')">        
          <span>数据质量监控</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('collectionTaskList')">        
          <span>数据采集</span>
        </div>
        <div class="ivu-menu-submenu-title" @click="clickFn('syncTaskList')">        
          <span>数据同步</span>
        </div>
         </Menu>
    </i-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
       clickFn: function (name) {
         console.log(name);
        this.$router.push('/main/shujuzhiliang/' + name);
      
    },
    },
  mounted: function () {
      this.$router.push('/main/shujuzhiliang/collectList');
      // this.$router.push('/main/shujuzhiliang/collectionTaskList');
    }
  }
</script>



<style lang="less">
 .ivu-menu .ivu-menu-light .tivu-menu-vertical{
    background-color: #41b0ff;
  }
</style>