<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据管理</Breadcrumb-item>
          <Breadcrumb-item class="blue">数据警戒值</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="名称" prop="name">
                  <Input v-model="formInline.name[0]" placeholder="请输入任务名称"></Input>
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
        urlTaskConfigList:'gmmeteo/datacenter/warningvalue/list',
        formInline: {
          name:[],
        },
        dataSourceList:[],
        theadArr: [{
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "数据名称",
          key: "name",
        }, {
          title: "上限警戒值",
          key: "maxValue"
        }, {
          title: "下限警戒值",
          key: "minValue"
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
          order : {},
          searchValue : {}
        }
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.urlTaskConfigList;
        if(this.formInline.name[0]){
          params.data.searchValue.name=this.formInline.name[0] + "|#|like";
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
      datetimeChange: function() {

      }
    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
