<template>
  <div class="schoolAdd">
    <div class="addBasic">
    <div class="addBaH">添加发票信息<i class="el-icon-close" @click="addCancel"></i></div>
      <!-- <div class="addBaH">添加发票信息</div> -->
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :rules="rules" :model="form" class="createNews" label-width="160px">

        <el-form-item label="发票抬头" prop="userinvoicename" class="addFlex">
          <el-input v-model.trim="form.userinvoicename"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="userinvoicenum">
          <el-input v-model.number="form.userinvoicenum" ></el-input>
        </el-form-item>

        <el-form-item prop="usermail" label="用户发送邮箱">
          <el-input v-model="form.usermail"></el-input>
        </el-form-item>

        <el-form-item label="开票类型" prop="userbillingtype">
          <el-input v-model="form.userbillingtype" ref="inputVal"></el-input>
          <template>
            <div class="invoiceRadio">
              <el-radio v-model="userbillingtypeRadio" label="咨询费">咨询费</el-radio>
              <el-radio v-model="userbillingtypeRadio" label="会议费">会议费</el-radio>
              <el-radio v-model="userbillingtypeRadio" label="印刷品">印刷品</el-radio>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="用户订单号" prop="userordernum">
          <el-input v-model.number="form.userordernum" ></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="managepaymentmethod">
          <el-input v-model="form.managepaymentmethod" ref="invoiceRadioVal"></el-input>
          <template>
            <div class="invoiceRadio">
              <el-radio v-model="invoiceRadio" label="小新微信">小新微信</el-radio>
              <el-radio v-model="invoiceRadio" label="小新支付宝">小新支付宝</el-radio>
              <el-radio v-model="invoiceRadio" label="对公转账">对公转账</el-radio>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="发票金额" prop="managemoney">
          <el-input v-model.number="form.managemoney" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="审核者账号" prop="financename">
          <el-input v-model="form.financename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
