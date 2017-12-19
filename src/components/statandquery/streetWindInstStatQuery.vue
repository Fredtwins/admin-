<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">镇街风力实况统计查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="选择时间段" prop="time1">
                  <DatePicker type="date" placeholder="选择日期和时间" @on-change="time1Change" style="width: 200px"></DatePicker>
                </Form-item>
                <Form-item label="至" prop="time2">
                  <DatePicker type="date" placeholder="选择日期和时间" @on-change="time2Change" style="width: 200px"></DatePicker>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
                <Button style="float: right" type="primary" @click="exportExcel">导出excel表格</Button>
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr"  stripe size="small"></Table>
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
        collectionLogListUrl: 'gmmeteo/datacenter/town/maxwind',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
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
          key: "cn",
          width:200
        }, {
          title: "镇街",
          key: "town",
        }, {
          title:'最大阵风值（m/s）',
          key:'wfmax',
        }, {
          title:'最大阵风值出现时间',
          key:'maxtime',
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
          "order":{"wfmax":-1},
          "searchValue":{"datetime":{"$gte":"2017-10-14","$lte":"2017-10-14 23"}}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.time1){
          params.data.searchValue.datetime.$gte =this.formInline.time1;
        }
        if(this.formInline.time2){
          params.data.searchValue.datetime.$lte =this.formInline.time2;
        }
        params.success = function(res) {
          console.log(res);
          that.$Loading.finish();
          that.dataSourceList = res.data.result.result;
          that.recordPage.total = res.data.result.totalSize;
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
        if (!this.formInline.time1 || !this.formInline.time2) {
          this.$Notice.warning({
            title: '请选择时间'
          });
        } else {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/streetWindInstStatQuery?datetime='
            + this.formInline.time1 + '|%23|' + this.formInline.time2);
        }
      },

    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
