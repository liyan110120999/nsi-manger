<template>
  <div class="school">
    <!-- 头部导航 -->
    <div class="headerBtn" style="">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="活动类型" >
          <el-select v-model="form.region" placeholder="请选择活动类型" @change="changeVisType">
            <el-option label="FIT" value="FIT"></el-option>
            <el-option label="vis2019" value="vis2019"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="headerBtnRight">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
      </div>
      <div class="headerBtnLeft">
          <el-button type="primary" @click="schoolAddPage">添加学校</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="visData"
      border
      style="width: 100%"
      height="450">
      <el-table-column
        align="center"
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="company"
        align="center"
        label="公司"
        fixed="left"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
        width="190">
      </el-table-column>
      <el-table-column
        prop="ispublic"
        align="center"
        label="是否公开"
        width="190">
      </el-table-column>
      <el-table-column
        prop="position"
        align="center"
        label="职位"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        label="类型"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="option01"
        align="center"
        label="选项1"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="option02"
        align="center"
        label="选项2"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="mail"
        align="center"
        label="邮箱"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="schoolDetail(scope.row.id)" type="text" size="small" style="color:#67C23A">编辑</el-button>
          <el-button @click="SchoolDelete(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="schoolPageSize">
      </el-pagination>
    </div>

    <!-- {{schoolData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import QS from 'qs';
import {getvislist} from "@/api/api";
import {getSchoolDelete} from '@/api/api';
import utils from "@/api/utils.js";
export default {
  data() {
    return {
      input:"",
      visData:null,
      currentPage1: 5,
      schoolPageSize:0,
      pageNum:1,
      pageSize:20,
      centerDialogVisible: false,//弹出框
      type:"",
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
    getvis(){
      let that = this;
      getvislist({
        type:this.type
      }).then(res=>{
        console.log(res.data)
        this.visData = res.data;
      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },
    changeVisType(){
      this.type = this.form.region;
      console.log(this.type)
      this.getvis()
    },
    // 添加学校 跳转详情页面
    schoolAddPage(){
      this.type = this.form.region;
      console.log(this.type)
    //   this.$router.push({path:"/siku/schooAdd",query:{type:"add"}})
    },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getvis()
    },
    //编辑按钮
    schoolDetail(row) {
      this.$router.push({path:"/siku/schooAdd",query:{id:row}})
    },
    //搜索
    schoolSearch(){
      this.getvis()
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
          this.getvis()
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
    this.getvis()
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
