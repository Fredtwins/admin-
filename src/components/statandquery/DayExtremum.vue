<style lang="less">
  @import url("../../../static/less/color.less");
  .ivu-collapse{
    margin-bottom: 14px;
  }
  .ivu-table-header .ivu-table{
    background-color: #41b0ff !important;
  }
  thead{
    font-size: 14px;
    color: #ffffff;
  }
  .ivu-table-sort i:first-child{
     color: #F7BA2A;
  }
    th{

      &:nth-child(odd)
      {
        color:#F7BA2A;
      }
      &:nth-child(1){
        color:#ffffff;
      }
    }
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">日极值统计</Breadcrumb-item>
        </Breadcrumb>
        <Collapse value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="站点名称" prop="station_name">
                  <Select v-model="formInline.station_name" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                </Form-item>

                <Form-item label="时间段">
                  <Date-picker type="datetime" v-model="timeAgo"   @on-change="datetimeChange1"></Date-picker>&nbsp至&nbsp
                  <Date-picker type="datetime" v-model="timeNew" @on-change="datetimeChange2"></Date-picker>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
          
                
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" border :columns="theadArr" stripe size="small"></Table>
          <Page
            class="pull-right"
            :total="recordPage.total"
            :current="recordPage.current"
            size="small"
            show-total
            @on-change="changePage"
            :page-size="recordPage.pageSize"
            
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
        collectionLogListUrl: 'gmmeteo/datacenter/dayextremum/list',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        timeAgo:'',
        timeNew:'',
        formInline: {
          station_name : "",
          datetime1 : "",
          datetime2 : ""
        },
        dataSourceList:[],
        stationList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "站点名称",
          key: "station_name",
          width:200
        }, {
          title: "最高温",
          key: "tmax",
          sortable: true
        }, {
          title: "最高温出现时间",
          key: "tmaxtime",
        }, {
          title:'最低温',
          key:'tmin',
          sortable: true
        }, {
          title:'最低温出现时间',
          key:'tmintime',
        }, {
          title:'最大湿度',
          key:'umax',
          sortable: true
        }, {
          title:'最大湿度出现时间',
          key:'umaxtime',
        }, {
          title:'最小湿度',
          key:'umin',
          sortable: true
        }, {
          title:'最小湿度出现时间',
          key:'umintime',
        }, {
          title:'最高气压(hPa) ',
          key:'pmax',
          sortable: true
        }, {
          title:'最高气压出现时间',
          key:'pmaxtime',
        }, {
          title:'最低气压(hPa)',
          key:'pmin',
          sortable: true
        }, {
          title:'最低气压出现时间',
          key:'pmintime',
        }, {
          title:'3秒最大瞬间风速(m/s)',
          key:'wf3smax',
          sortable: true
        }, {
          title:'3秒最大瞬间风速出现时间',
          key:'wf3smaxtime',
        }, {
          title:'最大10分钟平均风速(m/s)',
          key:'wf10max',
          sortable: true
        }, {
          title:'最大10分钟平均风速出现时间',
          key:'wf10maxtime',
        }, {
          title:'降水量',
          key:'rf',
        }, {
          title:'统计时间',
          key:'datetime2',
        }],
        recordPage: {
          current: 1,
          pageSize: 20,
          total: 0
        }
      }
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
    methods: {
  
      submitSearch: function(page) {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          pageSize : 20,
          order : {datetime2:-1},
          searchValue : {}
        };
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        // console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.datetime1 || this.formInline.datetime2){
          params.data.searchValue.datetime2=this.formInline.datetime1 + '|#|' + this.formInline.datetime2;
        }
        // 站点名称
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
      datetimeChange1: function(datetime) {
        this.formInline.datetime1 = datetime;
      },
      datetimeChange2: function(datetime) {
        this.formInline.datetime2 = datetime;
      },
      exportExcel: function() {
        if (this.formInline.datetime1 != '' && this.formInline.datetime2 != '') {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/dayextremum?station_name='
            + this.formInline.station_name + '&datetime2=' + this.formInline.datetime1 + '|%23|' + this.formInline.datetime2);
        } else {
          this.$Notice.warning({
            title: '请选择时间'
          });
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
    },
    mounted: function() {
      this.getAwsStationInfo();
      this.submitSearch();
    }
  }
</script>
