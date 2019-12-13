<template>
  <div class="schoolAdd">
    <!-- <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div> -->
    <div class="addBasic">
      <div class="addBaH">修改简历信息</div>
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">

        <el-form-item label="姓名" prop="schoolName" class="addFlex">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="courseSystem">
          <el-input v-model="form.sex" ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="nationalityOfStudents">
          <el-input v-model="form.telphone" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="nationalityOfStudents">
          <el-input v-model="form.submitter" ></el-input>
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
import {postNewTalentDetail,postNewTalentUdpate} from '@/api/api';
import utils from '@/api/utils.js'
import bus from "@/api/bus";
import axios from "axios";

export default {
  data() {
    return {
      //表单属性
      form: {
      }

    }

  },
  methods:{
    getData(){
      console.log( this.$route.query.talentId)
      //请求数据
      postNewTalentDetail({
        talentId : this.$route.query.talentId
      }).then(res=>{
        this.form = res.data


      }).catch(error=>{

      })
    },


    //立即创建按钮   插入  编辑   学校接口
    submitForm:utils.debounce(function(formName) {
      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.form.createTime;
          delete this.form.updateTime;
          // this.form.textDesc =this.articleContent;
          console.log(this.form)
          postNewTalentUdpate(
            this.form
          ).then(res => {
            console.log(res)
            if(res.code == 500){
              this.$message({
                message: '数据编辑失败',
                type: 'error'
              });
            }else{
              this.$message({
                message: '数据编辑成功',
                type: 'success'
              });
              this.$router.push({path:"/siku/sikuEliteManage"})
            }

          }).catch(error => {
            console.log(error)
            this.$message({
              message: '数据编辑失败',
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
      console.log(localStorage["userName"]) //登录人邮箱
      // this.$router.push({path:"/siku/school"})
      // console.log(mycityTown[indexTwo].text)
      // this.isEdit = store.state.isEd;

      // console.log(this.isEdit);
      console.log( this.articleContent)
    },


  },
  mounted(){
    var that=this;

    this.getData();
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
      float:right;
      font-size: 20px;
    }
    i:hover{
      color: red;
    }
  }
  .addBasic{
    .addBaH{
      background: #ccc;
      height: 60px;
      border-left: 5px solid #133e6d;
      line-height: 60px;
      text-align: center;
      margin-top: 30px;
      font-size: 45px;
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
  .maxlogo{
    // width: 100px;
    // height: 100px;
    // position: fixed;
    // background: red;
    // top: 0px;
    // left: 0px;
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
  .offlineOrdo{
    margin-top: 14px;
  }
</style>
