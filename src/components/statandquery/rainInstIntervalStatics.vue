<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">时段雨量查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa" value="1" >
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="选择时间段" prop="time1">
                  <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="timeAgo" @on-change="time1Change" style="width: 200px"></DatePicker>
                </Form-item>
               <Form-item label="至" prop="time2">
                 <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="timeNew" @on-change="time2Change" style="width: 200px"></DatePicker>
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
        collectionLogListUrl: 'gmmeteo/datacenter/rain/stat/inst',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
         timeAgo:'',
        timeNew:'',
        formInline: {
          time1 : "",
          time2 : ""
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
          key: "_id",
          width:200
        }, {
          title: "累积雨量",
          //key: "sum",
          render: (h, params) => {
            return h('div', params.row.sum.toFixed(1));
          }
        }, {
          title: "小时最大雨量",
          key: "max",
        }, {
          title:'有雨记录数',
          key:"count",
          sortable: true
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
          "time1":"2017-09-13 00:05",
          "time2":"2017-09-15 00:00",
        };
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.time1){
          params.data.time1 =this.formInline.time1;
        }
        if(this.formInline.time2){
          params.data.time2 =this.formInline.time2;
        }
        params.success = function(res) {
          that.$Loading.finish();
          that.dataSourceList = res.data.result;
        }

        this.ajaxPost(params);
      },
      changePage: function(page) {
        this.submitSearch(page);
      },
      time1Change: function(time1) {
         this.formInline.time1 = time1;
      },
      time2Change: function(time2) {
         this.formInline.time2 = time2;
      },
      exportExcel: function() {
        if (this.formInline.datetime != '') {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/rainInstIntervalStatics?time1='
            + this.formInline.time1 + '&time2=' + this.formInline.time2);
        } else {
          this.$Notice.warning({
            title: '请选择时间'
          });
        }
      },

    },
    mounted: function() {
      this.submitSearch();

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
