<template>
  <div class="school">
    <div class="">
      <!-- 头部导航 -->
      <div class="headerBox" style="">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="审核中"  @change="changeExhibition">
              <el-option label="审核中" value="0"></el-option>
              <el-option label="拒绝" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="headerBox headerBox_two">
          <el-input class="headerBox_three" v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="EliteData"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="itemId"
        align="center"
        fixed="left"
        label="id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="nickName"
        align="center"
        label="昵称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="标题"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        label="评论"
        width="600">
        <template slot-scope="scope">
          <p @click="contentBtn(scope.row.content,scope.row.itemId)" class="hoveColor">{{scope.row.content}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        width="200">
      </el-table-column>


      <el-table-column
        fixed="right"
        label="操作"
        align="center"  
        width="100"
        v-if="EliteShow">
        <template slot-scope="scope">
          <el-button @click="EliteAgree(scope.row.itemId)" type="text" size="small" style="color:#67C23A">{{EliteAgreeHtml}}</el-button>
          <el-button @click="EliteDisagree(scope.row.itemId)" type="text" size="small" style="color:red">{{EliteRefuseHtml}}</el-button>
        </template>
      </el-table-column>


    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="ExhibitionPageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {postItemList,postItemUpdate} from "@/api/api";
import utils from "@/api/utils.js";
//引入编辑器
import E from 'wangeditor'
import Cropper from "cropperjs"
export default {
  data() {
    return {
      input:"",
      currentPage1: 5,
      ExhibitionPageSize:0,
      pageNum:1,
      pageSize:50,
      EliteData:[],
      isCheck:0,
      activeName: '0',
      EliteShow:true,
      EliteAgreeHtml:"通过",
      EliteRefuseHtml:"拒绝",
      WhetherState:true,
      searchState:"",
      dialogVisible:false,//dialog
      articleContent:"", //编辑器的值
      form: {
        region:"0",
        searchKey:"",
      },
    }
  },
  methods: {
    // 请求审核数据
    getData(){
      let that = this;
      postItemList({
        pageNum:1,
        pageSize:10,
        isCheck:this.form.region,
        title:this.input
      }).then(res=>{
        this.ExhibitionPageSize = res.data.total;
        that.EliteData= res.data.list;
        console.log(that.EliteData);
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
        for(var i=0; i<res.data.list.length; i++){
          var d=new Date(res.data.list[i].createTime);
          this.EliteData[i].createTime = formatDate(d);
        }
        for(var i=0; i<res.data.list.length; i++){
          var d=new Date(res.data.list[i].updateTime);
          this.EliteData[i].updateTime = formatDate(d);
        }

      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },

    // 添加学校 跳转详情页面
    schoolAddPage(){
      
    },
    // 每页多少条
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getData()
    },
    //通过 编辑按钮
    EliteAgree(row) {
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        postItemUpdate({
          itemId:row,
          isCheck:1
        }).then(res => {
          if(res.code == 0){
            this.$message({
              message: '该信息已通过审核',
              type: 'success'
            });
          }else{
            this.$message({
              message: '该信息审核失败',
              type: 'error'
            });
          }
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        });
      });
     
    },
    // 删除操作
    EliteDisagree(row){
      this.$confirm('此操作将拒绝通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postItemUpdate({
          itemId:row,
          isCheck:2
        }).then(res => {
          this.$message({
            message: '该信息已拒绝通过',
            type: 'success'
          });
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      
    },
    //搜索
    schoolSearch(){
      // console.log()
      this.getData()
    },
    //审核类型
    changeExhibition(){
      this.isCheck = this.form.region;
      console.log(this.form.region)
      if(this.form.region !=  "0"){
        this.EliteShow = false;
      }else{
        this.EliteShow = true;
      }
      this.getData();
    },
    //查看评论 富文本编辑器
    contentBtn(row,id){
      localStorage.setItem("code",row);
      this.$router.push({path:"/card/cardDetail",query:{itemId:id}})
    }

  },
  mounted(){
    this.getData();
  },
  created() {
    
  },
}

</script>

<style lang="scss" scoped>
  .block{
    margin-top: 30px;
  }
  .EilteTab{
    .el-tabs__nav{
      .el-tabs__item{
        &:nth-of-type(1){
          color: #409eff !important;
        }
        &:nth-of-type(2){
          color: #67c23a !important;
        }
        &:last-of-type{
          color:#f56c6c !important;
        }
      }
      .is-active {
        background: #dedbdb !important;
        box-shadow: #ceced0 0px 0px 2px 2px inset;
        border-top-left-radius:4px;
        border-top-right-radius:4px;
      }
    }
  }
  .headerBox{
    float: left;
  }
  .headerBox_three{
      width: 200px;
  }
  .headerBox_two{
    // width: 630px;
    margin-left: 200px;
   
    form{
      input{
        width: 120px;
      }
    }
    form,.headerBox_three,button{
      float: left;
      margin-left: 10px;
    }
  }
  .hoveColor:hover{
    color: #1e88e5;
    cursor:pointer;
  }
</style>
