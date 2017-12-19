<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多日小时极值对比查询</Breadcrumb-item>
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
                    <Option v-for="item in monthList" :value="item"/>
                  </Select>
                </Form-item>
                <Form-item label="选择时" prop="hour">
                  <Select v-model="formInline.hour" style="width:200px">
                    <Option v-for="item in hourList" :value="item"/>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
                
               <!--标题  -->
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
          month : "",
          hour : "",
        },
        stationList:[],
        dataSourceList:[],
        hourList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        }, 
        {
          title:'统计时间',
          key:'datetime',
        },
        {
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
          key:'r1',
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
        console.log(params.data);
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
        if (this.formInline.datetime != '') {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/StationDaysHoursCompare?station_name='
            + this.formInline.station_name + '&year=' + this.formInline.year + '&month=' + this.formInline.month + '&hour=' + this.formInline.hour);
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
    }
  }
</script>
