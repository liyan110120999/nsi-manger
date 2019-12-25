<template>
  <div class="schoolAdd">
    <div class="addBasic">
      <div class="addBaH addTitle">帖子信息<i class="el-icon-close" @click="addCancel"></i></div>
      <div class="edBox">
        <div class="edLeft"><div ref="editor" style="text-align:left;height:100px;" ></div></div>
        <div class="edRight">
          <ul class="edRightBtn">
            <li><el-button type="primary" v-if="showBtn">通过</el-button></li>
            <li> <el-button type="success" v-if="showBtn">拒绝</el-button></li>
            <li><el-button type="danger" v-if="!showBtn">删除</el-button></li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import qs from 'qs';
import {getExhibitorDetail,getExhibitorUpdate} from '@/api/api';
import axios from "axios";
//引入编辑器
import E from 'wangeditor'
import Cropper from "cropperjs"
export default {
  data() {
    return {
      articleContent:"", //编辑器的值
      isState:"", //判断哪个页面跳转
      showBtn:false,
    }

  },
  methods:{
    getData(){
      //判断哪个页面跳转
      console.log(this.$route.query)
      this.isState = this.$route.query.isState;
      //加载编辑器组件
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.articleContent = html
      }
      editor.create()
      //调用编辑器方法，默认数据
      this.articleContent = localStorage.getItem("code");
      editor.cmd.do('insertHTML', this.articleContent);
      if(this.isState == "1"){
        this.showBtn = false
      }else{
        this.showBtn = true
      }
    },
    addCancel(){
      if(this.isState == "1"){
        this.$router.push({path:"/card/cardManage",query:{}})
      }else{
        this.$router.push({path:"/card/cardList",query:{}})
      }
    }
  },
  mounted(){
    this.getData();
  }
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
      margin-bottom: 20px;
      background: #ccc;
      height: 60px;
      border-left: 5px solid #133e6d;
      line-height: 60px;
      text-align: center;
      margin-top: 30px;
      font-size: 45px;
    }
  }
  .edBox{
    .edLeft{
      float: left;
      width: 380px;
      margin-left: 24%;
      overflow: hidden; 
      height: 600px;
    }
    .edRight{
      float: left;
      height: 600px;
    }
    .edRightBtn{
      margin-top: 500px;
      margin-left: 60px;
      li{
        margin-top: 30px;
      }
    }
  }
 


 
</style>
