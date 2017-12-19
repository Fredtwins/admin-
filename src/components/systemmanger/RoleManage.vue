<!-- 人员管理 -->
<style lang="less" scoped>
  @import url("../../../static/less/color.less");

</style>


<template>
  <div class="">
    <i-col span="21">
      <Breadcrumb class="ml32">
        <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
        <Breadcrumb-item class="blue">角色管理</Breadcrumb-item>
      </Breadcrumb>
      <Collapse v-model="value1" class="aa">
        <Panel name="1">
          条件筛选
          <template slot="content">
            <Form ref="formInline" :model="formInline" inline :label-width="80">
              <Form-item label="角色名称" prop="rolename">
                <Input v-model="formInline.rolename" placeholder="请输入名称"></Input>
              </Form-item>
              <Form-item label="角色描述" prop="description">
                <Input v-model="formInline.description" type="password" placeholder="请输入描述"></Input>
              </Form-item>
              <Button type="primary" @click="submitSearch">搜索</Button>
            </Form>
            <Modal
              v-model="modal1">
              <div slot="header">{{updateTitle}}</div>
              <Form :model="formItem" :label-width="80">
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
        <Table :data="rolenameList" :columns="theadArr" stripe></Table>
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
        urlUserList: "wtxiqiao/sys/userinfo/list",
        urlAddUserList: "wtxiqiao/sys/userinfo/new",
        urlUpdateUserList: "wtxiqiao/sys/userinfo/edit",
        urlDeleteUserList: "wtxiqiao/sys/userinfo/delete",
        urlDepartmentNameList: "wtxiqiao/sys/department/list",
        urlRolenameList: "gmmeteo/sys/role/list",
        modal1: false,
        btnChange: false,
        btnSave: false,
        updateTitle: "",
        formInline:{
          rolename:'',
          description:''
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
          title: "角色名称",
          key: "rolename"
        }, {
          title: "角色描述",
          key: "description"
        },/*{
          title: '用户操作',
          align: 'center',
          width: 200,
          render: (h, param) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight : '5px'
                },
                on: {
                  click: () => {
                    this.edit(param.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.del(param.index)
                  }
                }
              }, '删除')
            ]);
          }
        }*/],
      }
    },
    methods:{
      changePage: function(page) {
        this.submitSearch(page);
      },
      getRoleNameList: function() {
        var that = this;
        let params = {};
        params.data = {
          system_id : parameters.system_id,
          page : 1,
          pageSize : 50,
          order : {}
        }
        params.token = this.getKey('token');
        params.url = this.urlRolenameList;
        if(this.formInline.rolename !=''){
          params.data.searchValue.rolename=this.formInline.rolename + "|#|like";
        }
        if(this.formInline.description !=''){
          params.data.searchValue.description=this.formInline.description + "|#|like";
        }
        params.success = function(res) {
          that.$Loading.finish();
          that.rolenameList = res.data.result.result;
          that.waterRecordPage.total = res.data.result.totalSize;
          console.log(res.data.result);
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
        if(this.formInline.rolename !=''){
          params.data.searchValue.rolename=this.formInline.rolename ;
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
    },
    mounted: function() {
      this.submitSearch();
      this.getRoleNameList();
      this.getDepartmentNameList();
    }
  }
</script>
