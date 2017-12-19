<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多日对比查询</Breadcrumb-item>
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
                <Form-item label="时间" prop="datetime">
                  <Date-picker type="month" placeholder="选择日期" @on-change="datetimeChange" format="yyyy-MM"></Date-picker>
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
        collectionLogListUrl: 'gmmeteo/datacenter/dayextremum/list',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        formInline: {
          station_name : "",
          datetime : "",
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
          title:'统计时间',
          key:'datetime2',
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
          key:'rf',
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
          order : {datetime1:-1},
          searchValue : {}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.datetime){
          params.data.searchValue.datetime1=this.formInline.datetime + "|#|like";
          params.data.order.datetime1 = 1;
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
      datetimeChange: function(datetime) {
        this.formInline.datetime = datetime;
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
          window.open(parameters.domain + 'gmmeteo/datacenter/export/dayextremum?station_name='
            + this.formInline.station_name + '&datetime1=' + this.formInline.datetime + '|%23|like');
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
