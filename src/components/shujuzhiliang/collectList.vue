<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据质量监控</Breadcrumb-item>
          <!-- <Breadcrumb-item class="blue"></Breadcrumb-item> -->
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="站点名称" prop="stationname">
                  <Select v-model="formInline.stationname" clearable style="width:200px">
                    <Option v-for="item in stationList" :value="item.cn"/>
                  </Select>
                </Form-item>
                <Form-item label="时间">
                  <Date-picker type="datetime" v-model="timeAgo" @on-change="datetimeChange1"></Date-picker>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
              </Form>

            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr" stripe></Table>
          <Page class="pull-right" :total="recordPage.total" :current="recordPage.current" size="small" show-total @on-change="changePage"></Page>
        </div>

      </i-col>

    </row>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        collectionLogListUrl: '/gmmeteo/datacenter/traceresult/list',
        stationListUrl:'gmmeteo/datacenter/awsstation/list',
        formInline: {
          stationname: ""
        },
        timeAgo: '',
        stationList: [],
        dataSourceList: [],
        theadArr: [
          {
            title: "站点名",
            key: "stationname"
          },
          {
            title: "数据类型",
            key: "tracename",
          }, {
            title: "应采时间",
            key: "plan_datetime"
          }, {
            title: "实际采集状况",
            key: "collect_result"
          }],
        recordPage: {
          current: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    methods: {
      submitSearch: function (page) {
        var that = this;
        var params = {};
        params.data = {
          system_id: parameters.system_id,
          pageSize: 20,
          order: { plan_datetime: -1 },
          searchValue: {}
        };
        // params.data.searchValue.logType = '采集';
        if (page === undefined || page === "") {
          params.data.page = 1;
        } else {
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if (this.formInline.stationname) {
          params.data.searchValue = this.formInline.stationname;
        }
        params.success = function (res) {
          // console.log(res);
          that.$Loading.finish();
          // console.log(res.data.result.result);
          that.dataSourceList = res.data.result.result;
          that.recordPage.total = res.data.result.totalSize;
        }
        this.ajaxPost(params);
      },
      changePage: function (page) {
        this.submitSearch(page);
      },
      datetimeChange: function (datetime) {
        // console.log('datetime1=' + datetime);
        this.formInline.logTime = datetime;
      },
      datetimeChange1: function (datetime) {
        this.formInline.datetime1 = datetime;
        //console.log(this.formInline);
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
    mounted: function () {
      this.submitSearch();
      this.getAwsStationInfo();
    }
  }

</script>