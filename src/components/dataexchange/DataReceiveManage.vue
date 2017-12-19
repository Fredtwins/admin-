<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <!--<Button type="primary" @click="addDataReceived" style="position:absolute; right:5px; top:2px">新增</Button>-->
          <Breadcrumb-item class="black">数据交换</Breadcrumb-item>
          <Breadcrumb-item class="blue">数据接收管理</Breadcrumb-item>
        </Breadcrumb>
        <Modal
          v-model="modal1">
          <div slot="header">{{updateTitle}}</div>
          <Form :model="formItem" :label-width="80">
            <Form-item label="接口名称" prop="apiName">
              <Input v-model="formItem.apiName" placeholder="请输入接口名称"></Input>
            </Form-item>
            <Form-item label="描述" prop="description">
              <Input v-model="formItem.description" placeholder="请输入描述"></Input>
            </Form-item>
            <Form-item label="地址" prop="url">
              <Input v-model="formItem.url" placeholder="请输入地址"></Input>
            </Form-item>
            <Form-item label="数据库" prop="dbName">
              <Input v-model="formItem.dbName" placeholder="请输入数据库"></Input>
            </Form-item>
            <Form-item label="表名" prop="collectionName">
              <Input v-model="formItem.collectionName" placeholder="请输入表名"></Input>
            </Form-item>
            <Form-item label="状态" prop="status">
              <Select v-model="formItem.status">
                <Option :value="开启">开启</Option>
                <Option :value="关闭">关闭</Option>
              </Select>
            </Form-item>
          </Form>
          <div slot="footer">
            <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
            <Button v-if="btnChange" type="primary" @click="changeDepartment">修改</Button>
            <Button @click="cancel">取消</Button>
          </div>
        </Modal>
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
        collectionLogListUrl: 'gmmeteo/datacenter/datareceive/config/list',
        updateTitle: '',
        formItem: {},
        formInline: {
          apiName:'',
          url:'',
          dbName:'',
          collectionName:'',
          status:''
        },
        dataSourceList:[],
        theadArr: [{
          title: "接口名称",
          key: "apiName",
        }, {
          title: "描述",
          key: "description"
        }, {
          title: "地址",
          key: "url",
        },{
          title: "数据库",
          key: "dbName",
        },{
          title: "表名",
          key: "collectionName",
        }, {
          title: "状态",
          key: "status",
        }],
        btnSave: false,
        btnChange: false,
        modal1: false,
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
        };
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
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
      addDataReceived: function () {
        this.formItem={
          apiName:'',
          description:'',
          url:'',
          dbName:'',
          collectionName:'',
          status:''
        };
        this.updateTitle = "新增数据接收";
        this.btnChange = false;
        this.btnSave = true;
        this.modal1 = true;
      },
      ok () {
        var that = this;
        var params = {};
        params.data = {};
        params.data.system_id = parameters.system_id;
        params.token = this.getKey('token');
        params.url = this.urlDepartmentAddList;
        if(this.formItem.apiName !=''){
          params.data.apiName=this.formItem.apiName;
        }else{
          this.$Notice.warning({
            title: '请填写接口名称'
          });
          return;
        }
        if(this.formItem.url !=''){
          params.data.url=this.formItem.url;
        }else{
          this.$Notice.warning({
            title: '请填写地址'
          });
          return;
        }
        if(this.formItem.dbName !=''){
          params.data.dbName=this.formItem.dbName;
        }else{
          this.$Notice.warning({
            title: '请填写数据库名称'
          });
          return;
        }
        if(this.formItem.collectionName !=''){
          params.data.collectionName=this.formItem.collectionName;
        }else{
          this.$Notice.warning({
            title: '请填写数据库表名'
          });
          return;
        }
        if(this.formItem.status !=''){
          params.data.status=this.formItem.status;
        }else{
          this.$Notice.warning({
            title: '请选择状态'
          });
          return;
        }
        params.success=function(){
          that.$Loading.finish();
          that.$Notice.success({
            title: '新增成功'
          });
          that.submitSearch();
        }
        console.log(params);
        this.ajaxPost(params);
        this.modal1=false;
      },
    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
