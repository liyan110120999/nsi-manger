<template>
  <div class="loginContainer">
    <img src="../assets/images/timg.jpg">
    <el-form class="loginFrom" :model="form" :rules="rules" ref="form" label-width="0">
        <div class="NSItitle">新学说后台</div>
        <div class="outIconfont">
            <span class="iconfont icon-xingmingyonghumingnicheng"></span>
            <el-form-item label="" prop="userName">
              <el-input auto-complete="on" @keydown.enter.native="userLogin" v-model="form.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </div>
        <div class="outIconfont">
            <span class="iconfont icon-07"></span>
            <el-form-item label="" prop="passWord">
              <el-input auto-complete="on" @keydown.enter.native="userLogin" v-model="form.passWord" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </div>
        <div class="outIconfont">
            <el-form-item label="">
              <verify @getVerity="getVerityStatus"></verify>
            </el-form-item>
          </div>
        <el-button class="loginBtn" @click="userLogin" type="info">登录</el-button>
        <span size="mini" style="margin:10px 0 0 20px;font-size:14px;float:left;color:#999;cursor:pointer;" @click="forgetPas">忘记密码</span>
    </el-form>
  </div>
</template>
<script>

import verify from '../components/login/verify'

export default {
  name: 'home',
  components:{
    verify
  },
  data () {
    return {
      form:{
        userName:'',
        passWord:'',
        verifyStatus:false
      },
      rules: {
          userName: [
            { required: true, message: '请输入帐户名', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
    getVerityStatus(data){
      this.verifyStatus=data
    },
    userLogin(){
      let that=this
      this.$refs.form.validate((valid) => {
        if(valid){
          if((that.form.userName.indexOf('xinxueshuo.cn')<0)||(that.form.userName.length<18)){
            that.$message({
              message: '权限不足,请联系技术人员',
              type: 'error'
            });
            return
          }
          if(!this.verifyStatus){
            that.$message({
              message: '计算错误',
              type: 'error'
            });
            return
          }
          //生成token
          let timestamp=(new Date().getTime()).toString()
          //console.log(timestamp)
          let randomnum=Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+timestamp.slice(4,)
          //console.log(randomnum)
          let url=that.baseUrl+'/user/login.do'
          let loginInfor=new URLSearchParams();
          loginInfor.append('userName',that.form.userName);
          loginInfor.append('passWord',that.form.passWord);
          loginInfor.append('token',randomnum);
          that.$axios.post(url,loginInfor).then(resp => {
              if(resp.data.msg=='登录成功'){
                that.$message({
                  message: resp.data.msg,
                  type: 'success'
                });
                localStorage["userName"] = that.form.userName
                setTimeout(function(){
                  that.$router.push({path:'/'});
                },1000)
              }else{
                that.$message({
                  message: resp.data.msg,
                  type: 'error'
                });
              }

          }).catch(err=>{
              that.$message({
                message: '登录失败,请联系技术人员',
                type: 'error'
              });
          })
        }else{
          that.$message({
                message: '请输入用户名密码',
                type: 'error'
            });
          }
      })
    },
    forgetPas(){
      window.open('http://data.xinxueshuo.cn/nsi/user/password.html','_blank')
    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  *{
    margin: 0;
    padding: 0;
  }
  #canvascontainer{
      height: 100%;
      position: absolute;
      top: 0px;
      overflow:hidden;
      div{
        height: 100%;
      }
  }
  .loginContainer{
    img{
      width: 100%;
      height: 100%;
    }
    height: 100%;
    .loginFrom{
        background-color: rgba(188,188,188,0.6);
        position: absolute;
        border-radius: 20px;
        left: 50%;
        top: 1px;
        transform: translateX(-50%);
        // transform: translateY(-80%);
        width: 330px;
        padding: 30px 85px 25px;
        margin: 150px auto;
        .outIconfont{
          position:relative;
        }
        .NSItitle{
          color:#222;
          margin:0 0 20px 0;
          font-size:30px;
        }
        input{
          height: 47px;
          border:none;
          // background:#fff !important;
          color:#777;
          text-indent:20px;
          // -webkit-box-shadow: 0 0 0px 1000px #495060 inset !important;
          -webkit-text-fill-color: #777 !important;
        }
        .icon-xingmingyonghumingnicheng,.icon-07{
          position:absolute;
          color:#777;
          top:10px;
          left:0;
          z-index:2;
          margin:5px 5px 0 7px;
        }
        .loginBtn{
            display: inline-block;
            margin-bottom: 0;
            width: 100%;
            text-align: center;
            vertical-align: middle;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            line-height: 1.5;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            padding: 10px 15px;
            font-size: 12px;
            border-radius: 4px;
        }
    }
  }

</style>
