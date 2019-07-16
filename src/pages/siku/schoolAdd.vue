<template>
  <div class="schoolAdd">
    <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div>
    <div class="addTips">注意：带※标记的为必填项</div>
    <!-- <div class="addBasic">
      <div class="addBaH">基本信息</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="学校英文姓名">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="学校性质" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="学校地址" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="建校时间">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="学费/年" class="addFee">
          <el-form-item label="幼儿园" label-width="60px">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="小学" label-width="60px">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="幼儿园" label-width="60px">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="小学" label-width="60px">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addBasic">
      <div class="addBaH">课程信息</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="国际课程认证时间">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="国际课程">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="认证&组织" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="外语考试与评估" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addBasic">
      <div class="addBaH">课程信息</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="年段学生数(国际部)">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="在校生总人数(国际部)">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="总容量(国际部)" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="毕业人数(国际部)" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="毕业班人数(国际部)">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="学生主要国籍">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="生均年收入">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="俱乐部数量">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addBasic">
      <div class="addBaH">师资力量</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="校长/国际部主任国籍">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="总员工数量">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="总教师数量" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="外籍教师数量" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="师均年培训投入">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="教师流失率">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="教师薪酬（三年经验）">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="师生比">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addBasic">
      <div class="addBaH">师资力量</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="占地面积（亩）">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="建筑面积（平方米）">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="硬件设施" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="投资信息" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="addBasic">
      <div class="addBaH">资格认证</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="主流学术保障认证机构">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label=" 学生评测">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label=" 第三方组织机构" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="课程认证" class="schoolSite">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="addBasic">
      <div class="addBaH">课程信息</div>
      <el-form ref="form" :model="form" class="createNews" label-width="160px">
        <el-form-item label="学校名字">
          <el-input v-model="form.schoolName" ></el-input>
        </el-form-item>
        <el-form-item label="学校英文名字">
          <el-input v-model="form.schoolEnglishName" ></el-input>
        </el-form-item>
        <el-form-item label="学校性质">
          <el-input v-model="form.schoolProperties" ></el-input>
        </el-form-item>
        <el-form-item label="省">
          <el-input v-model="form.province" ></el-input>
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="form.town" ></el-input>
        </el-form-item>
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
        <el-form-item label="提交人">
          <el-input v-model="form.submitter" ></el-input>
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
        <el-form-item label="0：审核中；1：审核通过">
          <el-input v-model="form.verifySign" ></el-input>
        </el-form-item>
        <el-form-item label="数据年份">
          <el-input v-model="form.yearOfData" ></el-input>
        </el-form-item>
        <el-form-item class="addBtn">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>





  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        schoolName: '',
        schoolEnglishName:"",
        schoolProperties:"",
        province:"",
        town:"",
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
        yearOfData:""
      }
    }
  },
  methods:{
    onSubmit() {
      console.log(this.form.yearOfData,this.form.verifySign);
    },
    // 取消按钮
    addCancel(){
      this.$router.push({path:"/siku/school"})
    },

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
      height: 30px;
      width: 100px;
      line-height: 30px;
      text-align: center;
      margin-top: 30px;
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
  .addBtn{

  }
</style>
