<template>
  <diV>
    <div class="headerModer">
      <div class="header_box header_box_hover" @click="BtnUpCardList">
        <div>
          <i style="font-size:30px" class="iconfont icon-shenhe"></i>
          <ul>
            <li>帖子</li> 
            <li>(待审核)</li> 
          </ul>
        </div>
        <div>{{chartData.post_count}}</div>
      </div>
      <div class="header_box header_box_hover" @click="BtnUpOneCommentList">
        <div>
          <i style="font-size:30px" class="iconfont icon-shenhe"></i>
          <ul>
            <li>评论</li> 
            <li>(待审核)</li> 
          </ul>  
        </div>
        <div>{{chartData.comment_all_count}}</div>
      </div>
      <div class="header_box header_box_hover" @click="BtnUpTwoComment">
        <div>
          <i style="font-size:30px" class="iconfont icon-shenhe"></i>
          <ul>
            <li>子评论</li> 
            <li>(待审核)</li> 
          </ul>
        </div>
        <div>{{chartData.commentSon_count}}</div>
      </div>
      <div class="header_box">
        <div><i style="font-size:30px" class="iconfont icon-yonghu"></i>
          <ul>
            <li>用户</li> 
            <li>(全部)</li> 
          </ul>
        </div>
        <div>{{chartData.user_all_count}}</div>
      </div>
      <div class="header_box">
        <div><i style="font-size:30px" class="iconfont icon-tiezi"></i>
          <ul>
            <li>帖子</li> 
            <li>(全部)</li> 
          </ul>
        </div>
        <div>{{chartData.post_all_count}}</div>
      </div>
      <div class="header_box">
        <div><i style="font-size:30px" class="iconfont icon-pinglun"></i>
          <ul>
            <li>评论</li> 
            <li>(全部)</li> 
          </ul>
        </div>
        <div>{{chartData.comment_all_count}}</div>
      </div>
    </div>
    <div class="card"> 
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最新帖子</div>
          <el-table
            :data="lastList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="nickName"
              label="姓名"
              :show-overflow-tooltip="true"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              :show-overflow-tooltip="true"
              width="400"
              align="center">
            </el-table-column>
            <el-table-column
              prop="commentNum"
              label="评论数"
              :show-overflow-tooltip="true"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="时间"
              :show-overflow-tooltip="true"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最热帖子</div>
          <el-table
            :data="hotList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="nickName"
              label="姓名"
              :show-overflow-tooltip="true"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              :show-overflow-tooltip="true"
              width="400"
              align="center">
            </el-table-column>
            <el-table-column
              prop="commentNum"
              label="评论数"
              :show-overflow-tooltip="true"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="时间"
              :show-overflow-tooltip="true"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
    </div>
    <div class="card"> 
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最新注册</div>
          <el-table
            :data="list_create"
            stripe
            style="width: 100%">
            <el-table-column
              prop="gradeSign"
              label="等级"
              :show-overflow-tooltip="true"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="头像"
              :show-overflow-tooltip="true"
              width="180"
              align="center">
                <template slot-scope="scope">
                  <img style="width:20%" :src="scope.row.wechatPortrait" />
                </template>
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="姓名"
              :show-overflow-tooltip="true"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="日期"
              :show-overflow-tooltip="true"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="Title">最近活跃</div>
          <el-table
            :data="list_update"
            stripe
            style="width: 100%">
            <el-table-column
              prop="gradeSign"
              label="等级"
              :show-overflow-tooltip="true"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              label="头像"
              :show-overflow-tooltip="true"
              width="180"
              align="center">
                <template slot-scope="scope">
                  <img style="width:20%" :src="scope.row.wechatPortrait" />
                </template>
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="姓名"
              :show-overflow-tooltip="true"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="日期"
              :show-overflow-tooltip="true"
              align="center">
            </el-table-column>
          </el-table>
        </el-col>
    </div>
    <my-echarts></my-echarts>
  </diV>

</template>

