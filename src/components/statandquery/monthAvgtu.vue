<style lang="less">
    @import url("../../../static/less/color.less");
    #main {
        margin: 0 auto;
    }
</style>
<template>
    <div class="">
        <row>
            <i-col span="21">
                <Breadcrumb class="ml32">
                    <Breadcrumb-item class="black">统计图</Breadcrumb-item>
                    <Breadcrumb-item class="blue">风力统计图</Breadcrumb-item>
                </Breadcrumb>
                <Collapse class="aa" value="1">
                    <Panel name="1">
                        条件筛选
                        <template slot="content">
                            <Form ref="formInline" :model="formInline" inline :label-width="80">
                                <Form-item label="站点名称" prop="station_name">
                                    <Select v-model="formInline.station_name" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                                </Form-item>
                                <!--查看每5分钟和1分钟的风力图  -->
                                <Form-item label="统计类型" prop="timetype">
                                    <Select v-model="formInline.time_type" clearable style="width:150px">
                    <Option value="1">2分钟风力风向</Option>
                    <Option value="2">10分钟风力风向</Option>
                  </Select>
                                </Form-item>
                                <!--选择年或月  -->
                                <Form-item label="统计范围" prop="timetype">
                                    <Select v-model="formInline.time_type" clearable style="width:150px">
                    <Option value="1">年</Option>
                    <Option value="2">月</Option>
                  </Select>
                                </Form-item>
                                <!-- 时间 -->
                                <Form-item label="时间">
                                    <Date-picker type="datetime" @on-change="datetimeChange1"></Date-picker>
                                    <!--&nbsp至&nbsp
                  <Date-picker type="datetime" v-model="timeNew" @on-change="datetimeChange2"></Date-picker>-->
                                </Form-item>

                                <Button type="primary" @click="submitSearch">搜索</Button>
                                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
                                <div class="tex" style="width:300px ">
                                    <!-- <Input  v-model="formInline.station_name" style="width: 300px"></Input>   -->
                                    <!-- {{formInline.station_name}} -->
                                    <h3 v-model="formInline.station_name">{{formInline.station_name}}</h3>
                                </div>
                            </Form>
                        </template>
                    </Panel>
                </Collapse>
                <div class="center">
                    <Table :data="dataSourceList" :columns="theadArr" stripe size="small"></Table>
                    <!-- <Page
            class="pull-right"
            :total="recordPage.total"
            :current="recordPage.current"
            size="small"
            show-total
            @on-change="changePage"
            :page-size=20
          ></Page> -->
                    <div id="main" style="width: 600px;height:400px;"></div>
                </div>
            </i-col>
        </row>
    </div>
</template>


