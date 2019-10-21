<template>
  <div class="school">
    <!-- 头部导航 -->
    <div class="headerBtn" style="">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="赠票状态" >
          <el-select v-model="form.region" placeholder="审核中" @change="changeVisType">
            <el-option label="审核中" value="0"></el-option>
            <el-option label="已审核" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="headerBtnRight">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
      </div>
      <div class="headerBtnLeft">
          <!-- <el-button type="primary" @click="schoolAddPage">添加学校</el-button> -->
          <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出Excel</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="visData"
      id="rebateSetTable"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="id"
        align="center"
        fixed="left"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="inviter"
        align="center"
        fixed="left"
        label="邀请人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="applicationName"
        align="center"
        label="赠票人"
        :show-overflow-tooltip="true"
        width="150">
      </el-table-column>
      <el-table-column
        prop="company"
        align="center"
        label="公司"
        :show-overflow-tooltip="true"
        width="150">
      </el-table-column>
      <el-table-column
        prop="enrolmentTime"
        align="center"
        label="创建时间"
        width="190">
      </el-table-column>
      <el-table-column
        prop="checkMsg"
        align="center"
        label="审核状态"
        :show-overflow-tooltip="true"
        width="100">
      </el-table-column>
      <el-table-column
        prop="auditTime"
        align="center"
        label="审核时间"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label=""
        :show-overflow-tooltip="true"
        width="600">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="schoolDetail(scope.row.id)" type="text" size="small" v-if="scope.row.checkMsg === '审核中'">同意 </el-button>
          <el-button type="text" size="small" style="color:#67C23A" v-if="scope.row.checkMsg === '已审核'"></el-button>
          <el-button @click="SchoolDelete(scope.row.id)" type="text" size="small" style="color:red" v-if="scope.row.checkMsg === '审核中'">拒绝</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="点击查看门票"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button @click="centerDialogVisibl(scope.row)" type="text" size="small" style="color:#67C23A">展示门票</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="schoolPageSize">
      </el-pagination>
    </div>

    <!-- 查看二维码提示框 -->
    <el-dialog
      title="二维码展示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="QRcodebox" v-loading="loading">
        <span>姓名：{{QRcodeName}}</span>
        <p><img class="CQRcodeURL" :src="QRcodeURL" /></p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- {{schoolData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import QS from 'qs';
import {getEntryAuditList,getEntryAuditSuccess_audit,getEntryAuditDelete,getvisImageUrl} from "@/api/api";
import utils from "@/api/utils.js";

import FileSaver from 'file-saver';
import XLSX from 'xlsx';
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
      isCheck:"0",
      loading:true,
      QRcodeName:"xxx",//二维码显示姓名
      QRcodeURL:"", //二维码图片地址
      QRcodeType:"",//票务类型
      form: {

      },
    }
  },
  methods: {
    // 请求学校数据
    getData(){
      let that = this;
      getEntryAuditList({
        pageNum:this.pageNum,
        isCheck:this.isCheck,
        pageSize : this.pageSize
      }).then(res=>{
        this.schoolPageSize=res.data.total
        this.visData = res.data.list;
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
          var d=new Date(res.data.list[i].enrolmentTime);
          this.visData[i].enrolmentTime = formatDate(d);
        }

        for(var i=0; i<res.data.list.length; i++){
          var d=new Date(res.data.list[i].auditTime);
          let auditTime = formatDate(d) == "1970-1-1 8:0:0" ? "无" : formatDate(d);
          this.visData[i].auditTime = auditTime;
        }
      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },
    //活动类型
    changeVisType(){
      this.isCheck = this.form.region;
      this.getData()
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
      this.getData()
    },
    //审核按钮
    schoolDetail(row) {
      this.$confirm('此操作将通过验证, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getEntryAuditSuccess_audit({
          id : row
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
          this.getData()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消验证'
        });
      });
    },
    //搜索
    schoolSearch(){
      console.log("-----")
      // this.getData()
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
      console.log(formExcl(d))
      console.log(timestamp);
    },
    //删除
    SchoolDelete:utils.debounce(function(row){
      this.$confirm('此操作将永久删除该申请人信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        getEntryAuditDelete({
          entryId : row
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }),
    //查看二维码
    centerDialogVisibl(UserInformation){
      console.log(UserInformation)
      this.loading = true;
      this.centerDialogVisible = true;
      this.QRcodeName = UserInformation.applicationName;
      //获取用户id
      let userId  = UserInformation.entryId;
      let type = UserInformation;

      //判断票的类型
      let giveStr = UserInformation.applicationName;
      let giveArr = giveStr.split("(");
      let giveType = giveArr[giveArr.length-1];
      this.QRcodeType = giveType.substr(0,giveType.length-1)
      console.log(this.QRcodeType)
      if(this.QRcodeType == "嘉宾"){
          this.QRcodeType = "gb"
        }else{
          this.QRcodeType = "zx"
      }
      getvisImageUrl({
        qrImgUrl :"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + userId,
        username:UserInformation.applicationName,
        type:this.QRcodeType
      }).then(res => {
        console.log(res)
        this.QRcodeURL = res.data;
        this.loading = false;
      })
      console.log(UserInformation)
    },
    //导出excel
    exportExcel () {
      var _this = this;
      this.pageSize = this.schoolPageSize;
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

  // 二维码提示框
  .QRcodebox{
    text-align: center;
    .CQRcodeURL{
      width: 220px;
      margin-top: 20px;
    }
    span{
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
