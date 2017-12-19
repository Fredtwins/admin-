<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据交换</Breadcrumb-item>
          <Breadcrumb-item class="blue">日志</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="名称" prop="taskName">
                  <Input v-model="formInline.taskName" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="采集时间" prop="logTime">
                  <Date-picker type="datetime" placeholder="选择日期和时间" @on-change="datetimeChange" format="yyyy-MM-dd HH:mm"></Date-picker>
                </Form-item>
                <Form-item label="结果" prop="result">
                  <Select v-model="formInline.result" style="width:162px">下载
                    <Option value="成功">成功</Option>
                    <Option value="失败">失败</Option>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
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
        collectionLogListUrl: 'gmmeteo/datacenter/tasklog/list',
        formInline: {
          result : "",
          taskName : "",
          logTime : "",
          info: ""
        },
        dataSourceList:[],
        theadArr: [{
          title: "名称",
          key: "taskName",
        }, {
          title: "采集时间",
          key: "logTime"
        }, {
          title: "结果",
          key: "result",
        }, {
          title:'数据大小（单位：B）',
          key:'dataByte'
        }, {
          title:'采集记录条数',
          key:'dataSize'
        }],
        recordPage: {
          current: 1,
          pageSize: 10,
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
          pageSize : 10,
          order : {logTime:-1},
          searchValue : {}
        };
        params.data.searchValue.logType = '下载';
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.result){
          params.data.searchValue.result=this.formInline.result;
        }
        if(this.formInline.logTime){
          params.data.searchValue.logTime=this.formInline.logTime;
        }
        if(this.formInline.taskName){
          params.data.searchValue.taskName =this.formInline.taskName + "|#|like";
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
      datetimeChange: function(datetime) {
        this.formInline.logTime = datetime;
      }
    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
