<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据共享</Breadcrumb-item>
          <Breadcrumb-item class="blue">用户服务列表</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="用户名" prop="taskName">
                  <Input v-model="formInline.username" placeholder="请输入用户名"></Input>
                </Form-item>
                <Form-item label="密码" prop="description">
                  <Input v-model="formInline.password" placeholder="请输入密码"></Input>
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
        collectionLogListUrl: 'gmmeteo/datacenter/webapi/user',
        formInline: {
          username : "",
          password : "",
        },
        dataSourceList:[],
        theadArr: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },{
            title: "用户名",
            key: "username",
          }, {
            title: "密码",
            key: "password"
           }, {
            title: "部门",
            key: "dept",
          }, {
            title:'备注',
            key:'remark'
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
        if(this.formInline.username){
          params.data.searchValue.username=this.formInline.username + "|#|like";
        }
        if(this.formInline.password){
          params.data.searchValue.password=this.formInline.password + "|#|like";
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
