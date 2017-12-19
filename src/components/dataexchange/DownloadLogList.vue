<style lang="less">
  @import url("../../../static/less/color.less");
</style>
<template>
  <div class="">
    <row>
      <i-col span="20">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">数据交换</Breadcrumb-item>
          <Breadcrumb-item class="blue">下载日志列表</Breadcrumb-item>
        </Breadcrumb>
        <Collapse class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="文件名" prop="taskName">
                  <Input v-model="formInline.filename" placeholder="请输入文件名"></Input>
                </Form-item>
                <Form-item label="作用描述" prop="description">
                  <Input v-model="formInline.description" placeholder="请输入作用描述"></Input>
                </Form-item>
                <Form-item label="时间" prop="time">
                  <Date-picker type="time" placeholder="选择日期和时间" @on-change="datetimeChange" format="yyyy-MM-dd HH:mm"></Date-picker>
                </Form-item>
                <Form-item label="结果" prop="status">
                  <Select v-model="formInline.status" style="width:162px">
                    <Option value="下载成功">下载成功</Option>
                    <Option value="下载失败">下载失败</Option>
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
        collectionLogListUrl: '',
        formInline: {
          filename:'',
          description:'',
          time:'',
          result:'',
        },
        dataSourceList:[
          {
            "filename" : "立体云图",
            "description" : "下载每个小时的立体云图",
            "time" : "	2017-08-28 11:01:15.0",
            "result" : "下载成功",
          },
          {
            "filename" : "高明雷达图",
            "description" : "高明雷达图",
            "time" : "	2017-08-28 10:45:43.0",
            "result" : "无图片",
          }
        ],
        theadArr: [{
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },{
          title: "文件名",
          key: "filename",
        }, {
          title: "作用描述",
          key: "description"
        }, {
          title: "时间",
          key: "time",
        },{
          title: "结果",
          key: "result",
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
        params.data.searchValue.logType = '同步';
        if(page === undefined || page === ""){
          params.data.page = 1;
        }else{
          params.data.page = page;
        }
        console.log(params.data);
        params.token = this.getKey('token');
        params.url = this.collectionLogListUrl;
        if(this.formInline.taskName !=''){
          params.data.searchValue.taskName=this.formInline.taskName + "|#|like";
        }
        if(this.formInline.logTime !=''){
          params.data.searchValue.logTime=this.formInline.logTime + "|#|like";
        }
        if(this.formInline.result !=''){
          params.data.searchValue.result =this.formInline.result;
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
      //this.submitSearch();
    }
  }
</script>
