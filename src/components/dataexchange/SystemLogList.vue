<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="20">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据交换</Breadcrumb-item>
          <Breadcrumb-item class="blue">系统日志</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="所属模块" prop="src">
                  <Input v-model="formInline.src" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="时间" prop="time">
                  <Date-picker type="time" placeholder="选择日期和时间" @on-change="datetimeChange" format="yyyy-MM-dd HH:mm"></Date-picker>
                </Form-item>
                <Form-item label="结果" prop="action">
                  <Input v-model="formInline.action" placeholder="请输入请求动作"></Input>
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
        collectionLogListUrl: '',
        formInline: {
          src:'',
          action:'',
          time:'',
        },
        dataSourceList:[
          {
            "src" : "class com.gykj.nhwaterworker.Worker",
            "param" : "{\"_id\":\"5911abcfa3f4e422ec032dbe\",\"tsid\":\"2319\"}",
            "action" : "edit",
            "time" : "2017-05-23 10:08:04",
            "message" : "修改失败",
            "type" : "FATAL",
          },

          /* 2 createdAt:2017/5/31 上午10:00:47*/
          {
            "src" : "class wtintelligence_handler.wtintelligence_handler.CustomQueryHandler",
            "param" : "{\"page\":1,\"pageSize\":20,\"searchValue\":{\"预案类型\":\"部门预案\",\"预案编号\":\"201700001\"}}",
            "action" : "inLineQuery",
            "time" : "2017-05-31 10:00:07",
            "message" : "接收到sruts请求",
            "type" : "INFO",
          },

          /* 3 createdAt:2017/5/31 上午10:00:47*/
          {
            "src" : "class wtintelligence_handler.wtintelligence_handler.CustomQueryHandler",
            "param" : "{\"page\":1,\"pageSize\":20,\"searchValue\":{\"预案类型\":\"部门预案\",\"预案编号\":\"201700001\"}}",
            "action" : "inLineQuery",
            "time" : "2017-05-31 10:00:08",
            "message" : "查找内嵌文档失败！",
            "type" : "ERROR",
          },

          /* 4 createdAt:2017/5/31 上午10:02:32*/
          {
            "src" : "class wtintelligence_handler.wtintelligence_handler.CustomQueryHandler",
            "param" : "{\"page\":1,\"pageSize\":20,\"searchValue\":{\"预案类型\":\"部门预案\",\"预案编号\":\"201700001\"}}",
            "action" : "inLineQuery",
            "time" : "2017-05-31 10:01:53",
            "message" : "接收到sruts请求",
            "type" : "INFO",
          },

          /* 5 createdAt:2017/5/31 上午10:02:57*/
          {
            "src" : "class wtintelligence_handler.wtintelligence_handler.CustomQueryHandler",
            "param" : "{\"page\":1,\"pageSize\":20,\"searchValue\":{\"预案类型\":\"部门预案\",\"预案编号\":\"201700001\"}}",
            "action" : "inLineQuery",
            "time" : "2017-05-31 10:02:18",
            "message" : "查找内嵌文档失败！",
            "type" : "ERROR",
          }
        ],
        theadArr: [{
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },{
            title: "所属模块",
            key: "src",
          }, {
            title: "参数",
            key: "param"
          }, {
            title: "请求动作",
            key: "action",
          }, {
          title: "时间",
          key: "time",
        }, {
          title: "消息",
          key: "message",
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
        };
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.src !=''){
          params.data.searchValue.src=this.formInline.src + "|#|like";
        }
        if(this.formInline.action !=''){
          params.data.searchValue.action=this.formInline.action + "|#|like";
        }
        if(this.formInline.time !=''){
          params.data.searchValue.time =this.formInline.time;
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
      datetimeChange: function(time) {
        this.formInline.time = time;
      }
    },
    mounted: function() {
      //this.submitSearch();
    }
  }
</script>
