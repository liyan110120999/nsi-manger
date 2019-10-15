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
          <!-- <el-button type="primary" @click="schoolAddPage">添加活动</el-button> -->
          <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出Excel</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      id="rebateSetTable"
      :data="visData"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="buyerMessage"
        align="center"
        fixed="left"
        label="票务分类"
        v-if="ticketShow"
        width="120">
        <template slot-scope="scope">
          <font v-if="scope.row.buyerMessage === '尊享票'" color="skyblue" >尊享票</font>
          <font v-else-if="scope.row.buyerMessage === '贵宾票'" color="#e6a23c">贵宾票</font>
          <font v-else>FIT</font>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        prop="id"
        align="center"
        label="id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
        width="120">
      </el-table-column>

      <el-table-column
        prop="company"
        align="center"
        label="公司"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="position"
        align="center"
        label="职位"
        :show-overflow-tooltip="true"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        label="类型"
        :show-overflow-tooltip="true"
        width="70">
      </el-table-column>
      <el-table-column
        prop="phone"
        align="center"
        label="电话"
        :show-overflow-tooltip="true"
        width="120">
      </el-table-column>
       <el-table-column
        prop="mail"
        align="center"
        label="邮箱"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>

      <el-table-column
        prop="totalPrice"
        align="center"
        label="价格"
        width="100">
        <template slot-scope="scope">
          <div style="font-weight:bold;">{{scope.row.totalPrice}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        width="190">
      </el-table-column>
      <el-table-column
        prop="ispublic"
        align="center"
        label="是否公开"
        width="100">
      </el-table-column>
      <el-table-column
        prop="option01"
        align="center"
        label="选项1"
        :show-overflow-tooltip="true"
        width="100">
      </el-table-column>
      <el-table-column
        prop="option02"
        align="center"
        label="选项2"
        :show-overflow-tooltip="true"
        width="100">
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
        @size-change="handleSizeChange"
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
import {getvislist,getvisorder,getvisImageUrl} from "@/api/api";
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
      ticketShow:true,
      loading:true,
      centerDialogVisible: false,//弹出框
      QRcodeName:"xxx",//二维码显示姓名
      QRcodeURL:"", //二维码图片地址
      QRcodeType:"",//票务类型
      type:"vis2019",
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
      getvisorder({
        pageNum:this.pageNum,
        type:this.type,
        pageSize : that.pageSize
      }).then(res=>{
        this.schoolPageSize=res.data.total;
        this.visData = res.data.list;

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
          this.visData[i].createTime = formatDate(d);
        }

        //票的分类
        console.log(res.data.list[0])
        console.log(res.data.list[0].buyerMessage)
        for(var i=0;i<res.data.list.length;i++){
          let ticket = res.data.list[i].buyerMessage.split("-");
          res.data.list[i].buyerMessage = ticket[ticket.length-1]
        }
          console.log("----")

      }).catch(error=>{
        console.log(error)
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getvis()
    },
    //搜索
    schoolSearch(){
      this.getvis()
    },
    //查看二维码
    centerDialogVisibl(UserInformation){
      this.loading = true;
      this.centerDialogVisible = true;
      this.QRcodeName = UserInformation.name;
      //获取用户id
      let userId  = UserInformation.id;
      let type = UserInformation;

      //判断票的类型
      console.log(UserInformation.buyerMessage)
      if(UserInformation.buyerMessage == "尊享票"){
        this.QRcodeType = "zx"
      }else{
        this.QRcodeType = "gb"
      }
      getvisImageUrl({
        qrImgUrl :"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + userId,
        username:UserInformation.name,
        type:this.QRcodeType
      }).then(res => {
        console.log(res.data)
        this.QRcodeURL = res.data;
        this.loading = false;
      })
      console.log(UserInformation)
    },
    //导出excel
    exportExcel () {
      var fix = document.querySelector('.el-table__fixed');
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
        FileSaver.saveAs(
        new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
        'sheetjs.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
    return wbout;
    },

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
