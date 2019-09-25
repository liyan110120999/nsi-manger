<template>
  <div class="schoolAdd">
    <!-- <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div> -->
    <div class="addBasic">
      <div class="addBaH">修改展位信息</div>
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">

        <el-form-item label="公司" prop="schoolName" class="addFlex">
          <el-input v-model.trim="form.exhibitorName"></el-input>
          <i>展位不能为空</i>
        </el-form-item>
        <el-form-item label="展位" prop="courseSystem">
          <el-input v-model="form.boothNum" ></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="nationalityOfStudents">
          <el-input v-model="form.intro" ></el-input>
        </el-form-item>


         <!-- //图片上传 -->
        <div>
          <div class="logoImgThree">
            <el-form-item label="logo" prop="logoIcon" class="logoBtn"></el-form-item>
            <el-input v-model="form.logoIcon" class="el_inputOne"></el-input>
            <el-upload
                class="upload-demo deme_upload"
                :action="tutscOne"
                :limit="1"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                  <el-button size="small" type="primary" class="btnUpata" >点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
          </div>
        </div>

         <!-- 编辑器 -->
        <div ref="editor" style="text-align:left;"></div>

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
import {getExhibitorDetail,getExhibitorUpdate} from '@/api/api';
import utils from '@/api/utils.js'
import {provice} from '../../api/city.js'
import bus from "@/api/bus";
import axios from "axios";
import store from '../../vuex/store.js'
//引入编辑器
import E from 'wangeditor'
import Cropper from "cropperjs"
export default {
  data() {
    return {
      tutscOne:axios.defaults.baseURL+"/manager/talent/upload.do?" + "type=" + "nsi/nsi-event/vis-2019/exhibitor-logo/",
      articleContent:"", //编辑器的值
      //表单属性
      form: {
      }

    }

  },
  methods:{
    getData(){
      //加载编辑器组件
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.articleContent = html
      }
      //配置服务器端地址
      var that = this;
      editor.customConfig.uploadImgServer = that.baseUrl+'/manager/talent/upload.do'
      //上传图片时可自定义传递一些参数，例如传递验证的token等。
      editor.customConfig.uploadImgParams = {
          'type':'nsi-event/vis-2019/exhibitor-info/'//上传图片参数
      }
      editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            that.uploadLoading=true
        },
        success: function (xhr, editor, result) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传成功',
              type: 'success'
            });
        },
        fail: function (xhr, editor, result) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传成功,但未插入',
              type: 'error'
            });
        },
        error: function (xhr, editor) {
            that.uploadLoading=false
            that.$message({
              message: '图片上传失败',
              type: 'error'
            });
        },
        timeout: function (xhr, editor) {
            that.uploadLoading=false
            that.$message({
              message: '上传图片超时,请检查网络连接',
              type: 'error'
            });
        },
        customInsert: function (insertImg, result, editor) {
            var url = result.data.url
            insertImg(url)
        }
      }
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgTimeout = 10000
      editor.customConfig.pasteTextHandle = function (content) {
          if(content.indexOf('"=""')>=0){
            that.$message({
              message: '文章有不规范字符,请粘贴纯文本',
              type: 'error'
            });
          }
          return content.replace(/<img src="http:\/\//g,'<img src="https://')

      }
      editor.create()


      //请求数据
      getExhibitorDetail({
        exhibitorId : this.$route.query.id
      }).then(res=>{
        this.form = res.data;
        this.articleContent = res.data.textDesc;
         console.log(this.form)
        //调用编辑器方法，默认数据
        editor.cmd.do('insertHTML', this.articleContent)

      }).catch(error=>{

      })
    },


    //立即创建按钮   插入  编辑   学校接口
    submitForm:utils.debounce(function(formName) {

      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.form.createTime;
          this.form.textDesc =this.articleContent;
          console.log(this.form)
          getExhibitorUpdate(
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
              this.$router.push({path:"/vis/ExhibitionList"})
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
    //上传图片成功后回调
    handleAvatarSuccess(res, file) {
      this.form.logoIcon = res.data.url;
      // console.log(file)
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
      return this.$confirm(`确定移除 ${ file.name }？`);
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
    console.log(store.state.isEd)

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
</style>
