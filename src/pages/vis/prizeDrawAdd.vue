<template>
  <div class="schoolAdd">
    <!-- <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div> -->
    <div class="addBasic">
      <div class="addBaH addTitle">添加抽奖<i class="el-icon-close"></i></div>
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :model="form" class="createNews" :rules="rules" label-width="160px">
        <el-form-item label="名称" prop="nickname" class="addFlex">
          <el-input v-model.trim="form.nickname"></el-input>
          <i>不能为空</i>
        </el-form-item>

         <!-- //图片上传 -->
        <div>
          <div class="logoImgThree">
            <el-form-item label="logo/头像" prop="portrait" class="logoBtn">
              <el-input v-model="form.portrait" class="el_inputOne"></el-input>
            </el-form-item>
            <el-upload
                class="upload-demo deme_upload"
                :action="uploadLogo"
                :limit="1"
                :on-preview="handlePreview"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :before-upload="beforeAvatarUpload"
                >
                  <el-button size="small" type="primary" class="btnUpata" >点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>


        <!-- <el-form-item label="头像" prop="portrait" class="addFlex">
          <el-input v-model.trim="form.portrait"></el-input>
          <i>不能为空</i>
        </el-form-item>-->
        <el-form-item label="互动内容" class="addFlex">
          <el-input v-model.trim="form.openid"></el-input>
        </el-form-item>

        <el-form-item class="addBtn">
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>


  </div>
</template>

<script>
// import qs from 'qs';
import {getTugOfWar_Insert} from '@/api/api';
import utils from '@/api/utils.js'
import {provice} from '../../api/city.js'
import bus from "@/api/bus";
import axios from "axios";
import store from '../../vuex/store.js'
export default {
  data() {
    return {
      uploadLogo:axios.defaults.baseURL+"/manager/talent/upload.do?" + "type=" + "nsi-event/vis-2019/live-logo/",
      form: {
        nickname:"", // 名称
        portrait:"", //头像
        openid:"", //微信id 长度50字以内
        number: "0",
        camp:"蓝"
      },
      //表单验证
      rules:{
        nickname:[ //名称
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],
        portrait:[ //头像
          {required:true,message:"此处不能为空",trigger:'blur'},
        ],

      },

    }

  },
  methods:{
    //立提交按钮
    submitForm:utils.debounce(function(formName) {
      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        console.log("-----");
        if (valid) {
            //添加接口
            console.log(this.form)
            getTugOfWar_Insert(
              this.form
            ).then(res => {
              console.log(res)
              if(res.code == "0"){
                this.$message({
                  message: '数据插入成功',
                  type: 'success'
                });
                this.$router.push({path:"/vis/prizeDrawList"})
              }else{
                this.$message({
                  message: '数据插入失败',
                  type: 'error'
                });
              }
            }).catch(err => {
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
    //重置
    resetForm(formName) {
      location.reload();
      this.$refs[formName].resetFields();

    },
    //上传图片成功后回调
    handleAvatarSuccess(res, file) {
      this.form.portrait = res.data.url;
      console.log( this.form.portrait)
    },
    //上传图片 删除回调
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //上传图片 上传成功后 点击图片
    handlePreview(file) {
      console.log(file);
    },
    //上传图片 限制上传条数
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 上传图片 确定删除弹出框
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //图片限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

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
      width: 400px;
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

  //确定 取消按钮
  /deep/.addBtn .el-form-item__content{
    text-align: left;
  }
   .offlineOrdo{
    margin-top: 14px;
  }
</style>
