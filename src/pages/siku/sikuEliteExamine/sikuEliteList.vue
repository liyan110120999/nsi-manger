<template>
  <div class="school">
    <div class="headerBtn">
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
          <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="搜索内容">
              <el-select v-model="form.searchKey" placeholder="请选择"  @change="changeSearch">
                <el-option label="姓名" value="username"></el-option>
                <el-option label="电话" value="telphone"></el-option>
                <el-option label="邮箱" value="userMail"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
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
        prop="username"
        align="center"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="sex"
        align="center"
        label="性别"
        width="200">
      </el-table-column>
      <el-table-column
        prop="telphone"
        align="center"
        label="电话"
        width="200">
      </el-table-column>
      <el-table-column
        prop="userMail"
        align="center"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="isCheck"
        align="center"
        label="审核状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="isPublic"
        align="center"
        label="是否公开"
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
import {getNewTalentList,postNewTalentUdpate,postNewTalentDelete} from "@/api/api";
import utils from "@/api/utils.js";
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
      form: {
        username:"",
        telphone:"",
        region:"",
        searchKey:"",
        userMail:""
      },
    }
  },
  methods: {
    // 请求审核数据
    getData(){
      let that = this;
      getNewTalentList({
        pageNum:that.pageNum,
        pageSize:that.pageSize,
        isCheck:that.isCheck,
        username:this.form.username,
        telphone:this.form.telphone,
        userMail:this.form.userMail
      }).then(res=>{
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
      if(this.WhetherState){
        this.$confirm('此操作将通过审核, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postNewTalentUdpate({
            id:row,
            isCheck:1
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
      }else{
        this.$router.push({path:'/siku/sikuEliteDetail',query:{talentId:row}});
        console.log("编辑")
      }
    },
    //拒绝 删除操作
    EliteDisagree(row){
      console.log(row)
      if(this.WhetherState){
        this.$confirm('此操作将拒绝通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postNewTalentUdpate({
            id:row,
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
      }else{
        this.$confirm('此操作将删除信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postNewTalentDelete({
            talentId:row
          }).then(res => {
            this.$message({
              message: '该信息已删除',
              type: 'success'
            });
            this.getData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    //搜索选择类型
    changeSearch(){
      if(this.form.searchKey == "username"){
        this.searchState = "one"
      }else if(this.form.searchKey == "telphone"){
        this.searchState = "two"
      }else(
        this.searchState = "three"
      ) 
      console.log(this.form.searchKey == "username")
    },
    //搜索
    schoolSearch(){
      if(this.searchState == "one"){
        this.form.username = this.input
      }else if(this.searchState == "two"){
        this.form.telphone = this.input
      }else{
        this.form.userMail = this.input
      }
      // console.log()
      this.getData()
    },
    //审核类型
    changeExhibition(){
      this.isCheck = this.form.region;
      if(this.form.region !=  0){
        this.EliteShow = false;
      }else{
        this.EliteShow = true;
      }
      this.getData();
      console.log(this.form.region)
    },


  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" >
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
  .headerBox_three{
      width: 200px;
  }
  .headerBtn{
    // width: 1400px;
    
  }
  .headerBox_two{
    // width: 630px;
    .headerBox_three{
      width: 200px;
    }
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
