<template>
  <div class="school">
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
      isCheck:1,
      activeName: '0',
      EliteShow:true,
      EliteAgreeHtml:"编辑",
      EliteRefuseHtml:"删除",
      searchState:"",
      form: {
        searchKey:"",
        username:"",
        telphone:"",
        region:"",
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
    //编辑按钮
    EliteAgree(row) {
        this.$router.push({path:'/siku/sikuEliteDetail',query:{talentId:row}});
        console.log("编辑")
    },
    //删除操作
    EliteDisagree(row){
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
    },
    //搜索选择类型
    changeSearch(){
      if(this.form.searchKey == "username"){
        this.searchState = "one"
      }else if(this.form.searchKey == "telphone"){
        this.searchState = "two"
      }else if(this.form.searchKey == "userMail"){
        this.searchState = "three"
      }
      console.log(this.form.searchKey);
      console.log(this.searchState)
    },
    //搜索
    schoolSearch(){
      console.log(this.searchState)
      if(this.searchState == "one"){
        this.form.username = this.input
      }else if(this.searchState == "two"){
        this.form.telphone = this.input
      }else if(this.searchState == "three"){
        console.log("111111")
        this.form.userMail = this.input
      }
      this.getData()
    },
    //审核类型
    changeExhibition(){
      console.log()
      if(this.form.region !=  1){
        this.EliteShow = false;
      }else{
        this.EliteShow = true;
      }
      this.isCheck = this.form.region;
      this.getData();
    },
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" >
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
