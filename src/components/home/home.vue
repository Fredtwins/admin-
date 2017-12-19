<style lang="less">
    @import url("../../../static/less/color.less");
    .homeChart {
        background: url("../../../static/image/home/bg.jpg");
        height: 57rem;
        .staticChart {
            width: 100%;
            height: 600px;
            margin-top: 35px;
        }
        .card1 {
            height: calc(~"(100vh - 270vh)");
            background: rgba(255, 255, 255, 0.2);
        }
        .btn {
            width: 300px;
            height: 100px;
            margin-top: 50px;
            font-size: 18px;
        }
        .box {
            border: 3px solid #ccc;
            margin: 45px 16px;
            height: 50.8rem;
            margin-left: 2rem;
        }
        .ivu-col-span-18 {
            width: 35%;
            margin-left: 15px;
        }
        .box1 {
            border: 3px solid #ccc;
            margin: 45px 2px;
            height: 28rem;
            background-color: #fff;
            /* position: relative; */
            overflow: hidden;
            .ditu {
                background-image: url('../../../static/image/home/ditu5.jpg');
                // margin: 0 auto;
                background-repeat: repeat-y;
                /* background-color:#fff;  */
                /* width: 600px;   */
                /* height: 442px;   */
                width: 58rem;
                height: 27.6rem;
                margin-left: 16rem;
                overflow: hidden;
                /* display: flex;  */
                /* margin-top:10px; */
                background-size: cover;
                background-position: -160px -155px;
                .mingcheng {
                    position: relative;
                    top: 1rem;
                    right: -22rem;
                    width: 200px;
                    height: 50px;
                    overflow: hidden;
                }
                .hecheng {
                    position: relative;
                    top: -0.5rem;
                    right: -34rem;
                    width: 200px;
                    height: 50px;
                    overflow: hidden;
                }
                .yanghe {
                    position: relative;
                    top: 10rem;
                    right: -28rem;
                    width: 200px;
                    height: 50px;
                    overflow: hidden;
                }
                .genghe {
                    position: relative;
                    top: 17.5rem;
                    left: 17rem;
                    width: 200px;
                    height: 50px;
                    overflow: hidden;
                }
            }
        }
        .box2 {
            border: 3px solid #ccc;
            margin: 45px 2px;
            height: 20rem;
            /* position: absolute; */
            /* top: 463px; */
            /* left: 540px; */
            color: black;
            ivu-table-header tr {
                background-color: #41b0ff;
            }
            th .ivu-table-cell {
                color: #000;
            }
        }
    }

    .ivu-table-row {
        height: 68px;
    }

    .wenzi {
        font-size: 13px;
        font-weight: 500;
        color: #000;
    }

    .wenzi2 {
        font-size: 13px;
        position: absolute;
        left: 2.3rem;
    }

    .wenzi3 {
        font-size: 13px;
        position: absolute;
        left: 1rem;
    }

    .wenzi4 {
        font-size: 13px;
        position: absolute;
        top: 4rem;
    }
  


    @font-face {
        font-family: 'iconfont';
        src: url('../../../static/font/iconfont.eot');
        src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
        url('../../../static/font/iconfont.woff') format('woff'),
        url('../../../static/font/iconfont.ttf') format('truetype'),
        url('../../../static/font/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 20px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
<template>
    <div class="homeChart">
        <Row>
            <!-- <div>
                <Row type="flex" justify="space-around" class="code-row-bg">
                     <col span="6">
                    <Button type="primary" @click="echart1" class="btn"><i class="iconfont">&#xe65a;</i>&nbsp;当天采集统计图表</Button>
                    </col> 
                    <col span="6">
                    <Button type="primary" @click="echart2" class="btn"><i class="iconfont">&#xe66f;</i>&nbsp;实时接口访问统计图表</Button>
                    </col>
                    <col span="6">
                    <Button type="primary" @click="echart3" class="btn"><i class="iconfont">&#xe633;</i>&nbsp;每小时用户访问量图表</Button>
                    </col>
                    <col span="6">
                    <Button type="primary" @click="echart4" class="btn"><i class="iconfont">&#xe707;</i>&nbsp;一小时内数据类型访问统计图表</Button>
                    </col>
                </Row>
            </div>  -->
            <div>
                <Row type="flex" class="code-row-bg">
                    <i-col span="8" class="box">
                        <Card class="card1" dis-hover v-show="isShow1">
                            <p slot="title">当天采集统计</p>
                            <h2 class="times" v-model="times">{{times}}</h2>
                            <div class="staticChart"></div>
                        </Card>
                        <Card dis-hover class="card1" v-show="isShow2">
                            <p slot="title">实时接口访问统计</p>
                            <div class="staticChart"></div>
                        </Card>
                        <Card dis-hover class="card1" v-show="isShow3">
                            <p slot="title">每小时用户访问量</p>
                            <div class="staticChart"></div>
                        </Card>
                        <Card dis-hover class="card1" v-show="isShow4">
                            <p slot="title">一小时内数据类型访问统计</p>
                            <div class="staticChart"></div>
                        </Card>
                    </i-col>
                    <!--左边  -->
                    <i-col span="15" class="boxx">
                        <i-col class="box1">
                            <div class="ditu">
                                <!--更合镇  -->
                                <div class="genghe">
                                    <a href="javascript:;" title="高明举世农业开发有限公司">
                                    <img  :src="her1" alt="" width="50px" height="50px">  
                                </a>
                                    <div class="wenzi">举世农业</div>
                                </div>
                                <!--杨和镇  -->
                                <div class="yanghe">
                                    <a href="javascript:;" title="高明杨梅丽堂蔬菜基地">
                                    <img :src="url2" alt="" width="50px" height="50px">
                               </a>
                                    <div class="wenzi2">丽堂</div>
                                </div>
                                <!--荷城  -->
                                <div class="hecheng">
                                    <a href="javascript:;" title="马宁泵站">
                                    <img :src="url3" alt="" width="50px" height="50px">
                                </a>
                                    <div class="wenzi3">马宁</div>
                                </div>
                                <!--明城  -->
                                <div class="mingcheng">
                                    <a href="javascript:;" title="高明云勇林场" >
                                     <img :src="url4" alt="" width="50px" height="50px"> 
                               </a>
                                    <div class="wenzi4">云勇</div>
                                </div>
                            </div>
                            <!--实况图  -->

                        </i-col>
                        <!--实况图  -->
                        <i-col class="box2">
                            <div>
                                <Table stripe :columns="theadArr" :data="dataSourceList" stripe></Table>
                            </div>
                        </i-col>
                    </i-col>
                    <!--地图  -->

                </Row>
            </div>
        </Row>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                times: '',
                // kex:xAxisDatas,
                // keyy:yAxisDatas,
                // keyy2:yAxisDatas2,
                isShow1: true,
                isShow2: false,
                isShow3: false,
                isShow4: false,
                isShow5: true,
                her1: [],
                url2: [],
                url3: [],
                url4: [],
                dataSourceList: [],
                theadArr: [

                    {
                        title: '站号',
                        key: 'station_name'
                    },
                    {
                        title: '记录时间',
                        key: 'datetime'
                    },
                    {
                        title: '气温',
                        key: 't',
                    },
                    {
                        title: '小时雨量',
                        key: 'r1h',
                    },
                    {
                        title: '风速',
                        key: 'wf10',
                    },
                    {
                        title: '风向',
                        key: 'wd10',
                    },
                    {
                        title: '湿度',
                        key: 'u',
                    },
                    {
                        title: '气压',
                        key: 'p',
                    },
                ],


            }
        },
        methods: {
            //右边实况图
            shikuang: function () {
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "/gmmeteo/datacenter/townexampleinst",
                    token: that.getKey("token"),
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        // console.log(result.data.result);
                        if (result.data.code === '0000') {
                            that.dataSourceList = result.data.result;

                        }

                    },
                    error: function (err) {

                    }
                })
            },




            // 地图数据
            qixiang: function () {
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "/gmmeteo/datacenter/townwarning",
                    token: that.getKey("token"),
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        // console.log(that.her1);
                        // console.log(result.data);
                        // console.log(result.data.result[1].code);
                        if (result.data.code === '0000') {
                            that.her1 = '../../../static/alerticons/' + result.data.result[1].code + '.png';
                            that.url2 = '../../../static/alerticons/' + result.data.result[2].code + '.png';
                            that.url3 = '../../../static/alerticons/' + result.data.result[3].code + '.png';
                            that.url4 = '../../../static/alerticons/' + result.data.result[0].code + '.png';
                            // console.log('that.her1===' + that.her1);

                        }
                        // console.log(that.her1);
                    },
                    error: function (err) {

                    }
                })
            },



            /*当天采集统计图*/
            collectionChart: function (obj) {
                let option = {};
                let myChart = echarts.init(document.getElementsByClassName("staticChart")[0]);
                var xAxisDatas = ["","","",""];
                var yAxisDatas = ["","","",""];
                var yAxisDatas2 = ["","","",""];
                for (var i = 0; i < obj.keys.length; i++) {
                    xAxisDatas.push(obj.keys[i]);
                    // console.log(obj.keys[i]);

                }
                // 实际采集的
                for (var i = 0; i < obj.actualCount.length; i++) {
                    yAxisDatas.push(obj.actualCount[i]);
                    // console.log(obj.actualCount)
                }
                // 应采集的
                for (var i = 0; i < obj.shouldCount.length; i++) {
                    yAxisDatas2.push(obj.shouldCount[i]);
                }

                option = {

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['应采数据量', '实际采集数据量'],
                        textStyle: {
                            fontSize: 16 // 用 legend.textStyle.fontSize 更改示例大小
                        },
                    },
                    grid: {
                        left: '0.2%',
                        right: '0.2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, 0],
                            position: 'bottom',

                        },
                    ],
                    yAxis: {
                        type: 'category',
                        data: xAxisDatas,
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 1,                  //这里是坐标轴的宽度
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: { show: false },
                    },
                    series: [
                        {
                            name: '应采数据量',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: '#87CEEB',
                                }
                            },
                            data: yAxisDatas2
                        },
                        {
                            name: '实际采集数据量',
                            type: 'bar',
                            // xAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                    color: '#98FB98',
                                }
                            },
                            data: yAxisDatas
                        },
                    ]
                }
                myChart.setOption(option);
                // alert(222)
                // return xAxisDatas,yAxisDatas2
                window.addEventListener("resize", function () { myChart.resize() });
            },
            loadData: function (option) {
                // console.log(option)
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "/gmmeteo/datacenter/stat/collectionresult",
                    token: that.getKey("token"),
                    //data: { "taskName": ["区域站（自动站）时极值采集", "区域站（自动站）日极值采集", "街镇最大瞬时风速采集", "区域站（自动站）最新瞬时记录采集", "大气电场记录采集", "能见度站能见度记录采集"] },
                    dataType: "json",
                    success: function (result) {
                        //console.log(result);
                        // console.log(result.data);
                        if (result.data.code === '0000') {
                            that.times = result.data.result.collectionTime;
                            that.collectionChart(result.data.result);

                        }
                    },
                    error: function (err) {

                    }
                })
            },






            /*实时访问统计图*/
            realTimeChart: function (obj) {
                let option = {};
                let realTimeChart = echarts.init(document.getElementsByClassName("staticChart")[1]);
                var xAxisDatas_01 = obj.hours
                var yAxisDatas_01 = obj.bytes;
                var yAxisDatas_02 = obj.count;
                /*console.log(obj);*/
                option = {
                    tooltip: {
                        trigger: 'axis'
                    },

                    calculable: true,
                    legend: {
                        data: ['数据大小', '数据条数'],
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisDatas_01
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine: { show: false },
                            name: '数据大小',
                            axisLabel: {
                                formatter: '{value} KB'
                            }
                        },
                        {
                            type: 'value',
                            splitLine: { show: false },
                            name: '数据条数',
                        }
                    ],
                    series: [

                        {
                            name: '数据大小',
                            type: 'line',
                            itemStyle: { normal: { color: '#98FB98' } },
                            data: yAxisDatas_01
                        },
                        {
                            name: '数据条数',
                            type: 'line',
                            yAxisIndex: 1,
                            itemStyle: { normal: { color: '#87CEEB' } },
                            data: yAxisDatas_02
                        },

                    ]
                };
                realTimeChart.setOption(option);
                window.addEventListener("resize", function () { realTimeChart.resize() });

            },
            loadData2: function (option) {
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "gmmeteo/datacenter/stat/webapilogdata",
                    token: that.getKey("token"),
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        if (result.data.code === '0000') {
                            that.realTimeChart(result.data.result);
                        }
                    },
                    error: function (err) {

                    }
                })
            },
            /*每小时用户访问量饼图*/
            visitChart: function (obj) {
                let option = {};
                let pageView = echarts.init(document.getElementsByClassName("staticChart")[2]);
                var pieDatas = [];
                for (var i = 0; i < obj.length; i++) {
                    pieDatas.push(obj[i])
                }
                /*console.log(obj);*/
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#87CEEB', '#9F79EE', '#CD9B1D', '#90EE90'],
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: pieDatas,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]

                };
                pageView.setOption(option);
                window.addEventListener("resize", function () { pageView.resize() });
            },
            loadData3: function (option) {
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "gmmeteo/datacenter/stat/webapiloguser",
                    token: that.getKey("token"),
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        if (result.data.code === '0000') {
                            that.visitChart(result.data.result);
                        }
                    },
                    error: function (err) {
                    }
                })
            },
            /*一小时数据类型访问统计图*/
            hourStatisticsChart: function (obj) {
                let option = {};
                let countChart = echarts.init(document.getElementsByClassName("staticChart")[3]);
                var pieData = [];
                for (var i = 0; i < obj.length; i++) {
                    pieData.push(obj[i])
                }
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: pieData,
                            color: ['#CD9B1D', '#36648B', '#90EE90', '#9F79EE', '#87CEEB'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                countChart.setOption(option);
                window.addEventListener("resize", function () { countChart.resize() });
            },
            loadData4: function (option) {
                var that = this;
                this.ajaxPost({
                    type: "post",
                    async: false,
                    url: "gmmeteo/datacenter/stat/webapiloginterface",
                    token: that.getKey("token"),
                    data: {},
                    dataType: "json",
                    success: function (result) {
                        /*console.log(result);*/
                        if (result.data.code === '0000') {
                            that.hourStatisticsChart(result.data.result);
                        }

                    },
                    error: function (err) {
                    }
                })
            },

            echart1: function () {
                this.loadData()
                this.isShow1 = true;
                this.isShow2 = false;
                this.isShow3 = false;
                this.isShow4 = false;



            },
            echart2: function () {
                this.loadData2()
                this.isShow2 = true;
                this.isShow1 = false;
                this.isShow3 = false;
                this.isShow4 = false;



            },
            echart3: function () {
                this.loadData3();
                this.isShow3 = true;
                this.isShow1 = false;
                this.isShow2 = false;
                this.isShow4 = false;



            },
            echart4: function () {
                this.loadData4();
                this.isShow4 = true;
                this.isShow1 = false;
                this.isShow3 = false;
                this.isShow2 = false;



            },


        },
        mounted: function () {
            this.echart1();
            this.qixiang();
            this.shikuang();
            // this.collectionChart();


        }

    }

</script>