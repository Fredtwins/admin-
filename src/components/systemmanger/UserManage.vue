<!-- 人员管理 -->
<style lang="less" scoped>
  @import url("../../../static/less/color.less");

</style>


<template>
  <div class="">
    <i-col span="21">
      <!--<Button type="primary" @click="addUser" style="float: right">新增</Button>-->
      <Breadcrumb class="ml32">
        <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
        <Breadcrumb-item class="blue">用户管理</Breadcrumb-item>
      </Breadcrumb>
      <Collapse v-model="value1" class="aa">
        <Panel name="1">
          条件筛选
          <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="用户账号" prop="username">
                <Input v-model="formInline.username" placeholder="请输入账号"></Input>
              </Form-item>
              <Form-item label="用户密码" prop="password">
                <Input v-model="formInline.password" type="password" placeholder="请输入密码"></Input>
              </Form-item>
              <Button type="primary" @click="submitSearch">搜索</Button>
            </Form>
            <Modal
              v-model="modal1">
              <div slot="header">{{updateTitle}}</div>
              <Form :model="formItem" :label-width="80">
                <Form-item label="用户账号" prop="username">
                  <Input v-model="formItem.username" placeholder="请输入账号"></Input>
                </Form-item>
                <Form-item label="用户密码" prop="password">
                  <Input v-model="formItem.password" type="password" placeholder="请输入密码"></Input>
                </Form-item>
                <Form-item label="用户名称" prop="realname">
                  <Input v-model="formItem.realname" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="用户邮箱" prop="email">
                  <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
                </Form-item>
                <Form-item label="联系方式" prop="mobile">
                  <Input v-model="formItem.mobile" placeholder="请输入联系方式"></Input>
                </Form-item>
                <Form-item label="用户角色" prop="rolename">
                  <Select v-model="formItem.rolename" style="width:162px">
                    <Option v-for="item in rolenameList" :value="item.rolename" :key="item.rolename">{{ item.rolename }}</Option>
                  </Select>
                </Form-item>
                <Form-item label="用户部门" prop="departmentName">
                  <Select v-model="formItem.departmentName" style="width:162px">
                    <Option v-for="item in departmentNameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                  </Select>
                </Form-item>
                <Input v-model="formItem.index" v-if="bucunzai"></Input>
              </Form>
              <div slot="footer">
                <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
                <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
                <Button  @click="cancel">取消</Button>
              </div>
            </Modal>
          </template>
        </Panel>
      </Collapse>
      <div class="center">
        <Table :data="UserData" :columns="theadArr" stripe></Table>
        <Page
          class="pull-right"
          :total="waterRecordPage.total"
          :current="waterRecordPage.current"
          size="small"
          show-total
          @on-change="changePage"
        ></Page>
      </div>
    </i-col>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        urlUserList: "gmmeteo/sys/userinfo/list",
        urlAddUserList: "wtxiqiao/sys/userinfo/new",
        urlUpdateUserList: "wtxiqiao/sys/userinfo/edit",
        urlDeleteUserList: "wtxiqiao/sys/userinfo/delete",
        urlDepartmentNameList: "wtxiqiao/sys/department/list",
        urlRolenameList: "wtxiqiao/sys/role/list",
        modal1: false,
        btnChange: false,
        btnSave: false,
        updateTitle: "",
        formInline:{
          username:'',
          password:'',
          realname:'',
          mobile:''
        },
        waterRecordPage: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        UserData: [],
        rolenameList: [],
        departmentNameList: [],
        bucunzai: '',
        formItem: {},
        theadArr: [{
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "用户账号",
          key: "username"
        }, {
          title: '密码',
          key: 'password'
        }, {
          title: "角色",
          key: "realname"
        },{
          title:'电话',
          key:'mobile'
        }],
      }
    },
    methods:{
      changePage: function(page) {
        this.submitSearch(page);
      },
      ok () {
        this.modal1=false;
        var that = this;
        var params = {};
        params.data = {};
        params.data.system_id = parameters.system_id;
        params.token = this.getKey('token');
        params.url = this.urlAddUserList;
        if(this.formItem.username !=''){
          params.data.username=this.formItem.username;
        }else{
          this.$Notice.warning({
            title: '请填写账号'
          });
          return;
        }
        if(this.formItem.password !=''){
          params.data.password=this.formItem.password;
        }else{
          this.$Notice.warning({
            title: '请填写密码'
          });
          return;
        }
        if(this.formItem.realname !=''){
          params.data.realname=this.formItem.realname;
        }else{
          this.$Notice.warning({
            title: '请填写名称'
          });
          return;
        }
        if(this.formItem.rolename !=''){
          params.data.rolename=this.formItem.rolename;
        }else{
          this.$Notice.warning({
            title: '请选择角色'
          });
          return;
        }
        if(this.formItem.departmentName !=''){
          params.data.departmentName=this.formItem.departmentName;
        }else{
          this.$Notice.warning({
            title: '请选择部门'
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
      },
      cancel () {
        this.modal1=false;
      },
      getRoleNameList: function() {
        var that = this;
        let params = {};
        params.data = {
          system_id : parameters.system_id,
          page : 1,
          pageSize : 10,
          order : {}
        }
        params.token = this.getKey('token');
        params.url = this.urlRolenameList;
        params.success = function(res) {
          that.$Loading.finish();
          that.rolenameList = res.data.result.result;
          console.log(res.data.result);
        }
        this.ajaxPost(params);
      },
      getDepartmentNameList: function() {
        var that = this;
        let params = {};
        params.data = {
          system_id : parameters.system_id,
          page : 1,
          pageSize : 10,
          order : {},
          searchValue : {}
        }
        params.token = this.getKey('token');
        params.url = this.urlDepartmentNameList;
        params.success = function(res) {
          that.$Loading.finish();
          that.departmentNameList = res.data.result.result;
          console.log(that.departmentNameList);
        }
        this.ajaxPost(params);

      },
      submitSearch: function (page) {
        var that = this;
        var params = {};
        params.data = {
          system_id : parameters.system_id,
          pageSize : 10,
          order : {},
          searchValue : {}
        }
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        params.token = this.getKey('token');
        params.url = this.urlUserList;
        if(this.formInline.username !=''){
          params.data.searchValue.username=this.formInline.username;
        }
        if(this.formInline.password !=''){
          params.data.searchValue.password=this.formInline.password;
        }
        if(this.formInline.realname !=''){
          params.data.searchValue.realname=this.formInline.realname;
        }
        if(this.formInline.email !=''){
          params.data.searchValue.email=this.formInline.email;
        }
        if(this.formInline.mobile !=''){
          params.data.searchValue.mobile=this.formInline.mobile;
        }
        if(this.formInline.rolename !=''){
          params.data.searchValue.rolename=this.formInline.rolename;
        }
        if(this.formInline.departmentName !=''){
          params.data.searchValue.departmentName=this.formInline.departmentName;
        }
        params.success = function(res) {
          that.$Loading.finish();
          that.UserData = res.data.result.result;
          that.waterRecordPage.total = res.data.result.totalSize;
          console.log(res.data.result);
        }
        this.ajaxPost(params);
      },
      addUser: function() {
        this.formItem = {
          username:'',
          password:'',
          realname:'',
          email:'',
          mobile:'',
          rolename:'',
          departmentName:'',
          index:''
        };
        this.updateTitle = "新增用户";
        this.btnChange = false;
        this.btnSave = true;
        this.modal1 = true;
      },
      edit: function(index) {
        this.updateTitle = "编辑用户";
        this.btnSave = false;
        this.btnChange = true;
        this.modal1 = true;
        this.formItem.username = this.UserData[index].username;
        this.formItem.password = this.UserData[index].password;
        this.formItem.realname = this.UserData[index].realname;
        this.formItem.email = this.UserData[index].email;
        this.formItem.mobile = this.UserData[index].mobile;
        this.formItem.rolename = this.UserData[index].rolename;
        this.formItem.departmentName = this.UserData[index].departmentName;
        this.formItem.index = index;
      },
      changeNotice: function() {
        var that = this;
        var index = this.formItem.index;
        var params = {};
        params.data = this.UserData[index];
        params.data.system_id = parameters.system_id;
        params.token = this.getKey('token');
        params.url = this.urlUpdateUserList;
        if(this.formItem.username !=''){
          params.data.username=this.formItem.username;
        }else{
          this.$Notice.warning({
            title: '请填写账号'
          });
          return;
        }
        if(this.formItem.password !=''){
          params.data.password=this.formItem.password;
        }else{
          this.$Notice.warning({
            title: '请填写密码'
          });
          return;
        }
        if(this.formItem.realname !=''){
          params.data.realname=this.formItem.realname;
        }else{
          this.$Notice.warning({
            title: '请填写名称'
          });
          return;
        }
        if(this.formItem.rolename !=''){
          params.data.rolename=this.formItem.rolename;
        }else{
          this.$Notice.warning({
            title: '请选择角色'
          });
          return;
        }
        if(this.formItem.departmentName !=''){
          params.data.departmentName=this.formItem.departmentName;
        }else{
          this.$Notice.warning({
            title: '请选择部门'
          });
          return;
        }
        params.data.email = this.formItem.email;
        params.data.mobile = this.formItem.mobile;

        console.log(params);
        params.success=function(){
          that.$Loading.finish();
          that.$Notice.success({
            title: '修改成功'
          });
          that.submitSearch();
        }
        this.ajaxPost(params);
        this.modal1=false;
      },
      del: function(index) {
        var that = this;
        var params = {};
        params.data = {};
        params.data._id=this.UserData[index]._id;
        params.token = this.getKey('token');
        params.url = this.urlDeleteUserList;
        params.success=function(){
          that.$Loading.finish();
          that.$Notice.success({
            title: '删除成功'
          });
          that.submitSearch();
        }

        this.ajaxPost(params);
      }
    },
    mounted: function() {
      this.submitSearch();
      this.getRoleNameList();
      this.getDepartmentNameList();
    }
  }
</script>
