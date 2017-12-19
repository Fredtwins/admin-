<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">镇街代表站统计</Breadcrumb-item>
        </Breadcrumb>
        <Collapse value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
               <Form-item label="选择年" prop="year">
                  <Date-picker type="year" placeholder="选择年份" @on-change="yearChange" format="yyyy"></Date-picker>
               </Form-item>
               <Form-item label="选择月份" prop="month">
                  <Select v-model="formInline.month" style="width:100px">
                    <Option v-for="item in monthList" :value="item"/>
                  </Select>
               </Form-item>
               <!--<Form-item label="选择旬" prop="period">
                  <Select v-model="formInline.period" style="width:100px">
                    <Option v-for="item in periodList" :value="item"/>
                  </Select>
               </Form-item>-->
                 <Form-item label="荷城街道" prop="station_name">
                   <Select v-model="formInline.station_name[0]" style="width:200px">
                     <Option v-for="item in stationList1" :value="item.cn"/>
                   </Select>
                 </Form-item>
                <Form-item label="更合街道" prop="station_name">
                  <Select v-model="formInline.station_name[1]" style="width:200px">
                    <Option v-for="item in stationList2" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="明城街道" prop="station_name">
                  <Select v-model="formInline.station_name[2]" style="width:200px">
                    <Option v-for="item in stationList3" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="杨和街道" prop="station_name">
                  <Select v-model="formInline.station_name[3]" style="width:200px">
                    <Option v-for="item in stationList4" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr" stripe></Table>
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
        collectionLogListUrl: 'gmmeteo/datacenter/town/example',
        stationListUrl:'gmmeteo/datacenter/station/aws',
        formInline: {
          station_name : [],
          year : "",
          month : "",
          period : ""
        },
        monthList:[ 1,2,3,4,5,6,7,8,9,10,11,12],
        periodList:["","上旬","中旬","下旬"],
        stationList1:[],
        stationList2:[],
        stationList3:[],
        stationList4:[],
        dataSourceList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "站点名称",
          key: "station_name",
        }, {
          title: "年",
          key: "year"
        }, {
          title: "月",
          key: "month"
        }, {
          title:'平均温度',
          //key:'avgtemp'
          render: (h, params) => {
            return h('div', params.row.avgtemp.toFixed(1));
          }
        }, {
          title:'累积雨量',
          //key:'rain',
          render: (h, params) => {
            return h('div', params.row.rain.toFixed(1));
          }
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
          order : {station_name:-1},
          searchValue : {}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.station_name){
          params.data.searchValue.station_name = {"$in":this.formInline.station_name};
        }
        if (this.formInline.year) {
          params.data.searchValue.year=this.formInline.year;
        }
        if (this.formInline.month) {
          params.data.searchValue.month=this.formInline.month;
        }
        /*if (this.formInline.period) {
          params.data.searchValue.period=this.formInline.period;
        }*/
        console.log(params.data);
        params.success = function(res) {
            console.log(res.data);
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
      getAwsStationInfo1:function () {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          searchValue : {dist:"高明区","town" : "荷城"}
        };
        params.token = this.getKey('token');
        params.url = this.stationListUrl;
        params.success = function(res) {
          that.$Loading.finish();
          that.stationList1 = res.data.result.result;
        }
        this.ajaxPost(params);
      },
      getAwsStationInfo2:function () {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          searchValue : {dist:"高明区","town" : "更合"}
        };
        params.token = this.getKey('token');
        params.url = this.stationListUrl;
        params.success = function(res) {
          that.$Loading.finish();
          that.stationList2 = res.data.result.result;
        }
        this.ajaxPost(params);
      },
      getAwsStationInfo3:function () {
         var that = this;
         var params = {};
         params.data = {
           system_id : parameters.system_id,
           searchValue : {dist:"高明区","town" : "明城"}
         };
         params.token = this.getKey('token');
         params.url = this.stationListUrl;
         params.success = function(res) {
           that.$Loading.finish();
           that.stationList3 = res.data.result.result;
         }
         this.ajaxPost(params);
      },
      getAwsStationInfo4:function () {
          var that = this;
          var params = {};
          params.data = {
            system_id : parameters.system_id,
            searchValue : {dist:"高明区","town" : "杨和"}
          };
          params.token = this.getKey('token');
          params.url = this.stationListUrl;
          params.success = function(res) {
            that.$Loading.finish();
            that.stationList4 = res.data.result.result;
          }
          this.ajaxPost(params);
       },
      exportExcel: function() {
        if (!this.formInline.year || !this.formInline.month) {
          this.$Notice.warning({
            title: '请选择时间'
          });
        } else {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/streetStationStats?year='
            + this.formInline.year + '&month=' + this.formInline.month +
            '&station_name=' + this.formInline.station_name[0] +
            '&station_name=' + this.formInline.station_name[1] +
            '&station_name=' + this.formInline.station_name[2] +
            '&station_name=' + this.formInline.station_name[3]);
        }
      },
      },
    mounted: function() {
      this.submitSearch();
      this.getAwsStationInfo1();
      this.getAwsStationInfo2();
      this.getAwsStationInfo3();
      this.getAwsStationInfo4();
    }
  }
</script>
