<style lang="less">
  @import url("../../../static/less/color.less");
  .ivu-table th{background-color: @navBg;font-weight: 900}
</style>
<template>
  <div class="">
    <row>
      <i-col span="21">
        <Breadcrumb class="ml32">
          <Breadcrumb-item class="black">报表统计</Breadcrumb-item>
          <Breadcrumb-item class="blue">单站多时极值对比查询</Breadcrumb-item>
        </Breadcrumb>
        <Collapse accordion value="1" class="aa">
          <Panel name="1">
            条件筛选
            <template slot="content">
              <Form ref="formInline" :model="formInline" inline :label-width="80">
                <Form-item label="站点名称" prop="station_name">
                  <Input v-model="formInline.station_name" placeholder="请选择站点"></Input>
                </Form-item>
                <Form-item label="时间" prop="datetime">
                  <Date-picker type="datetime" placeholder="选择日期和时间" @on-change="datetimeChange" format="yyyy-MM"></Date-picker>
                </Form-item>
                <Form-item label="时次" prop="datetime">
                  <Select v-model="formInline.hour" style="width:150px">
                    <Option v-for="item in hoursList" :value="item"/>
                  </Select>
                </Form-item>
                <Button type="primary" @click="submitSearch">搜索</Button>
              </Form>
            </template>
          </Panel>
        </Collapse>
        <div class="center">
          <Table :data="dataSourceList" :columns="theadArr" stripe size="small" border></Table>
          <Page
            class="pull-right"
            :total="recordPage.total"
            :current="recordPage.current"
            size="small"
            show-total
            @on-change="changePage"
            :page-size="recordPage.pageSize"
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
        collectionLogListUrl: 'gmmeteo/datacenter/hourextremum/list',
        formInline: {
          station_name : "",
          datetime : "",
          hour:""
        },
        hoursList:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
        dataSourceList:[],
        theadArr: [{
          title:"编号",
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: "站点名称",
          key: "station_name",
          width:200
        }, {
          title: "最高温",
          key: "tmax",
          sortable: true
        }, {
          title: "最高温出现时间",
          key: "tmaxtime",
        }, {
          title:'最低温',
          key:'tmin',
          sortable: true
        }, {
          title:'最低温出现时间',
          key:'tmintime',
        }, {
          title:'最大湿度',
          key:'umax',
          sortable: true
        }, {
          title:'最大湿度出现时间',
          key:'umaxtime',
        }, {
          title:'最小湿度',
          key:'umin',
          sortable: true
        }, {
          title:'最小湿度出现时间',
          key:'umintime',
        }, {
          title:'时最高气压(hPa) ',
          key:'pmax',
          sortable: true
        }, {
          title:'时最高气压出现时间',
          key:'pmaxtime',
        }, {
          title:'时最低气压(hPa)',
          key:'pmin',
          sortable: true
        }, {
          title:'时最低气压出现时间',
          key:'pmintime',
        }, {
          title:'时3秒最大瞬间风速(m/s)',
          key:'wf3smax',
          sortable: true
        }, {
          title:'时3秒最大瞬间风速出现时间',
          key:'wf3smaxtime',
        }, {
          title:'时最大10分钟平均风速(m/s)',
          key:'wf10max',
          sortable: true
        }, {
          title:'时最大10分钟平均风速出现时间',
          key:'wf10maxtime',
        }, {
          title:'累计雨量',
          key:'r1',
        }, {
          title:'统计时间',
          key:'datetime',
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
          order : {datetime:-1},
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
        if(this.formInline.datetime){
          params.data.searchValue.datetime=this.formInline.datetime;
        }
        if(this.formInline.station_name){
          params.data.searchValue.station_name =this.formInline.station_name;
        }
        console.log(params.data);
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
        this.formInline.datetime = datetime;
      }
    },
    mounted: function() {
      this.submitSearch();
    }
  }
</script>
