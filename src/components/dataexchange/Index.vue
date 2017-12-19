<!-- 综合管理container -->
<style lang="less" scoped>
  @import url("../../../static/less/color.less");

</style>


<template>
  <div class="">
    <side-nav></side-nav>
    <hr>
    <router-view></router-view>
  </div>
</template>


<script>
  import sideNav from './SideNav.vue';

  export default {
    data () {
      return {

      }

    },
    components: {
      'side-nav': sideNav
    }
  }
</script>
