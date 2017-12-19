<style lang="less">
    @import url("../../static/less/color.less");
    .main {
        width: 100%;
        height: 100%;

        .mainContent {
            height: calc(~"100% - 63px");
        }
    }

    .ivu-card-head {
        padding: 3px 16px!important;

        p {
            height: 28px!important;
            line-height: 28px!important;
        }
    }
</style>

<template>

    <div class="main flexColBox">
        <header class="homeHeader">
            <top-nav></top-nav>
        </header>
        <section class="mainContent relative">
            <!-- <transition name="appFade"> -->
            <router-view></router-view>
            <!-- </transition> -->
        </section>
    </div>
</template>

<script>
    import topNav from './TopNav.vue';
    //import loading from '../public/Loading.vue';

    export default {
        data () {
            return {

            };
        },
        components: {
            'top-nav': topNav,
            //'loading': loading
        }
    };
</script>
