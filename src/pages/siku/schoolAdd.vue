<template>
  <div class="schoolAdd">
    <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div>
    <div class="addTips">注意：带※标记的为必填项</div>
    <div class="addBasic">
      <div class="addBaH">课程信息</div>
      <el-form ref="form" :model="form" class="createNews" :rules="rules" label-width="160px">
        <el-form-item label="学校名字" prop="schoolName">
          <el-input v-model="form.schoolName"></el-input>
        </el-form-item>
        <el-form-item label="学校英文名字" prop="schoolEnglishName">
          <el-input v-model="form.schoolEnglishName" ></el-input>
        </el-form-item>
        <el-form-item label="学校性质">
          <!-- <el-input v-model="form.province" ></el-input> -->
          <el-select v-model="form.schoolProperties" placeholder="请选择学校属性" :value-key="form.schoolProperties">
            <el-option label="公办" value="公办"></el-option>
            <el-option label="民办" value="民办"></el-option>
          </el-select>
        </el-form-item>
        <div id="seleOp">
          <p>
            <span>省</span>
            <select @change="CityProvice" id="cityProvice">
              <option v-if="citySelect">{{form.province}}</option>
              <option v-for="(v,i) in provice" :key="i" value="v.name">{{v.name}}</option>
            </select>
            <i></i>
          </p>
          <p>
            <span>市</span>
            <select @change="cityTown" id="cityTown">
              <option v-if="citySelect">{{form.town}}</option>
              <option v-for="(v,i) in provice[curshe].city" :key="i" >{{v.name}}</option>
            </select>
            <i></i>
          </p>
        </div>
        <el-form-item label="地址">
          <el-input v-model="form.address" ></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-input v-model="form.foundingTime" ></el-input>
        </el-form-item>
        <el-form-item label="运营状态">
          <el-input v-model="form.operationState" ></el-input>
        </el-form-item>
        <el-form-item label="学制">
          <el-input v-model="form.schoolSystem" ></el-input>
        </el-form-item>
        <el-form-item label="幼儿园-学费">
          <el-input v-model="form.oneTuition" ></el-input>
        </el-form-item>
        <el-form-item label="小学-学费">
          <el-input v-model="form.twoTuition" ></el-input>
        </el-form-item>
        <el-form-item label="初中-学费">
          <el-input v-model="form.thirdTuition" ></el-input>
        </el-form-item>
        <el-form-item label="高中-学费">
          <el-input v-model="form.fourTuition" ></el-input>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="form.website" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.telephone" ></el-input>
        </el-form-item>
        <el-form-item label="国际课程成立时间">
          <el-input v-model="form.interCourseFoundedTime" ></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="form.course" ></el-input>
        </el-form-item>
        <el-form-item label="认证">
          <el-input v-model="form.authentication" ></el-input>
        </el-form-item>
        <el-form-item label="学生总人数">
          <el-input v-model="form.students" ></el-input>
        </el-form-item>
        <el-form-item label="学生容量">
          <el-input v-model="form.studentCapacity" ></el-input>
        </el-form-item>
        <el-form-item label="毕业班人数">
          <el-input v-model="form.graduatedStuNum" ></el-input>
        </el-form-item>
        <el-form-item label="学生主要国籍">
          <el-input v-model="form.stuDominantNationality" ></el-input>
        </el-form-item>
        <el-form-item label="员工数量">
          <el-input v-model="form.staffNum" ></el-input>
        </el-form-item>
        <el-form-item label="教师数量">
          <el-input v-model="form.teacherNum" ></el-input>
        </el-form-item>
        <el-form-item label="外籍教师数量">
          <el-input v-model="form.foreignTeacherNum" ></el-input>
        </el-form-item>
        <el-form-item label="师生比">
          <el-input v-model="form.teacherStuRatio" ></el-input>
        </el-form-item>
        <el-form-item label="占地面积">
          <el-input v-model="form.coveredArea" ></el-input>
        </el-form-item>
        <el-form-item label="建筑面积">
          <el-input v-model="form.builtArea" ></el-input>
        </el-form-item>
        <el-form-item label="硬件设施">
          <el-input v-model="form.hardware" ></el-input>
        </el-form-item>
        <el-form-item label="投资信息">
          <el-input v-model="form.investment" ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" ></el-input>
        </el-form-item>
        <el-form-item label="学校logo">
          <el-input v-model="form.schoolLogo" ></el-input>
        </el-form-item>
        <el-form-item label="大图1">
          <el-input v-model="form.schoolShowOne" ></el-input>
        </el-form-item>
        <el-form-item label="大图二">
          <el-input v-model="form.schoolShowTwo" ></el-input>
        </el-form-item>
        <el-form-item label="大图3">
          <el-input v-model="form.schoolShowThird" ></el-input>
        </el-form-item>
        <el-form-item label="大图4">
          <el-input v-model="form.schoolShowFour" ></el-input>
        </el-form-item>
        <el-form-item label="大图5">
          <el-input v-model="form.schoolShowFive" ></el-input>
        </el-form-item>
        <el-form-item label="学校简介">
          <el-input v-model="form.schoolDesc" ></el-input>
        </el-form-item>
        <el-form-item label="住宿情况">
          <el-input v-model="form.accommodation" ></el-input>
        </el-form-item>
        <el-form-item label="招生信息">
          <el-input v-model="form.studentEnrollment" ></el-input>
        </el-form-item>
        <el-form-item label="留学生留学国家">
          <el-input v-model="form.studeAbroadCountries" ></el-input>
        </el-form-item>
        <el-form-item label="招生对象">
          <el-input v-model="form.prospects" ></el-input>
        </el-form-item>
        <el-form-item label="申请费">
          <el-input v-model="form.filingFee" ></el-input>
        </el-form-item>
        <el-form-item label="办学理念">
          <el-input v-model="form.schoolManagement" ></el-input>
        </el-form-item>
        <el-form-item label="办学特色">
          <el-input v-model="form.schoolCharacteristics" ></el-input>
        </el-form-item>
        <el-form-item label="课程体系">
          <el-input v-model="form.courseSystem" ></el-input>
        </el-form-item>
        <el-form-item label="学生国籍数">
          <el-input v-model="form.nationalityOfStudents" ></el-input>
        </el-form-item>
        <el-form-item label="班级规模">
          <el-input v-model="form.classSize" ></el-input>
        </el-form-item>
        <el-form-item label="授课形式">
          <el-input v-model="form.teachingForm" ></el-input>
        </el-form-item>
        <el-form-item label="新学说分析">
          <el-input v-model="form.companyAnalysis" ></el-input>
        </el-form-item>
        <el-form-item label="数据年份">
          <el-input v-model="form.yearOfData" ></el-input>
        </el-form-item>
        <el-form-item label="提交人">
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
import {getSchoolAdd} from '@/api/api';
import {getDetails} from "@/api/api";
import {getSchoolUpdate} from "@/api/api";
import utils from '@/api/utils.js'
import {provice} from '../../api/city.js'
import bus from "@/api/bus";
import axios from "axios";
import store from '../../vuex/store.js'
export default {
  data() {
    //学校英文名字验证
    var schoolEnglishName = (rele,value,callback) =>{
      let parent = /^[A-Za-z]/;
      if(value == ""){
        callback(new Error("请输入学校英文名字"));
      }else{
        if(parent.test(value)){
          callback()
          }else{
          callback(new Error("不能出现中文"));
        }

      }
    }
    return {
      provice:provice,
      fileList: [],
      curshe:0,
      citySelect:false,
      i:0,
      isEdit:1,
      //表单属性
      form: {
        schoolName:"",
        schoolEnglishName:"",
        schoolProperties:"",
        province:"",//省
        town:"", //市
        address:"",
        foundingTime:"",
        operationState:"",
        schoolSystem:"",
        oneTuition:"",
        twoTuition:"",
        thirdTuition:"",
        fourTuition:"",
        website:"",
        telephone:"",
        interCourseFoundedTime:"",
        course:"",
        authentication:"",
        students:"",
        studentCapacity:"",
        graduatedStuNum:"",
        stuDominantNationality:"",
        staffNum:"",
        teacherNum:"",
        foreignTeacherNum:"",
        teacherStuRatio:"",
        coveredArea:"",
        builtArea:"",
        hardware:"",
        investment:"",
        remark:"",
        submitter:"",
        schoolLogo:"",
        schoolShowOne:"",
        schoolShowTwo:"",
        schoolShowThird:"",
        schoolShowFour:"",
        schoolShowFive:"",
        schoolDesc:"",
        accommodation:"",
        studentEnrollment:"",
        studeAbroadCountries:"",
        prospects:"",
        filingFee:"",
        schoolManagement:"",
        schoolCharacteristics:"",
        courseSystem:"",
        nationalityOfStudents:"",
        classSize:"",
        teachingForm:"",
        companyAnalysis:"",
        verifySign:"",
        yearOfData:"",
      },
      //表单验证
      rules:{
        schoolName:[
          {required:true,message:"学校名字不能为空",trigger:'blur'}
        ],
        schoolEnglishName:[
          {required:true,validator: schoolEnglishName,trigger: 'blur' }
        ]
      },

    }

  },
  methods:{
    //下拉框
    CityProvice:function(){
      // this.isEdit = msg;
      console.log(store.state.isEd);

      if(this.isEdit == store.state.isEd){
        console.log("0000000")
        if(this.i++ == 0){
          console.log(1111111111)
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex;
          let indexOneCs = myCityProvice.selectedIndex-1;

          this.curshe = indexOne-1;
          this.form.province = myCityProvice[indexOne].text;
          this.form.town = this.provice[this.curshe].city[0].name;
          console.log(this.form.town)
        }else{
          console.log(222222222)
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex ;
          this.curshe = indexOne;
          this.form.province = myCityProvice[indexOne].text;
          this.form.town = this.provice[indexOne].city[0].name;
        }
        store.commit("changeis",0)
      }else{
         console.log(3333333)
        let myCityProvice = document.getElementById("cityProvice");
        let indexOne = myCityProvice.selectedIndex ;
        console.log(myCityProvice)
        console.log(indexOne)
        this.curshe = indexOne;
        this.form.province = myCityProvice[indexOne].text;
        this.form.town = this.provice[indexOne].city[0].name;
      }
      this.citySelect = false;
    },
    cityTown:function(){
      let mycityTown = document.getElementById("cityTown");
      let indexTwo = mycityTown.selectedIndex;
      this.form.town = mycityTown[indexTwo].text;
      console.log(this.form.town)
    },
    getData(){
      //判断是否有id字段
      if(this.$route.query.hasOwnProperty('id')){
        getDetails({
          schoolId : this.$route.query.id
        }).then(res=>{
          delete res.data.createTime
          delete res.data.schoolCharacteristicsVo
          delete res.data.studentEnrollmentVo
          this.form = res.data;
        }).catch(error=>{

        })
        this.citySelect = true;
      }else{

      }

    },
    //立即创建按钮   插入  编辑   学校接口
    submitForm:utils.debounce(function(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          //判断是否有id字段
          if(this.$route.query.hasOwnProperty('id')){
            this.form.id = this.$route.query.id;
            console.log(1111)
            getSchoolUpdate(
              this.form
            ).then(res => {
              console.log(res)
              this.$message({
                message: '数据编辑成功',
                type: 'success'
              });
              this.$router.push({path:"/siku/school"})
            }).catch(error => {
              console.log(error)
              this.$message({
                message: '数据编辑失败',
                type: 'error'
              });
            })
          }else{
            getSchoolAdd(
              this.form
            ).then(res =>{
              console.log(res);
              this.$message({
                message: '数据插入成功',
                type: 'success'
              });
              this.$router.push({path:"/siku/school"})
            }).catch(error=>{
              this.$message({
                message: '数据插入失败',
                type: 'error'
              });
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }),
    // 取消页面按钮
    addCancel(){
      // console.log(store.state.isEd)
      // this.$router.push({path:"/siku/school"})
      // console.log(mycityTown[indexTwo].text)
      // this.isEdit = store.state.isEd;

      // console.log(this.isEdit);
      // // console.log(this.form.province);
      console.log(this.form);
    },
  },
  computed: {
    // bus.$off("isEdit")
    // bus.$on("isEdit",msg=>{


    // })

  },
  created() {
    this.getData();

    // if(this.form.province == ""){
    //   this.citySelect = false;
    // }else{
    //    this.citySelect = true;
    // }

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
    color: #606266;
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
  // #seleOp i{
  //   display: block;
  //   width: 5px;
  //   height: 5px;
  //   background: red;
  //   position: absolute;
  //   right: 5px;
  // }
</style>
