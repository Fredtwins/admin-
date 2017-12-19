<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">自动站实时查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="站点名称" prop="station_name">
                  <Select v-model="formInline.station_name" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="时间">
                  <Date-picker type="datetime" v-model="timeAgo" @on-change="datetimeChange1"></Date-picker><!--&nbsp至&nbsp
                  <Date-picker type="datetime" v-model="timeNew" @on-change="datetimeChange2"></Date-picker>-->
                </Form-item>
                <!--<Form-item label="结果" prop="result">
                  <Select v-model="formInline.result" style="width:162px">
                    <Option value="成功">成功</Option>
                    <Option value="失败">失败</Option>
                  </Select>
                </Form-item>-->
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr" border ></Table>
          <!--<Page
            class="pull-right"
            :total="recordPage.total"
            :current="recordPage.current"
            size="small"
            show-total
            @on-change="changePage"
            :page-size=40
          ></Page>-->
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
          datetime2 : ""
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
        }, {
          title: "气温",
          key: "t",
          sortable: true
        }, {
          title:'10分钟风速(m/s)',
          key:'wf10',
          sortable: true
        }, {
          title:'10分钟风向',
          key:'wd10'
        }, {
          title:'2分钟风速(m/s)',
          key:'wf2',
          sortable: true
        }, {
          title:'2分钟风向',
          key:'wd2'
        }, {
          title: "1小时雨量",
          key: "r1h",
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
          title:'电压',
          key:'wpv',
          sortable: true
        }, {
          title:'记录时间',
          width: 200,
          key:'datetime',
        }],
        recordPage: {
          current: 1,
          pageSize: 40,
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
      var res = time - second * 1000 -10 * 60 * 1000-temp*60*1000;
      this.timeAgo=res;
      this.timeNew=timec;
    },
    methods: {
      submitSearch: function(page) {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          /*pageSize : 40,
          order : {datetime:-1},*/
          searchValue : {}
        };
        /*if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else {
          params.data.page = page;
        }*/
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        /*if(this.formInline.datetime1 || this.formInline.datetime2){
          params.data.searchValue.datetime=this.formInline.datetime1 + '|#|' + this.formInline.datetime2;
        }*/
        if(this.formInline.station_name){
          console.log(params.data)
          params.data.searchValue.station_name =this.formInline.station_name;
        }
        if (this.formInline.datetime1) {
          params.data.searchValue.datetime=this.formInline.datetime1 + '|#|like';
        }
        // console.log(params);
        params.success = function(res) {
          that.$Loading.finish();
          // console.log(that.dataSourceList)
          that.dataSourceList = res.data.result.result;
          // console.log(res.data.result.result)
          //that.recordPage.total = res.data.result.totalSize;
          // console.log(res)
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
        // console.log(params);
      },
      exportExcel: function() {
          if (this.formInline.datetime1 != '') {
            window.open(parameters.domain + 'gmmeteo/datacenter/export/stationInst?station_name='
              + this.formInline.station_name + '&datetime=' + this.formInline.datetime1 + '|%23|like');
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
