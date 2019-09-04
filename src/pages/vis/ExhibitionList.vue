<template>
  <div class="school">
    <!-- 头部导航 -->
    <div class="headerBtn" style="">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择学校类型">
            <el-option label="民办" value="shanghai"></el-option>
            <el-option label="公办" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="headerBtnRight">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
      </div>
      <div class="headerBtnLeft">
          <el-button type="primary" @click="schoolAddPage">添加展商</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="ExhibitionData"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        align="center"
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="boothNum"
        align="center"
        fixed="left"
        label="展位号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="id"
        align="center"
        label="ID"
        width="90">
      </el-table-column>
      <el-table-column
        prop="exhibitorName"
        align="center"
        label="公司"
        :show-overflow-tooltip="true"
        width="300">
      </el-table-column>
      <el-table-column
        prop="logoIcon"
        align="center"
        label="图片"
        :show-overflow-tooltip="true"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.logoIcon" style="width:50px;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        align="center"
        label="简介"
        :show-overflow-tooltip="true"
        width="350">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="时间"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="ExhibitionDetail(scope.row.id)" type="text" size="small" style="color:#67C23A">编辑</el-button>
          <el-button @click="SchoolDelete(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
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

    <!-- {{ExhibitionData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import QS from 'qs';
import { getExhibitorList } from "@/api/api";

import utils from "@/api/utils.js";
import bus from "@/api/bus";
import store from '../../vuex/store.js';
export default {
  data() {
    return {
      input:"",
      ExhibitionData:[],
      currentPage1: 5,
      ExhibitionPageSize:0,
      pageNum:1,
      pageSize:20,
      centerDialogVisible: false,//弹出框
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  methods: {
    // 请求学校数据
    getExhibitionData(){
      let that = this;
      getExhibitorList({
        pageNum : that.pageNum,
        pageSize : that.pageSize,
        searchKey : that.input
      }).then(res=>{

        that.ExhibitionData=res.data.list;
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
          this.ExhibitionData[i].createTime = formatDate(d);
        }

    console.log(res)


      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },
    // 添加学校 跳转详情页面
    schoolAddPage(){
      this.$router.push({path:"/vis/ExhibitionAdd",query:{type:"add"}})
    },
    // 每页多少条
    handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getExhibitionData()
    },
    //编辑按钮
    ExhibitionDetail(row) {
      store.commit("changeis",1)

      // this.$nextTick(function () {
      //    bus.$emit("isEdit",1)
      // }),
      this.$router.push({path:"/vis/ExhibitionDetails",query:{id:row}})
    },
    //搜索
    schoolSearch(){
      this.getExhibitionData()
    },
    //删除
    SchoolDelete:utils.debounce(function(row){
      this.$confirm('此操作将永久删除该学校信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getSchoolDelete({
          schoolId:row
        }).then(res =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getExhibitionData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


     }),
  },
  created() {
    this.getExhibitionData()
  }
}

</script>

<style lang="scss" scoped>
  .headerBtn{
    display: flex;
    justify-content: start;
    .headerBtnLeft{
      margin-left: 30px;
    }
  }
  .block{
    margin-top: 30px;
  }
</style>
