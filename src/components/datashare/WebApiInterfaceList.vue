<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据共享</Breadcrumb-item>
          <Breadcrumb-item class="blue">共享接口</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="接口名称" prop="taskName">
                  <Input v-model="formInline.interfaceid" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="接口描述" prop="description">
                  <Input v-model="formInline.description" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="状态" prop="status">
                  <Select v-model="formInline.status" style="width:162px">
                    <Option value="开启">开启</Option>
                    <Option value="关闭">关闭</Option>
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
        collectionLogListUrl: 'gmmeteo/datacenter/webapi/api',
        formInline: {
          interfaceid : "",
          description : "",
          status : ""
        },
        dataSourceList:[],
        theadArr: [
          {
            type: 'index',
            width: 60,
            align: 'center',
          },{
          title: "接口名称",
          key: "interfaceid",
        }, {
          title: "描述",
          key: "description"
        }, {
          title: "地址",
          key: "url",
        }, {
          title:'状态',
          key:'status'
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
        if(this.formInline.interfaceid){
          params.data.searchValue.interfaceid=this.formInline.interfaceid + "|#|like";
        }
        if(this.formInline.description){
          params.data.searchValue.description=this.formInline.description + "|#|like";
        }
        if(this.formInline.status){
          params.data.searchValue.status =this.formInline.status;
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
