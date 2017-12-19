<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">雨滑动统计查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="选择时间段" prop="time1">
                  <DatePicker type="date" placeholder="选择日期和时间" @on-change="time1Change" style="width: 200px"></DatePicker>至
                  <DatePicker type="date" placeholder="选择日期和时间" @on-change="time2Change" style="width: 200px"></DatePicker>
                </Form-item>
                <Form-item label="选择时段" prop="hour">
                  <Select v-model="formInline.hour" style="width:200px">
                    <Option v-for="option in options" v-bind:value="option.value">{{option.text}}</Option>
                  </Select>
                </Form-item>
                <Form-item label="累积降雨量大于或等于" prop="value">
                  <InputNumber :min="0" @on-change="valueChange"></InputNumber>毫米
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
        collectionLogListUrl: 'gmmeteo/datacenter/slide/stat',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        /*selected : "1",*/
        options:[
            {text : "3小时累积雨量",value:"1"},
            {text : "12小时累积雨量",value:"2"}
        ],
        formInline: {
          time1 : "",
          time2 : "",
          hour : 1,
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
          title:'3小时累积降雨量',
          key:'r3',
        }, {
          title: "首次达到累积雨量时间",
          key: "datetime",
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
          "order":{"datetime":1},
          "searchValue":{"datetime":{"$gte":"2017-09-13","$lte":"2017-09-14"},"r3":{"$gte":0.2}}
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
            if(this.formInline.hour==1){
                var r3Object = {"$gte":parseFloat(this.formInline.value)};
                //params.data.searchValue.r3=this.formInline.value;
                params.data.searchValue.r3=r3Object;
            }
            else if(this.formInline.hour==2){
                var r12Object = {"$gte":parseFloat(this.formInline.value)};
                params.data.searchValue.r12=r12Object;
            }

        }
        console.log(params.data);
        params.success = function(res) {
          console.log(res)
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

    },
    watch:  {
        "formInline.hour": function() {
            if(this.formInline.hour == 1){
                this.theadArr= [{
                          type: 'index',
                          width: 60,
                          align: 'center'
                        },{
                          title: "站点名称",
                          key: "station_name",
                          width:200
                        }, {
                  title:'3小时累积降雨量',
                  key:'r3',
                }, {
                          title: "时间",
                          key: "datetime",
                        }]
            }
            if(this.formInline.hour == 2){
                this.theadArr= [{
                          type: 'index',
                          width: 60,
                          align: 'center'
                        },{
                          title: "站点名称",
                          key: "station_name",
                          width:200
                        }, {
                  title:'12小时累积降雨量',
                  key:'r12',
                }, {
                          title: "时间",
                          key: "datetime",
                        }]
            }
        },
    }
  }
</script>
