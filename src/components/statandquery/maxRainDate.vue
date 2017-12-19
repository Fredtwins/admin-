<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">历史资料统计查询</Breadcrumb-item>
          <Breadcrumb-item class="blue">最大日雨量</Breadcrumb-item>
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
                  <Select v-model="formInline.month" style="width:200px">
                    <Option v-for="item in monthArray" :value="item"/>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
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
        collectionLogListUrl: 'gmmeteo/datacenter/hourextremum/list',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        formInline: {
          station_name : "",
          year : "",
          month:""
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
        }, {
          title: "日期",
          key: "day",
        }, {
          title: "最大日雨量",
          key: "rf",
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
          order : {datetime:-1},
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
        if(this.formInline.hour){
          params.data.searchValue.hour=this.formInline.hour;
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
        this.formInline.year = year;
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
      }
    },
    mounted: function() {
      //this.submitSearch();
      this.getAwsStationInfo();
    }
  }
</script>
