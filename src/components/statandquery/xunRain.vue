<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">历史资料统计查询</Breadcrumb-item>
          <Breadcrumb-item class="blue">旬雨量统计</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa" value="1" >
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="站点名称" prop="station_name">
                  <Select v-model="formInline.station_name" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="选择年" prop="year">
                  <Date-picker type="year" placeholder="选择年份" @on-change="yearChange" format="yyyy"></Date-picker>
                </Form-item>
                <Form-item label="选择月" prop="month">
                  <Select v-model="formInline.month" clearable style="width:200px">
                    <Option v-for="item in monthArray" :value="item"/>
                  </Select>
                </Form-item>
                <Form-item label="选择旬" prop="month">
                  <Select v-model="formInline.xun" clearable style="width:200px">
                    <Option v-for="item in xunArray" :value="item"/>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr" stripe size="small"></Table>
          <Page
            class="pull-right"
            :total="recordPage.total"
            :current="recordPage.current"
            size="small"
            show-total
            @on-change="changePage"
            :page-size=20
          ></Page>
        </div>
      </i-col>
    </row>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        collectionLogListUrl: 'gmmeteo/datacenter/history/xunrain',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        formInline: {
          station_name : "",
          year : "",
          month:"",
          xun:''
        },
        stationList:[],
        dataSourceList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "站点名称",
          key: "station_name",
          width:200
        },{
          title: "年份",
          key: "year",
        },{
          title: "月份",
          key: "month",
        },{
          title: "旬",
          key: "xun",
        },{
          title: "合雨量",
          //key: "sumrain",
          render: (h, params) => {
            return h('div', params.row.sumrain.toFixed(1));
          }
        },{
          title: "小雨日数",
          key: "lightraincount",
        },{
          title: "中雨日数",
          key: "moderateraincount",
        },{
          title: "大雨日数",
          key: "heavyraincount",
        },{
          title: "暴雨日数",
          key: "rainstormcount",
        }],
        recordPage: {
          current: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    methods: {
      submitSearch: function(page) {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          pageSize : 20,
          order : {year:-1, month:-1},
          searchValue : {}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;

        if(this.formInline.year){
          params.data.searchValue.year=this.formInline.year;
        }
        if(this.formInline.month){
          params.data.searchValue.month=this.formInline.month;
        }
        if(this.formInline.xun){
          params.data.searchValue.xun=this.formInline.xun;
        }
        if(this.formInline.station_name){
          params.data.searchValue.station_name =this.formInline.station_name;
        }
        params.success = function(res) {
          that.$Loading.finish();
          that.dataSourceList = res.data.result.result;
          that.recordPage.total = res.data.result.totalSize;
        }

        this.ajaxPost(params);
      },
      changePage: function(page) {
        this.submitSearch(page);
      },
      yearChange: function(year) {
        if (year) {
          this.formInline.year = parseInt(year);
        } else {
          this.formInline.year = '';
        }
      },
      getAwsStationInfo:function () {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          searchValue : {dist:"高明区"}
        };
        params.token = this.getKey('token');
        params.url = this.stationListUrl;
        params.success = function(res) {
          that.$Loading.finish();
          that.stationList = res.data.result.result;
        }
        this.ajaxPost(params);
      },
      exportExcel: function() {
        if (this.formInline.year != '' && this.formInline.month != '') {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/xunRain?station_name=' + this.formInline.station_name +
            '&year=' + this.formInline.year +'&month=' + this.formInline.month + '&xun=' + this.formInline.xun);
        } else {
          this.$Notice.warning({
            title: '请选择时间'
          });
        }
      },
    },
    mounted: function() {
      this.submitSearch();
      this.getAwsStationInfo();
    }
  }
</script>
