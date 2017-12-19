<style lang="less">
  @import url("../../../static/less/color.less");
  .aa{
    margin-left: 5px;
    .ivu-collapse-content{overflow: visible;}
    .ivu-collapse-header{background-color: @navColor;color:white!important;}
 
  }
  .center{
    margin: 0 5px 5px;
    .ivu-table{
      td{text-align: center;}
      th{text-align: center;}
    }
    .ivu-table th{
      background-color:#41b0ff!important;
      font-weight: 900
    }
   .ivu-table-small .ivu-table-cell{
     padding: 0 6px;
   }
    .ivu-table-sort{
      width: 15px;
      height: 15px;
    }
  }
  .ml32{
    background-color: @navBg;
    line-height: 40px;
    height: 40px;
    padding-left: 32px;
    font-size: 16px !important;

    .black{color: #111111;font-weight: 900;}
     .blue{color: @navColor!important;} 
  }
   .ivu-table table{
    td{
       &:nth-child(odd)
      {
        color:#41b0ff;
      }
      &:nth-child(1){
        color: black;
      }
    }
   }
  
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据交换</Breadcrumb-item>
          <Breadcrumb-item class="blue">数据采集</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="名称" prop="name">
                  <Input v-model="formInline.taskname" placeholder="请输入任务名称"></Input>
                </Form-item>
                
                <Form-item label="描述" prop="description">
                  <Input v-model="formInline.description" placeholder="请输入任务描述"></Input>
                </Form-item>
                <Form-item label="执行方式" prop="collectionway">
                  <Select v-model="formInline.collectionway" style="width:162px">
                    <Option value="自动">自动</Option>
                    <Option value="手动">手动</Option>
                  </Select>
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
        urlTaskConfigList:'gmmeteo/datacenter/taskconfig/list',
        formInline: {
          taskname:'',
          description:'',
          collectionway:'',
          status:'',
          lastrundt:''
        },
        dataSourceList:[],
        theadArr: [{
          title: "名称",
          key: "taskname",
        }, {
          title: "描述",
          key: "description"
        }, {
          title: "执行方式",
          key: "collectionway"
        }, {
          title: "状态",
          key: "status"
        }, {
          title: "上次运行时间",
          key: "lastrundt"
        },{
          title: "下次运行时间",
          key: "nextrundt"
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
          order : {},
          searchValue : {}
        }
        if(page === undefined || page === "" || isNaN(page)){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.urlTaskConfigList;
        params.data.searchValue.tasktype = "采集";
        if(this.formInline.taskname){
          params.data.searchValue.taskname=this.formInline.taskname + "|#|like";
        }
        if(this.formInline.description){
          params.data.searchValue.description=this.formInline.description + "|#|like";
        }
        if(this.formInline.collectionway){
          params.data.searchValue.collectionway =this.formInline.collectionway;
        }
        if(this.formInline.status){
          params.data.searchValue.status = this.formInline.status;
        }
        if(this.formInline.nextrundt){
          params.data.searchValue.nextrundt=this.formInline.nextrundt;
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