<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                // collectionLogListUrl: 'gmmeteo/datacenter/history/monthavg2minwind',
                stationListUrl: 'gmmeteo/datacenter/awsstation/list',
                formInline: {
                    station_name: "",
                    year: "",
                    month: ""
                },
                stationList: [],
                dataSourceList: [],
                theadArr: [
                    {
                        title: "年",
                        width: 60,
                        align: 'center'
                    }, {
                        title: "静风",

                        width: 100
                    }, {
                        title: "北北东",

                    }, {
                        title: "东北",

                    }, {
                        title: "东北东",
                        //key: "avgwind",
                        //   render: (h, params) => {
                        //     return h('div', params.row.avgwind.toFixed(1));
                        //   }
                    },
                    { title: "东" },
                    { title: "东南东" },
                    { title: "东南" },
                    { title: "南南东" },
                    { title: "南" },
                    { title: "南南西" },
                    { title: "西南" },
                    { title: "西南西" },
                    { title: "西" },
                    { title: "西北西" },
                    { title: "西北" },
                    { title: "北北西" },
                    { title: "北" },

                ],
                recordPage: {
                    current: 1,
                    pageSize: 20,
                    total: 0
                }
            }
        },
        methods: {
            collatc: function () {
                var option = {};
                var myChart = echarts.init(document.getElementById('main'));
                var fengli = [11.0, 10.2, 10, 6, 10, 13, 10.5, 7, 11, 7, 8, 9, 7, 2, 7, 9];
                option = {

                    tooltip: {
                        title:'风力风向',
                        trigger: 'axis', 
                        show: true,
                    },
                    legend: {
                        selected: {
                            name: true,
                            value: true
                        },
                        x: 'center',
                        data: ['风向','风力']
                    },
                    toolbox: {
                        show: true,

                    },
                    calculable: false,
                    polar: [
                        {
                            indicator: [
                                { text: 'N', max: 20 },
                                { text: 'NNW', max: 20 },
                                { text: 'NW', max: 20 },
                                { text: 'WNW', max: 20 },
                                { text: 'W', max: 20 },
                                { text: 'WSW', max: 20 },
                                { text: 'SW', max: 20 },
                                { text: 'SSW', max: 20 },
                                { text: 'S', max: 20 },
                                { text: 'SSE', max: 20 },
                                { text: 'SE', max: 20 },
                                { text: 'ESE', max: 20 },
                                { text: 'E', max: 20 },
                                { text: 'ENE', max: 20 },
                                { text: 'NE', max: 20 },
                                { text: 'NNE', max: 20 }
                            ],
                            radius: 120
                        }
                    ],
                    series: [
                        {
                            // name: '完全实况球员数据',
                            type: 'radar',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data: [

                                {
                                    value: fengli,
                                    name: '风向'
                                }
                            ],
                            label: {
                                normal: {
                                    show: true,
                                  
                                }
                            },
                            itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: 'default',
                                            opacity: 0.1,
                                            color: "#CAE1FF" // 图表中各个图区域的颜色
                                        }
                                    }
                                },
                        }
                    ]
                };
                // alert(111);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },

            submitSearch: function (page) {
                var that = this;
                var params = {};
                params.data = {
                    system_id: parameters.system_id,
                    pageSize: 20,
                    order: { year: -1, month: -1 },
                    searchValue: {}
                };
                if (page === undefined || page === "" || isNaN(page)) {
                    params.data.page = 1;
                } else {
                    params.data.page = page;
                }
                params.token = this.getKey('token');
                params.url = this.collectionLogListUrl;

                if (this.formInline.year) {
                    params.data.searchValue.year = this.formInline.year;
                }
                if (this.formInline.month) {
                    params.data.searchValue.month = this.formInline.month;
                }
                if (this.formInline.station_name) {
                    params.data.searchValue.station_name = this.formInline.station_name;
                }
                params.success = function (res) {
                    that.$Loading.finish();
                    that.dataSourceList = res.data.result.result;
                    that.recordPage.total = res.data.result.totalSize;
                }

                this.ajaxPost(params);
            },
            changePage: function (page) {
                this.submitSearch(page);
            },
            datetimeChange1: function (datetime) {
                this.formInline.datetime1 = datetime;
            },
            yearChange: function (year) {
                if (year) {
                    this.formInline.year = parseInt(year);
                } else {
                    this.formInline.year = '';
                }
            },
            getAwsStationInfo: function () {
                var that = this;
                var params = {};
                params.data = {
                    system_id: parameters.system_id,
                    searchValue: { dist: "高明区" }
                };
                params.token = this.getKey('token');
                params.url = this.stationListUrl;
                params.success = function (res) {
                    that.$Loading.finish();
                    that.stationList = res.data.result.result;
                }
                this.ajaxPost(params);
            },
            exportExcel: function () {
                if (this.formInline.year != '') {
                    window.open(parameters.domain + 'gmmeteo/datacenter/export/monthAvg2minWind?station_name=' + this.formInline.station_name +
                        '&year=' + this.formInline.year + '&month=' + this.formInline.month);
                } else {
                    this.$Notice.warning({
                        title: '请选择时间'
                    });
                }
            },
        },
        mounted: function () {
            this.submitSearch();
            this.getAwsStationInfo();
            this.collatc();
        }
    }

</script>