<script> 
import Myecharts from "../../components/dataModule/echarts";
import {postItemIndexList,postItemPanelList,postCommunityPanelNumber} from "@/api/api"
export default {
  data(){
    return{
      hotList:[],//帖子 热
      lastList:[],//帖子 新
      list_create:[],//用户 注册
      list_update:[],//用户 活跃
      chartData:"",
      yeartotalPrice:{}
    }
  },
  components:{
    "my-echarts":Myecharts
  },
  methods: {
    //旧数据
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
    },
    //最新数据
    getData(){
      //帖子
      postItemIndexList({
      }).then(res => {
        this.hotList = res.data.hotList;
        this.lastList = res.data.lastList;
        
        //时间戳 转换时间
        function formatDate(now) {
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var date=now.getDate();
          var hour=now.getHours();
          var minute=now.getMinutes();
          var second=now.getSeconds();
          return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        }
        //如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成整型
        for(var i=0; i<res.data.hotList.length; i++){
          var d=new Date(res.data.hotList[i].updateTime);
          this.hotList[i].updateTime = formatDate(d);
        }
        for(var i=0; i<res.data.lastList.length; i++){
          var d=new Date(res.data.lastList[i].updateTime);
          this.lastList[i].updateTime = formatDate(d);
        }
        console.log(res.data.hotList)
      })
      //用户
      postItemPanelList({
      }).then(res => {
        this.list_create = res.data.list_create;
        this.list_update = res.data.list_update;
        //时间戳 转换时间
        function formatDate(now) {
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var date=now.getDate();
          var hour=now.getHours();
          var minute=now.getMinutes();
          var second=now.getSeconds();
          return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        }
        //如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成整型
        for(var i=0; i<res.data.list_create.length; i++){
          var d=new Date(res.data.list_create[i].updateTime);
          this.list_create[i].updateTime = formatDate(d);
        }
        for(var i=0; i<res.data.list_update.length; i++){
          var d=new Date(res.data.list_update[i].updateTime);
          this.list_update[i].updateTime = formatDate(d);
        }
      })
      //数据面板
      postCommunityPanelNumber({

      }).then(res => {
        this.chartData = res.data;
        console.log(this.chartData)
      })
    },
    //跳转帖子审核
    BtnUpCardList(){
      this.$router.push({path:"/card/cardList",query:{}});
    },
    //跳转评论审核
    BtnUpOneCommentList(){
      this.$router.push({path:"/oneComment/commentList",query:{}});
    },
    //跳转子评论审核
    BtnUpTwoComment(){
      this.$router.push({path:"/twoComment/commentList",query:{}});
    }

  },
  created(){
    // let that=this
    // Promise.all([that.getChartData('/manager/index/get_month_list.do'),
    //             that.getChartData('/manager/index/get_week_list.do'),
    //             that.getChartData('/manager/index/get_today_list.do'),
    //             that.getChartData('/manager/index/get_year_list.do')]).then(function(arr){
    //   that.chartData=arr[0]
    //   that.chartData1=arr[1]
    //   that.chartData2=arr[2]
    //   that.yeartotalPrice.totalPrice=arr[3]['2019']
    //   that.yeartotalPrice.kechengNum=arr[3]['课程']
    //   that.yeartotalPrice.shudianNum=arr[3]['书店']
    // },function(){
    //   console.log('至少有一个失败了')
    // })
    //请求数据
    this.getData()
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
.headerModer{
  height: 200px;
  background:#fff;
  display: flex;
  justify-content:space-around;
  .header_box{
    padding: 0 26px;
    height: 150px;
    margin-top: 25px;
    div:nth-child(1){
      height: 50px;
      // line-height: 40px;
      margin-top: 5px;
      font-size: 25px;
      color: #555;
      display: flex;
      i{
        margin-right: 10px;
        padding: 10px ;
        border-radius: 8px;
        // color: #36a3f7;
      }
      ul{
        li:last-child{
          margin-top: 5px; 
          font-size: 13px;
          color: #777;
        }

      }
    }
    div:nth-of-type(2){
      font-weight:inherit;
      font-size: 45px;
      margin-top: 30px;
    }
  }
  :last-of-type{
    border:none;
  }
  .header_box_hover:hover{
    cursor:pointer;
  }
  :hover{
    .icon-shenhe{
      background: #36a3f7;
      color: #fff;
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
