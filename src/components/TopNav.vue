<!-- 顶部导航栏 -->
<style lang="less" scoped>
    @import url("../../static/less/color.less");
    .topNav {
        background: url('../../static/image/top/top_02.png');
        background-size: cover;

        .logo {
            float: left;
            height: 63px;
            color: #fff;
            vertical-align: middle;
            img {
                width: 100%;
                margin-top: 6px;
                vertical-align: middle;
            }
        }
        .funcBtn {
            float: right;

            .ivu-menu {

                background: none;

                .ivu-menu-item {

                    padding: 0 5px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #fff;

                    &.ivu-menu-item-active,
                    &.ivu-menu-item-selected {
                        color: @yellow;
                        border-bottom: 3px solid @yellow;
                    }

                    &:hover {
                        color: @yellow;
                    }
                }



                .ivu-menu-submenu {
                    padding: 0 5px;

                    .ivu-select-dropdown {

                        .ivu-menu-item {
                            padding: 8px 4px;
                        }
                    }
                }
            }
        }

        /* 定义blink类*/
        .blink {
            animation: blink 3s linear infinite;
            /* 其它浏览器兼容性前缀 */
            -webkit-animation: blink 3s linear infinite;
            -moz-animation: blink 3s linear infinite;
            -ms-animation: blink 3s linear infinite;
            -o-animation: blink 3s linear infinite;
        }

        /* 定义keyframe动画，命名为blink */
        @keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            50.01% {
                opacity: 0;
            }
            /* 注意这里定义50.01%立刻透明度为０，可以设置闪烁效果 */
            100% {
                opacity: 0;
            }
        }

        /* 添加兼容性前缀 */
        @-webkit-keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            50.01% {
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }

        @-moz-keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            50.01% {
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }

        @-ms-keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            50.01% {
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }

        @-o-keyframes blink {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            50.01% {
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }
    }
</style>


<template>
    <row>
        <i-col span="24">
            <!--头部导航栏  -->
            <div class="topNav clear">
                <div class="logo"><img src="../../static/image/top/logo_01.png" style="height: 50px" alt=""></div>
                <div class="funcBtn">
                    <Menu mode="horizontal" :theme="theme1" :active-name="pathName" @on-select="clickFn">
                        <template v-for="v in navItem">
                            <Submenu v-if="v.child" name="v.link">
                                <template slot="title">
                                    <Icon :type="v.icon"></Icon>
                                    {{v.name}}
                                </template>
                                <Menu-item v-for="i in v.child" :name="i.link">{{i.name}}</Menu-item>
                            </Submenu>
                            <Menu-item v-else :name="v.link">
                                <Icon :type="v.icon"></Icon>
                                {{v.name}}
                            </Menu-item>
                        </template>
                    </Menu>
                </div>
            </div>
        </i-col>
    </row>
</template>


<script>
    export default {
        data() {
            return {
                theme1: 'dark',
                navItem: [
                    {
                        name: '首页',
                        link: 'home',
                        icon: 'ios-paper'
                    },
                    
                    {
                        name: '统计分析',
                        link: 'statandquery',
                        icon: 'stats-bars'
                    },
                    {
                        name:'数据质量监控',
                        link:'shujuzhiliang',
                        icon:'ios-loop-strong'
                    },
                    {
                        name: '数据过程处理',
                        link: 'dataexchange',
                        icon: 'ios-loop-strong'
                    },
                    {
                        name: '数据共享',
                        link: 'datashare',
                        icon: 'android-share'
                    }, {
                        name: '数据展现',
                        link: 'datavisual',
                        icon: 'ios-location'
                    }, {
                        name: '系统管理',
                        link: 'sysmanage',
                        icon: 'settings'
                    }
                ]
            }
        },
        methods: {
            clickFn: function (name) {
                if (name === 'logout') {
                    this.removeKey('token');
                    this.removeKey('realname');
                    this.removeKey('roles');
                    this.removeKey('userid');
                    this.removeKey('username');
                    this.$router.push('/login');
                    return;
                }
                this.$router.push('/main/' + name);
            }
        },
        computed: {
            pathName: function () {
                //   console.log(this.$route);
                var path = this.$route.fullPath.replace('/main/', '');
                for (var i in this.navItem) {
                    if (path.indexOf(this.navItem[i].link) !== -1) {
                        return this.navItem[i].link;
                    }
                }
            }
        }
    }

</script>