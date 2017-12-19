<style lang="less">
  .appFade-enter-active, .appFade-leave-active {
    transition: all .5s ease;
    overflow: hidden;
    visibility: visible;
    opacity: 1;
  }
  .appFade-leave-active {
    display: none;
  }
  .appFade-enter, .appFade-leave-to {
    opacity: 0;
    visibility: hidden;
  }
</style>



<template>
  <div id="gmSystem"> 
    <transition name="appFade">
       <router-view></router-view>
    </transition> 
  </div>
</template>

<script>
export default {
  data() {
      return {}
  }
}
</script>



