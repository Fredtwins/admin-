<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">风滑动统计查询</Breadcrumb-item>
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
                <Form-item label="风速大于或等于" prop="value">
                  <InputNumber :min="0" @on-change="valueChange"></InputNumber>米/秒
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
            :page-size=39
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
        collectionLogListUrl: 'gmmeteo/datacenter/slide/stat',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        formInline: {
          time1 : "",
          time2 : "",
          value : ""
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
        }, {
          title: "风速（米/秒）",
          key: "wf3smax",
          sortable: true
        }, {
          title: "第一次出现时间",
          key: "wf3smaxtime",
        }],
        recordPage: {
          current: 1,
          pageSize: 39,
          total: 0
        }
      }
    },
    methods: {
      submitSearch: function(page) {
        var that = this;
        var params = {};
        params.data = {
          "order":{"datetime":1},
          "searchValue":{"datetime":{"$gte":"2017-09-13","$lte":"2017-09-14"},"wf3smax":{"$gte":5}}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.time1 && this.formInline.time2){
          params.data.searchValue.datetime =this.formInline.time1 + '|#|' + this.formInline.time2;
        }
        if(this.formInline.value){
          params.data.searchValue.wf3smax = {"$gte":parseFloat(this.formInline.value)};
        }
        console.log(params.data);
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
      valueChange: function(value) {
        this.formInline.value = value;
      },
      exportExcel: function() {
        if (!this.formInline.time1 || !this.formInline.time2) {
          this.$Notice.warning({
            title: '请选择时间'
          });
        } else {
          window.open(parameters.domain + 'gmmeteo/datacenter/export/SlideStat?datetime='
            + this.formInline.time1 + '|%23|' + this.formInline.time2 + '&hour=' + this.formInline.hour + '&value=' + this.formInline.value);
        }
      },
    },
    mounted: function() {
      this.submitSearch();

    }

  }
</script>
