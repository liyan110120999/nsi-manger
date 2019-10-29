<template>
  <div class="school">
    <!-- 头部导航 -->
    <div class="headerBtn" style="">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择类型"  @change="changeExhibition">
            <el-option label="学校" value="学校"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="headerBtnRight">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
      </div>
      <div class="headerBtnLeft">
          <el-button type="primary" @click="schoolAddPage">添加抽奖</el-button>
          <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出Excel(全部)</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="prizeDrawData"
      border
      style="width: 100%"
      height="640"
      id="rebateSetTable">
      <el-table-column
        align="center"
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="id"
        align="center"
        fixed="left"
        label="id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="index03"
        align="center"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="index04"
        align="center"
        label="头像"
        :show-overflow-tooltip="true"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.index04" style="width:50px;"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="index05"
        align="center"
        label="互动内容"
        :show-overflow-tooltip="true"
        width="300">
      </el-table-column>
      <el-table-column
        prop="index02"
        align="center"
        label="创建时间"
        :show-overflow-tooltip="true"
        width="300">
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

    <!-- {{prizeDrawData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import QS from 'qs';
import { getTugOfWar_PeopleList } from "@/api/api";
import utils from "@/api/utils.js";
import bus from "@/api/bus";
import store from '../../vuex/store.js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  data() {
    return {
      input:"",
      currentPage1: 5,
      ExhibitionPageSize:0,
      pageNum:1,
      pageSize:50,
      prizeDrawData:[],
      form: {

      },
    }
  },
  methods: {
    // 请求学校数据
    getData(){
      console.log("------")
      let that = this;
      getTugOfWar_PeopleList({
        camp:"蓝"
      }).then(res=>{
        console.log()
        that.prizeDrawData=res.data;
        this.ExhibitionPageSize = res.data.length;
        console.log(this.ExhibitionPageSize)
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
          var d=new Date(res.data[i].index02);
          this.prizeDrawData[i].index02 = formatDate(d);
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
    ExhibitionDetail(row) {
      // store.commit("changeis",1)
      // this.$router.push({path:"/vis/ExhibitionDetails",query:{id:row}})
    },
    //搜索
    schoolSearch(){
      this.getData()
    },
    //删除
    SchoolDelete:utils.debounce(function(row){
      this.$confirm('此操作将永久删除该学校信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log("确定")
        ({

        }).then(res =>{
          console.log(res)

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        })
      }).catch(() => {
        console.log("取消")
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    }),
    //投票类型
    changeExhibition(){
      this.type = this.form.region;
      console.log(this.type)
      this.getData()
    },
    //导出excel
    exportExcel () {
      var _this = this;
      this.pageSize = this.ExhibitionPageSize;
      this.getData();
      setTimeout(function(){
        console.log("14121212")
        _this.exportExcelTwo()
        _this.pageSize = 20;
        _this.getData();
      },1000)
    },
    exportExcelTwo(){
      var fix = document.querySelector('.el-table__fixed');
      console.log(fix)
      var wb;
      var xlsxParam = { raw: true }  //转换成excel时，使用原始的格式
      if (fix) {
        wb = XLSX.utils.table_to_book(document.getElementById('rebateSetTable').removeChild(fix),xlsxParam);
        document.getElementById('rebateSetTable').appendChild(fix);
      } else {
          wb = XLSX.utils.table_to_book(document.getElementById('rebateSetTable'),xlsxParam);
      }
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
      });
      try {

        //xlsx加时间
        var timestamp = Date.parse(new Date());
        var d=new Date(timestamp);
        function formExcl(now) {
          var year=now.getFullYear();
          var month=now.getMonth()+1;
          var date=now.getDate();
          var hour=now.getHours();
          var minute=now.getMinutes();
          var second=now.getSeconds();
          return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        }
        let formExclTime = formExcl(d);

        FileSaver.saveAs(
        new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
        '审核列表'+formExclTime+'.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout;
    }


  },
  created() {
    this.getData()
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
