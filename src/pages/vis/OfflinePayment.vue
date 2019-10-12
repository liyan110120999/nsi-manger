<template>
  <div class="schoolAdd">
    <!-- <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div> -->
    <div class="addBasic">
      <div class="addBaH addTitle">线下支付-生成门票 <i class="el-icon-close"></i></div>
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :model="form" class="createNews" :rules="rules" label-width="160px">
        <el-form-item label="名字" prop="name" class="addFlex">
          <el-input v-model.trim="form.name"></el-input>
          <i>不能为空</i>
        </el-form-item>
        <el-form-item label="公司" prop="company" class="addFlex">
          <el-input v-model.trim="form.company"></el-input>
          <i>不能为空</i>
        </el-form-item>
        <el-form-item label="职位" prop="position" class="addFlex">
          <el-input v-model.trim="form.position"></el-input>
          <i>不能为空</i>
        </el-form-item>
        <el-form-item label="电话" prop="phone" class="addFlex">
          <el-input v-model.trim="form.phone"></el-input>
          <i>不能为空</i>
        </el-form-item>

        <el-form-item class="addBtn">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 生成form表单 -->
      <div v-if="offlinePaymentShow" class="offlinePaymentShow">
        <el-form ref="form" :model="form" class="createNews TwoLeft" :rules="rules" label-width="160px">
          <el-form-item label="名字" prop="name" class="addFlex">
            <el-input v-model.trim="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company" class="addFlex">
            <el-input v-model.trim="form.company" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position" class="addFlex">
            <el-input v-model.trim="form.position" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone" class="addFlex">
            <el-input v-model.trim="form.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="票类型" prop="radio2" class="addFlex">
            <el-radio-group v-model="form.radio2" class="offlineOrdo">
              <el-radio  label="gb">贵宾票(VIP 5188)</el-radio>
              <el-radio  label="zx">尊享票(普票 3188)</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="addBtn">
            <el-button type="primary" @click="submitFormTwo('form')">生成门票</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="TwoRight">
          <img :src="getVisImage">

        </div>
      </div>
    </div>


  </div>
</template>

<script>
// import qs from 'qs';
import {getVisInsert,getVisImage} from '@/api/api';
import utils from '@/api/utils.js'
import {provice} from '../../api/city.js'
import bus from "@/api/bus";
import axios from "axios";
import store from '../../vuex/store.js'
export default {
  data() {
    return {
      offlinePaymentShow:false,//生成表单开关
      getVisImage:"",
      form: {
        id:"",
        radio2: "", //单选
        name:"",  //名字
        position:"",//职位
        phone:"", //电话
        company:"", //公司
        mail:0 ,
        option01:0,
        ispublic:0,
        attendno:0,
        type:"vis2019"
      },
      //表单验证
      rules:{
        name:[ //学校名字
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],
        position:[ //职位名字
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],
        phone:[ //电话名字
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],
        company:[ //公司名字
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],
        radio2: [
          { required: true, message: '请选择一种类型', trigger: 'change' }
        ],
      },

    }

  },
  methods:{
    //立提交按钮
    submitForm:utils.debounce(function(formName) {

      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
            //添加接口
            console.log(this.form)
            getVisInsert(
              this.form
            ).then(res =>{
              console.log(res);
              this.$message({
                message: '数据插入成功',
                type: 'success'
              });
              this.form.id = res.data;
              this.offlinePaymentShow = true;
            }).catch(error=>{
              this.$message({
                message: '数据插入失败',
                type: 'error'
              });
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }),
    //立创建生成按钮
    submitFormTwo:utils.debounce(function(formName) {
      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加接口
          console.log(this.form)
          getVisImage({
             qrImgUrl:"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+ this.form.id,
             username:this.form.name,
             type:this.form.radio2,
          }).then(res =>{
            console.log(res);
            if(res.code == 0){
              this.$message({
                message: '入场券生成成功',
                type: 'success'
              });
            }else{
              this.$message({
              message: '入场券生成失败',
              type: 'error'
            });
            }
            this.getVisImage = res.data;
          }).catch(error=>{
            this.$message({
              message: '入场券生成失败',
              type: 'error'
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }),
    //重置
    resetForm(formName) {
      console.log(formName)
      this.offlinePaymentShow = false;
      this.$refs[formName].resetFields();
      this.form = {
        id:"",
        radio2: "", //单选
        name:"",  //名字
        position:"",//职位
        phone:"", //电话
        company:"", //公司
        mail:0 ,
        option01:0,
        ispublic:0,
        attendno:0,
        type:"vis2019"
      }
    }

  },
  created() {
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
  .offlineOrdo{
    margin-top: 14px;
  }
  .TwoRight{
    float: right;
    margin-right: 200px;
    width: 300px;
    height: 450px;
    border: 1px solid #ccc;
    img{
      width: 100%;
    }
  }
  .TwoLeft{
    width: 50%;
    float: left;
  }
  //确定 取消按钮
  /deep/.addBtn .el-form-item__content{
    text-align: left;
  }
</style>
