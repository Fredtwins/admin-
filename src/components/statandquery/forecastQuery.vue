<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">预报数据查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="时间段">
                  <Date-picker type="datetime" v-model="timeAgo" @on-change="datetimeChange1"></Date-picker>&nbsp至&nbsp
                  <Date-picker type="datetime" v-model="timeNew" @on-change="datetimeChange2"></Date-picker>
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
        collectionLogListUrl: 'gmmeteo/datacenter/forecast/foshorttime',
        timeAgo:'',
        timeNew:'',
        formInline: {
          datetime1 : "",
          datetime2 : ""
        },
        dataSourceList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "天气现象描述",
          key: "ws",
        }, {
          title: "风描述",
          key: "wind",
        }, {
          title: "最高气温",
          key: "tmax",
        }, {
          title: "最低气温",
          key: "tmin",
        }, {
          title: "最高相对湿度(%)",
          key: "hmax",
        }, {
          title: "最低相对湿度(%)",
          key: "hmin",
        }, {
          title: "预报发布时间",
          key: "issue_datetime",
        }, {
          title: "预报生效时间",
          key: "valid_datetime",
        }, {
          title:'预报有效期',
          key:'efdate',
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
          order : {valid_datetime:-1},
          searchValue : {}
        };
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.datetime1 || this.formInline.datetime2){
          params.data.searchValue.issue_datetime=this.formInline.datetime1 + '|#|' + this.formInline.datetime2;
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
          window.open(parameters.domain + 'gmmeteo/datacenter/export/forecastQuery?' +
            'issue_datetime=' + this.formInline.datetime1 + '|%23|' + this.formInline.datetime2);
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
      var res = time - second * 1000 -10 * 60 * 1000-temp*60*1000;    
      this.timeAgo=res;
      this.timeNew=timec;
    },
  }
</script>
