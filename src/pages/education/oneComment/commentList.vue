<template>
  <div class="school">
    <div class="">
      <!-- 头部导航 -->
      <div class="headerBox" style="">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="审核中"  @change="changeExhibition">
              <el-option label="审核中" value="待审核"></el-option>
              <el-option label="拒绝" value="已拒绝"></el-option>
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
        prop="id"
        align="center"
        fixed="left"
        label="id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="objectId"
        align="center"
        fixed="left"
        label="评论对象id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="portrait"
        align="center"
        label="肖像"
        width="200">
        <template slot-scope="scope">
            <img :src="scope.row.portrait" style="width:30%"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        align="center"
        label="昵称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="content"
        align="center"
        label="评论"
        width="600">
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
          <el-button @click="EliteAgree(scope.row.id)" type="text" size="small" style="color:#67C23A">{{EliteAgreeHtml}}</el-button>
          <el-button @click="EliteDisagree(scope.row.id)" type="text" size="small" style="color:red">{{EliteRefuseHtml}}</el-button>
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

    <!-- {{prizeDrawData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import {postCommunityCommentList,postCommunityCommentReject,postCommunityCommentPass} from "@/api/api";
import utils from "@/api/utils.js";
export default {
  data() {
    return {
      input:"",
      currentPage1: 5,
      ExhibitionPageSize:0,
      pageNum:1,
      pageSize:20,
      EliteData:[],
      isCheck:0,
      activeName: '0',
      EliteShow:true,
      EliteAgreeHtml:"通过",
      EliteRefuseHtml:"拒绝",
      WhetherState:true,
      searchState:"",
      form: {
        region:"待审核",
        searchKey:"",
      },
    }
  },
  methods: {
    // 请求审核数据
    getData(){
      let that = this;
      postCommunityCommentList({
        type:this.form.region,
        searchKey:this.form.searchKey,
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }).then(res=>{
        that.EliteData= res.data.list;
        console.log(that.EliteData);
        this.ExhibitionPageSize = res.data.total;
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

      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },

    // 添加学校 跳转详情页面
    schoolAddPage(){
      this.$router.push({path:"/vis/prizeDrawAdd",query:{type:"add"}})
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
        postCommunityCommentPass({
          id:row
        }).then(res => {
          this.$message({
            message: '该信息已通过审核',
            type: 'success'
          });
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        });
      });
     
    },
    //拒绝 删除操作
    EliteDisagree(row){
      this.$confirm('此操作将拒绝通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postCommunityCommentReject({
          id:row
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
      
        this.form.searchKey = this.input
      // console.log()
      this.getData()
    },
    //审核类型
    changeExhibition(){
      this.isCheck = this.form.region;
      console.log(this.form.region)
      if(this.form.region !=  "待审核"){
        this.EliteShow = false;
      }else{
        this.EliteShow = true;
      }
      this.getData();
    },


  },
  created() {
    this.getData()
  }
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
</style>
