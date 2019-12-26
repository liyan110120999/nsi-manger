<template>
  <diV>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <i style="font-size:50px" class="iconfont icon-shenhe"></i>
          </div>
          <div class="card-panelRight">
            <div class="card-panel-description">
              <div class="card-panel-text">审核总数</div>
              <div class="card-panel-text">{{chartData.bookCount}}</div>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">审核通过</div>
              <div class="card-panel-text">{{chartData1.bookCount}}</div>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">审核拒绝</div>
              <div class="card-panel-text">{{chartData2.bookCount}}</div>
            </div>
          </div>
          
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <i style="font-size:50px" class="iconfont icon-shuju"></i>
          </div>
          <div class="card-panelRight">
            <div class="card-panel-description">
              <div class="card-panel-text">用户</div>
              <div class="card-panel-text">{{chartData.courseCount}}</div>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">帖子</div>
              <div class="card-panel-text">{{chartData1.courseCount}}</div>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">评论</div>
              <div class="card-panel-text">{{chartData2.courseCount}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="card"> 
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最新帖子</div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最热帖子</div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-col>
    </div>
    <div class="card"> 
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最新注册</div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最近活跃</div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-col>
    </div>
    <my-echarts></my-echarts>
  </diV>

</template>

<script>
import Myecharts from "../../components/dataModule/echarts"
export default {
  data(){
    return{
      chartData:[],
      chartData1:[],
      chartData2:[],
      yeartotalPrice:{},
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components:{
    "my-echarts":Myecharts
  },
  methods: {
    getChartData(nexturl) {
      let that=this
      return new Promise(function(resolve,reject){
          let url=that.baseUrl + nexturl
          that.$axios.get(url).then(function(response){
              resolve(response.data.data)
          }).catch(function (response){
            reject(response)
          });
      })
    }
  },
  created(){
    let that=this
    Promise.all([that.getChartData('/manager/index/get_month_list.do'),
                that.getChartData('/manager/index/get_week_list.do'),
                that.getChartData('/manager/index/get_today_list.do'),
                that.getChartData('/manager/index/get_year_list.do')]).then(function(arr){
      console.log(arr)
      that.chartData=arr[0]
      that.chartData1=arr[1]
      that.chartData2=arr[2]
      that.yeartotalPrice.totalPrice=arr[3]['2019']
      that.yeartotalPrice.kechengNum=arr[3]['课程']
      that.yeartotalPrice.shudianNum=arr[3]['书店']
    },function(){
      console.log('至少有一个失败了')
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    display:flex;
    
    flex-direction: row;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {

        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #40c9c6
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panelRight{
      width:100%;
      display:flex;
      justify-content:center;
    flex-direction: row;
    }
    .card-panel-icon-wrapper {
      
      margin: 14px 0 14px 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      width: 33%;
      float: right;
      font-weight: bold;
      margin: 26px 0;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.card{
  overflow: hidden;
  margin-left: -20px;
  margin-right: -20px;
  .card-panel-col{
    padding-left: 20px;
    padding-right: 20px;
  }
  .Title{
    font-size: 22px;
    color: #899;
    margin-top: 20px;
    margin-bottom: 10px;  
  }
  
}
</style>
