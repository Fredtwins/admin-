<style lang="less">
  @import url("../../../static/less/color.less");
  .tex{
    /* text-align: center; */
    margin: 0 auto;
    text-align: center;
     color: #41b0ff; 
     font-size: 18px;
  }
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多时对比查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="70">
                <Form-item label="站点名称" prop="station_name">
                  <Select v-model="formInline.station_name" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="时间段">
                  <Date-picker type="datetime" v-model="timeAgo" @on-change="datetimeChange1"></Date-picker>&nbsp至&nbsp
                  <Date-picker type="datetime" v-model="timeNew" @on-change="datetimeChange2"></Date-picker>
                </Form-item>
                <Form-item label="时间间隔" prop="timetype">
                  <Select v-model="formInline.time_type" clearable style="width:150px">
                    <Option value="1">5分钟数据</Option>
                    <Option value="2">整点数据</Option>
                  </Select>
                </Form-item>
                <!--<Form-item label="结果" prop="result">
                  <Select v-model="formInline.result" style="width:162px">
                    <Option value="成功">成功</Option>
                    <Option value="失败">失败</Option>
                  </Select>
                </Form-item>-->
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
                <div class="tex" style="width:300px " >
                    <!-- <Input  v-model="formInline.station_name" style="width: 300px"></Input>   -->
                   <!-- {{formInline.station_name}} -->
                   <h3 v-model="formInline.station_name">{{formInline.station_name}}</h3>
                </div>
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
        collectionLogListUrl: 'gmmeteo/datacenter/stationinstquery/list',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        timeAgo:'',
        timeNew:'',
        formInline: {
          station_name : "",
          datetime1 : "",
          datetime2 : "",
          time_type : ""
        },
        stationList:[],
        dataSourceList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title:'记录时间',
          key:'datetime',
        },
        {
          title: "气温",
          key: "t",
          sortable: true
        }, {
          title: "气压",
          key: "p",
          sortable: true
        }, {
          title:'相对湿度',
          key:'u',
          sortable: true
        }, {
          title:'风速(m/s)',
          key:'wf10',
          sortable: true
        }, {
          title:'风向',
          key:'wd10'
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
        if(this.formInline.datetime1 || this.formInline.datetime2){
          params.data.searchValue.datetime=this.formInline.datetime1 + '|#|' + this.formInline.datetime2;
          params.data.order.datetime = 1;
        }
        if(this.formInline.station_name){
          params.data.searchValue.station_name =this.formInline.station_name;
        }
        if (this.formInline.time_type === "2") {
          //params.data.searchValue.minute=":00:00|#|like";
          params.data.searchValue.minute=0;
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
      datetimeChange1: function(datetime) {
        this.formInline.datetime1 = datetime;
      },
      datetimeChange2: function(datetime) {
        this.formInline.datetime2 = datetime;
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
        if (this.formInline.datetime1 != '' && this.formInline.datetime2 != '') {
          if (this.formInline.time_type === "2") {
            window.open(parameters.domain + 'gmmeteo/datacenter/export/StationHoursCompare?station_name='
              + this.formInline.station_name + '&datetime=' + this.formInline.datetime1 + '|%23|' + this.formInline.datetime2
            + '&minute=0');
          } else {
            window.open(parameters.domain + 'gmmeteo/datacenter/export/StationHoursCompare?station_name='
              + this.formInline.station_name + '&datetime=' + this.formInline.datetime1 + '|%23|' + this.formInline.datetime2);
          }
        } else {
          this.$Notice.warning({
            title: '请选择时间'
          });
        }
      },
    },
    mounted: function() {
      //this.submitSearch();
      this.getAwsStationInfo();
    },
     created(){
      // 获取时间
      var time = +new Date();
      var timec = new Date(time);
      var second = timec.getSeconds();
      var minutes =timec.getMinutes();
      var temp =minutes%5;
      var res = time - second * 1000 -10 * 60 * 1000 - temp * 60 * 1000;
      this.timeAgo=res;
      this.timeNew=timec;
    },
  }
</script>
