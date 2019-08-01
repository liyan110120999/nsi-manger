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
          <el-button type="primary" @click="schoolAddPage">添加学校</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="schoolData"
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
        :show-overflow-tooltip="true"
        prop="schoolName"
        align="center"
        fixed="left"
        label="中文名"
        height="100"
        width="190">
      </el-table-column>
      <el-table-column
        prop="id"
        align="center"
        label="ID"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schoolEnglishName"
        align="center"
        label="英文名"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column label="基本信息" align="center">
        <el-table-column
          prop="schoolProperties"
          label="类型"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="operationState"
          label="运营状态"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="schoolSystem"
          label="学制"
          :show-overflow-tooltip="true"
          align="center"
          width="150">
        </el-table-column>
      </el-table-column>
      <el-table-column label="课程&认证" align="center">
        <el-table-column
          prop="course"
          label="国际课程"
          :show-overflow-tooltip="true"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="认证"
          :show-overflow-tooltip="true"
          align="center"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <el-table-column
          prop="province"
          label="省"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="town"
          label="市"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          :show-overflow-tooltip="true"
          label="详细地址"
          align="center"
          width="300">
        </el-table-column>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <el-table-column
          prop="foundingTime"
          label="建校"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="国际课程认证"
          align="center"
          width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column label="学费" align="center">
        <el-table-column
          prop="oneTuition"
          label="幼儿园"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="twoTuition"
          label="小学"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="thirdTuition"
          label="初中"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="fourTuition"
          label="高中"
          align="center"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column label="学生数" align="center">
        <el-table-column
          prop="graduatedStuNum"
          label="毕业班(国际部)"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="studentCapacity"
          label="总在容量(国际部)"
          align="center"
          width="150">
        </el-table-column>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <el-table-column
          prop="website"
          label="官网"
          align="center"
          width="190">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          align="center"
          width="190">
        </el-table-column>
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
import { getSchoolLibrary } from "@/api/api";
import {getSchoolDelete} from '@/api/api';
import utils from "@/api/utils.js";
import bus from "@/api/bus";
import store from '../../vuex/store.js';
export default {
  data() {
    return {
      input:"",
      schoolData:null,
      currentPage1: 5,
      schoolPageSize:0,
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
    getSchoolData(){
      let that = this;
      getSchoolLibrary({
        pageNum : that.pageNum,
        pageSize : that.pageSize,
        searchKey : that.input
      }).then(res=>{
        that.schoolData=res.data.list;
        this.schoolPageSize = res.data.total;
      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },
    // 添加学校 跳转详情页面
    schoolAddPage(){
      this.$router.push({path:"/siku/schooAdd",query:{type:"add"}})
    },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSchoolData()
    },
    //编辑按钮
    schoolDetail(row) {
      store.commit("changeis",1)

      // this.$nextTick(function () {
      //    bus.$emit("isEdit",1)
      // }),
      this.$router.push({path:"/siku/schooAdd",query:{id:row}})
    },
    //搜索
    schoolSearch(){
      this.getSchoolData()
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
          this.getSchoolData()
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
    this.getSchoolData()
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
