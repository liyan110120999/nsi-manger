<template>
  <div class="school">
    <div class="">
      <!-- 头部导航 -->
      <div class="headerBtn" style="">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="最新注册"  @change="changeExhibition">
              <el-option label="最新注册" value="最新注册"></el-option>
              <el-option label="最近活跃" value="最近活跃"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="headerBtn">
          <div>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button type="success" icon="el-icon-search" @click="educationSearch">搜索</el-button>

          </div>
        </div>
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
        prop="nickname"
        align="center"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="openId"
        align="center"
        label="openId"
        width="200">
      </el-table-column>
     
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        width="200">
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
import {postCommunityUserList} from "@/api/api";
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
      WhetherState:true,
      orderBy:"最新注册",
      searchKey:"",
      form: {
        region:""
      },
    }
  },
  methods: {
    // 请求审核数据
    getData(){
      let that = this;
      postCommunityUserList({
        orderBy:this.orderBy,
        searchKey:this.searchKey
      }).then(res=>{
          console.log(res);
        that.EliteData= res.data.list;
        this.ExhibitionPageSize = res.data.total;
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
        for(var i=0; i<res.data.length; i++){
          var d=new Date(res.data[i].createTime);
          console.log(d)
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
    //搜索
    educationSearch(){
      this.searchKey = this.input;
      this.getData()
    },
    //审核类型
    changeExhibition(){
      this.orderBy = this.form.region;
      //   if(this.form.region !=  0){
      //     this.EliteShow = false;
      //   }else{
      //     this.EliteShow = true;
      //   }
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
</style>