// import qs from 'qs';
import {postHandInvoiceCreate} from '@/api/api';
import utils from '@/api/utils.js'
import axios from "axios";
export default {
  data() {
    //邮箱验证
    var invoiceUsermail = (rule, value, callback) => {
      if(value == ""){
        return callback(new Error('邮箱不能为空'));
      }else{
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test(value)){
        }else{
          return callback(new Error('邮箱填写错误'));
        }


      }
       callback();
    };
    //单选
    var invoiceUsername = (rule, value, callback) => {
      if(value == ""){
        return callback(new Error('不能为空'));
      }
      callback();
    }
    return {
      userbillingtypeRadio:"",
      invoiceRadio:"",
      //表单属性
      form: {
        userinvoicename: '', //发票抬头
        userinvoicenum:"", //税号
        userbillingtype:"", //开票类型
        usermail:"", //用户发送邮箱
        username:"", //用户姓名
        userordernum:"", //用户订单
        managepaymentmethod:"",//审核中-支付方式
        managemoney:"", //发票金额
        financename:localStorage["userName"],//用户账号邮箱
        financestate:"", //发票状态
        remark:"", //备注
      },
      rules: {
        userinvoicename:[
          { required: true, message: '请输入发票抬头', trigger: 'blur' },
        ],
        userinvoicenum:[
          { required: true, message: '请输入税号', trigger: 'blur' },
          { type: 'number', message: '必须为数字值'}
        ],
        userbillingtype:[
          { required: true, message: '请输入开票类型', trigger: 'blur' },
        ],
        usermail:[
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: invoiceUsermail, trigger: 'blur'  },
        ],
        username:[
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        userordernum:[
          { required: true, message: '请输入用户订单', trigger: 'blur' },
          { type: 'number', message: '必须为数字值'}

        ],
        managepaymentmethod:[
          { required: true, message: '请输入支付方式', trigger: 'blur' },
        ],
        managemoney:[
          { required: true, message: '请输入发票金额', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值'}
        ]
      }
    }

  },
  methods:{
    //立即创建按钮   插入  编辑   学校接口
    submitForm:utils.debounce(function(formName) {

      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.textDesc = this.articleContent
          console.log(this.form);
          postHandInvoiceCreate(
            this.form
          ).then(res => {
            console.log(res)
            this.$message({
              message: '添加数据成功',
              type: 'success'
            });
            this.$router.push({path:"/mall/invoice"})
          }).catch(error => {
            console.log(error)
            this.$message({
              message: '添加数据失败',
              type: 'error'
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }),



    // 取消页面按钮
    addCancel(){
      this.$router.push({path:"/mall/invoice"})
      // console.log(mycityTown[indexTwo].text)
      // this.isEdit = store.state.isEd;

      // console.log(this.isEdit);
    },
  },
  watch: {
    "userbillingtypeRadio":function (val) {
      this.form.userbillingtype = val;
      this.$refs.inputVal.focus();
    },
    "invoiceRadio":function(val) {
       this.form.managepaymentmethod = val;
       this.$refs.invoiceRadioVal.focus();
    }
  },
  created() {
    console.log("1215241564545")
    console.log()

  },

}
</script>

<style lang="scss" scoped>

  .addTips{
     text-align: left;
     color: #777;
     margin-top: 10px;
  }
  .addTitle{
    font-size: 25px;
    i{
      width: 40px;
      height: 40px;
      float:right;
      font-size: 40px;
    }
    i:hover{
      background: red;
      color: #ccc;
    }
  }
  .addBasic{
    .addBaH{
      background: #ccc;
      height: 50px;
      border-left: 5px solid #133e6d;
      line-height: 50px;
      text-align: center;
      margin-top: 10px;
      font-size: 28px;
    }
    i{
      float: right;
    }

  }
  .el-form-item {
    margin-top: 30px;
  }
  .schoolSite{
    text-align: left;
  }
  .addFee{
    .el-form-item {
      width: 220px;
      float: left;
      margin-top: 0px;
    }

  }
  .el-select {
    display: block;
    position: relative;
    max-width: 400px;
  }
  #seleOp p{
    text-align: left;
    position: relative;
  }
  #seleOp p:last-of-type{
    margin-top: 30px;
  }
  #seleOp span{
    display: inline-block;
    width: 160px;
    text-align: right;
    font-size: 14px;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  #seleOp select{
    width: 399px;
    height: 40px;
    outline: 0;
    border: 1px solid #dcdfe6;
    appearance: none;
    display: inline-block;
    background: #fff;
    transition:border-color .2s cubic-bezier(.645,.045,.355,1);
    padding: 0 30px 0 10px;
    margin-left: -4px;
    color: #606266;
    border-radius: 3px;
  }
  #seleOp select:focus {
    border-color: #409EFF;
  }
  #seleOp p i{
    color: rgba(0, 0, 0, 0.0);
    font-size: 14px;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    cursor: pointer;
    // font-family: element-icons!important;
    font-style: normal;
  }
  // #seleOp select:focus i{
  //   border-color: #409EFF;
  // }
  #seleOp p i:before{
    content: "\E605";
    display: inline-block;
    /* background: #000; */
    width: 0px;
    height: 0px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    /* border-bottom: 8px solid #000; */
    border-top: 9px solid#c0c4cc;
    position: relative;
    right: 32px;
    top: 10px;
  }
  #seleOp p i:after{
    content: '';
    display: inline-block;
    /* background: #000; */
    width: 0px;
    height: 0px;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    /* border-bottom: 8px solid #000; */
    border-top: 8px solid #fff;
    position: relative;
    right: 49px;
    top: -6px
  }
  .el-checkbox {
    float: left;
  }
  //上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 5px solid #000;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/.addFlexTwo{
    display: flex;
    i{
      margin-left: 10px;
      color: #999;
    }
  }
  /deep/.addFlex .el-form-item__content {
    display: flex;
    i{
      margin-left: 10px;
      color: #999;
    }
  }

  // 地区提示框
  #citySpan{
    color: #f56c6c;
    margin-left: 100px;
    padding: 0px;
  }
  .logoImg{
    width: 150px;
    height: 150px;
  }
  .schoolImg{
    margin-bottom: 40px;
    .avatar-uploader{
      margin-left: 162px
    }
    .logoImgThree{
      display: flex;
      .el_inputOne{
        margin-top: 30px;
      }
      .btnUpata{
        margin-top: 33px;
      }
      .deme_upload{
        margin-left: -60px;
      }
    }

  }
  .logoImgThree{
    display: flex;
    .el_inputOne{
      margin-top: 30px;
    }
    .btnUpata{
      margin-top: 33px;
    }
    .deme_upload{
      margin-left: -60px;
    }
  }


  // 招生信息
  .RecruitStudents{
    border: 1px solid #cccccc;
    margin-left: 50px;
    margin-right: 90px;
    h4{
      margin-top: 0px;
      margin-bottom: 20px;
    }
    h2{
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .Kindergarten{
      display: flex;
      flex-wrap: wrap;
    }
    .el-form-item{
      margin-top: 0px;
    }
    .el-button--primary {
      margin-left: 0px;
      margin-bottom: 20px;
    }
  }

  .avatar-uploader{
    width: 300px;
  }
  .invoiceRadio{
    text-align: left;
  }

  //确定 取消按钮
  /deep/.addBtn .el-form-item__content{
    text-align: left;
  }
   .offlineOrdo{
    margin-top: 14px;
  }
</style>
