<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据共享</Breadcrumb-item>
          <Breadcrumb-item class="blue">有效注册列表</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="100">
                <Form-item label="服务器ip地址" prop="ip">
                  <Input v-model="formInline.ip" placeholder="请输入ip"></Input>
                </Form-item>
                <Form-item label="服务器名" prop="serverName">
                  <Input v-model="formInline.serverName" placeholder="请输入服务器名"></Input>
                </Form-item>
                <Form-item label="应用名" prop="appName">
                  <Input v-model="formInline.appName" placeholder="请输入应用名"></Input>
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
        collectionLogListUrl: 'gmmeteo/datacenter/webapi/ip',
        formInline: {
          ip : "",
          serverName : "",
          appName : ""
        },
        dataSourceList:[],
        theadArr: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },{
            title: "ip",
            key: "ip",
          }, {
            title: "服务器名",
            key: "serverName"
          }, {
            title: "应用名",
            key: "appName",
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
        if(this.formInline.ip){
          params.data.searchValue.ip=this.formInline.ip;
        }
        if(this.formInline.serverName){
          params.data.searchValue.serverName=this.formInline.serverName + "|#|like";
        }
        if(this.formInline.appName){
          params.data.searchValue.appName =this.formInline.appName;
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
      }
    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
