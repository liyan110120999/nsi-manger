<template>
  <div class="schoolAdd">
    <!-- <div class="addTitle">添加学校信息<i class="el-icon-close" @click="addCancel"></i></div> -->
    <div class="addBasic">
      <div class="addBaH">添加学校信息</div>
      <div class="addTips">注意：带※标记的为必填项</div>
      <el-form ref="form" :model="form" class="createNews" :rules="rules" label-width="160px">

        <el-form-item label="学校名字" prop="schoolName" class="addFlex">
          <el-input v-model.trim="form.schoolName" @blur="CheckSchool"></el-input>
          <i>学校名字不能为空</i>
        </el-form-item>
        <el-form-item label="学校英文名字" prop="schoolEnglishName">
          <el-input v-model.trim="form.schoolEnglishName" ></el-input>
        </el-form-item>
        <el-form-item label="运营状态" prop="schoolProperties">
          <el-select v-model="form.schoolProperties" placeholder="请选择学校属性" :value-key="form.schoolProperties">
            <el-option label="运营中" value="运营中"></el-option>
            <el-option label="停办" value="停办"></el-option>
            <el-option label="凑建" value="凑建"></el-option>
          </el-select>
        </el-form-item>


        <div class="schoolImg">
          <div class="logoImgThree">
            <el-form-item label="上传学校logo" prop="schoolLogo" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolLogo" class="el_inputOne" disabled></el-input>
            <el-upload
              class="upload-demo deme_upload"
              :disabled = true
              :action="tutscOne"
              :limit="1"
              >
              <el-button size="small" type="primary" class="btnUpata" disabled>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <el-upload
            class="avatar-uploader"
            :action="tutsc"
            :disabled = true
            :show-file-list="false"
            >
            <img v-if="form.schoolLogo" :src="form.schoolLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>



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
            <br/>
            <!-- <span v-if="citySpan == true" id="citySpan">地区不能为空</span> -->
          </p>
        </div>
        <el-form-item label="地址" prop="address" class="addFlex">
          <el-input v-model="form.address" ></el-input>
        </el-form-item>
        <el-form-item label="成立时间" prop="foundingTime" class="addFlex">
          <el-input v-model.number="form.foundingTime" ></el-input>
          <i>请输入四位数字</i>
        </el-form-item>
        <el-form-item label="学校性质" prop="operationState">
          <el-select v-model="form.operationState" placeholder="请选择学校属性" :value-key="form.operationState">
            <el-option label="公办" value="公办"></el-option>
            <el-option label="民办" value="民办"></el-option>
            <el-option label="外籍" value="外籍"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学制" prop="schoolSystem" >
          <div class="addFlexTwo">
            <el-input v-model="form.schoolSystem" :disabled=true></el-input>
            <i>请分号分割 例：幼儿园;小学;初中;</i>
          </div>
          <el-checkbox-group v-model="inputCheckbox">
            <el-checkbox label="幼儿园;" name="schoolSystem">幼儿园</el-checkbox>
            <el-checkbox label="小学;" name="schoolSystem">小学</el-checkbox>
            <el-checkbox label="初中;" name="schoolSystem">初中</el-checkbox>
            <el-checkbox label="高中;" name="schoolSystem">高中</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="幼儿园-学费" prop="oneTuition" class="addFlex">
          <el-input v-model.number="form.oneTuition" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="小学-学费" prop="twoTuition" class="addFlex">
          <el-input v-model="form.twoTuition" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="初中-学费" prop="thirdTuition" class="addFlex">
          <el-input v-model.number="form.thirdTuition" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="高中-学费" prop="fourTuition" class="addFlex">
          <el-input v-model.number="form.fourTuition" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="官网" prop="website">
          <el-input v-model="form.website" ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="form.telephone" ></el-input>
        </el-form-item>
        <el-form-item label="国际课程成立时间" prop="interCourseFoundedTime" class="addFlex">
          <el-input v-model.number="form.interCourseFoundedTime" ></el-input>
          <i>需要为四位整数 例：2019</i>
        </el-form-item>
        <el-form-item label="国际课程" prop="course">
          <div class="addFlexTwo">
            <el-input v-model="form.course"></el-input>
            <i>请分号分割 例:IPC;OMYC;PGA;</i>
          </div>
          <el-checkbox-group v-model="inputCheckboxCourse">
            <el-checkbox label="IPC;" name="course">IPC</el-checkbox>
            <el-checkbox label="OMYC;" name="course">OMYC</el-checkbox>
            <el-checkbox label="PGA;" name="course">PGA</el-checkbox>
            <el-checkbox label="AP;" name="course">AP</el-checkbox>
            <el-checkbox label="IBPYP;" name="course">IBPYP</el-checkbox>
            <br/>
            <el-checkbox label="IBMYP;" name="course">IBMYP</el-checkbox>
            <el-checkbox label="IBDP;" name="course">IBDP</el-checkbox>
            <el-checkbox label="A-LEVEL;" name="course">A-LEVEL</el-checkbox>
            <el-checkbox label="IFCSE;" name="course">IFCSE</el-checkbox>
            <br/>
            <el-checkbox label="蒙特梭利;" name="course">蒙特梭利</el-checkbox>
            <el-checkbox label="美国课程;" name="course">美国课程</el-checkbox>
            <el-checkbox label="澳大利亚课程;" name="course">澳大利亚课程</el-checkbox>
            <br/>
            <el-checkbox label="澳洲VCE;" name="course">澳洲VCE</el-checkbox>
            <el-checkbox label="澳洲WACE;" name="course">澳洲WACE</el-checkbox>
            <el-checkbox label="加拿大课程;" name="course">加拿大课程</el-checkbox>
            <br/>
            <el-checkbox label="双语课程;" name="course">双语课程</el-checkbox>
            <el-checkbox label="校本课程;" name="course">校本课程</el-checkbox>
            <el-checkbox label="ESL;" name="course">ESL</el-checkbox>
            <el-checkbox label="其他;" name="course">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="认证&组织" prop="authentication">
          <div class="addFlexTwo">
            <el-input v-model="form.authentication"></el-input>
            <i>请分号分割 例:CIE;Edexcel;OxfordAQA;</i>
          </div>
          <el-checkbox-group v-model="inputCheckboxauthentication">
            <el-checkbox label="CIE;" name="authentication">CIE</el-checkbox>
            <el-checkbox label="Edexcel;" name="authentication">Edexcel</el-checkbox>
            <el-checkbox label="OxfordAQA;" name="authentication">OxfordAQA</el-checkbox>
            <el-checkbox label="IBO;" name="authentication">IBO</el-checkbox>
            <br/>
            <el-checkbox label="CollegeBoard;" name="authentication">CollegeBoard</el-checkbox>
            <el-checkbox label="CLS;" name="authentication">CLS</el-checkbox>
            <el-checkbox label="WASC;" name="authentication">WASC</el-checkbox>
            <el-checkbox label="NEASC;" name="authentication">NEASC</el-checkbox>
            <br/>
            <el-checkbox label="EARCOS;" name="authentication">EARCOS</el-checkbox>
            <el-checkbox label="AdvancED;" name="authentication">AdvancED</el-checkbox>
            <el-checkbox label="NCCT;" name="authentication">NCCT</el-checkbox>
            <el-checkbox label="ACAMIS;" name="authentication">ACAMIS</el-checkbox>
            <br/>
            <el-checkbox label="ROUND SQUARE;" name="authentication">ROUND SQUARE</el-checkbox>
            <el-checkbox label="FOBISIA;" name="authentication">FOBISIA</el-checkbox>
            <el-checkbox label="ISAC;" name="authentication">ISAC</el-checkbox>
            <br/>
            <el-checkbox label="THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD;" name="authentication">THE DUKE OF EDINBURGH’S INTERNATIONAL AWARD</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="学生总人数" prop="students" class="addFlex">
          <el-input v-model.number="form.students" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="学生容量" prop="studentCapacity" class="addFlex">
          <el-input v-model.number="form.studentCapacity" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="毕业班人数" prop="graduatedStuNum" class="addFlex">
          <el-input v-model.number="form.graduatedStuNum" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="学生主要国籍" prop="stuDominantNationality" class="addFlex">
          <el-input v-model="form.stuDominantNationality" ></el-input>
          <i>请分号分割 例：中国;美国;英国</i>
        </el-form-item>
        <el-form-item label="员工数量" prop="staffNum" class="addFlex">
          <el-input v-model.number="form.staffNum" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="教师数量" prop="teacherNum" class="addFlex">
          <el-input v-model.number="form.teacherNum" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="外籍教师数量" prop="foreignTeacherNum" class="addFlex">
          <el-input v-model.number="form.foreignTeacherNum" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="师生比" prop="teacherStuRatio">
          <el-input v-model="form.teacherStuRatio" ></el-input>
        </el-form-item>
        <el-form-item label="占地面积(亩)" prop="coveredArea" class="addFlex">
          <el-input v-model.number="form.coveredArea" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="建筑面积(平方米)" prop="builtArea" class="addFlex">
          <el-input v-model.number="form.builtArea" ></el-input>
          <i>需要为整数</i>
        </el-form-item>
        <el-form-item label="硬件设施"  prop="hardware">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.hardware"></el-input>
        </el-form-item>
        <el-form-item label="投资信息" prop="investment">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.investment"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.remark"></el-input>
        </el-form-item>

        <div>
          <div class="logoImgThree">
            <el-form-item label="大图1" prop="schoolShowOne" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolShowOne" class="el_inputOne"></el-input>
            <el-upload
                class="upload-demo deme_upload"
                :action="tutscOne"
                :disabled = true
                :limit="1"
                >
                  <el-button size="small" type="primary" class="btnUpata"  disabled>点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
          </div>
        </div>

        <div>
          <div class="logoImgThree">
            <el-form-item label="大图2" prop="schoolShowTwo" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolShowTwo"  class="el_inputOne"></el-input>
            <el-upload
              class="upload-demo deme_upload"
              :action="tutscOne"
              :disabled = true
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary"  class="btnUpata" disabled>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>

        <div>
          <div class="logoImgThree">
            <el-form-item label="大图3" prop="schoolShowThird" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolShowThird"  class="el_inputOne"></el-input>
            <el-upload
              class="upload-demo deme_upload"
              :action="tutscOne"
              :disabled = true
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary"  class="btnUpata" disabled>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div>
          <div class="logoImgThree">
            <el-form-item label="大图4" prop="schoolShowFour" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolShowFour"  class="el_inputOne"></el-input>
            <el-upload
              class="upload-demo deme_upload"
              :action="tutscOne"
              :disabled = true
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary"  class="btnUpata" disabled>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>

        <div>
          <div class="logoImgThree">
            <el-form-item label="大图5" prop="schoolShowFive" class="logoBtn"></el-form-item>
            <el-input v-model="form.schoolShowFive"  class="el_inputOne"></el-input>
            <el-upload
              class="upload-demo deme_upload"
              :disabled = true
              :action="tutscOne"
              :limit="1"
              :file-list="fileList">
              <el-button size="small" type="primary"  class="btnUpata" disabled>点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>

        <el-form-item label="学校简介" prop="schoolDesc">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.schoolDesc"></el-input>
          <!-- <el-input v-model="form.schoolDesc" ></el-input> -->
        </el-form-item>
        <el-form-item label="住宿情况" prop="accommodation">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.accommodation"></el-input>
          <!-- <el-input v-model="form.accommodation" ></el-input> -->
        </el-form-item>


        <!-- 招生信息 -->
        <div class="RecruitStudents">
          <h2>招生信息</h2>
          <h4>幼儿园</h4>
          <div class="Kindergarten">
            <el-form-item label="招生对象" prop="target">
              <el-input v-model="school.Kindergarten.招生对象"></el-input>
            </el-form-item>
            <el-form-item label="授课形式" prop="froml">
              <el-input v-model="school.Kindergarten.授课形式" ></el-input>
            </el-form-item>
            <el-form-item label="入学要求" prop="require">
              <el-input v-model="school.Kindergarten.入学要求" ></el-input>
            </el-form-item>
            <el-form-item label="班级规模" prop="scale">
              <el-input v-model="school.Kindergarten.班级规模" ></el-input>
            </el-form-item>
            <el-form-item label="入学考试" prop="exam">
              <el-input v-model="school.Kindergarten.入学考试" ></el-input>
            </el-form-item>
            <el-form-item label="是否住宿" prop="stay">
              <el-input v-model="school.Kindergarten.是否住宿" ></el-input>
            </el-form-item>


          </div>

          <h4>小学</h4>
          <div class="Kindergarten">
            <el-form-item label="招生对象" prop="target">
              <el-input v-model="school.primarySchool.招生对象"></el-input>
            </el-form-item>
            <el-form-item label="授课形式" prop="froml">
              <el-input v-model="school.primarySchool.授课形式" ></el-input>
            </el-form-item>
            <el-form-item label="入学要求" prop="require">
              <el-input v-model="school.primarySchool.入学要求" ></el-input>
            </el-form-item>
            <el-form-item label="班级规模" prop="scale">
              <el-input v-model="school.primarySchool.班级规模" ></el-input>
            </el-form-item>
            <el-form-item label="入学考试" prop="exam">
              <el-input v-model="school.primarySchool.入学考试" ></el-input>
            </el-form-item>
            <el-form-item label="是否住宿" prop="stay">
              <el-input v-model="school.primarySchool.是否住宿" ></el-input>
            </el-form-item>
          </div>

          <h4>初中</h4>
          <div class="Kindergarten">
            <el-form-item label="招生对象" prop="target">
              <el-input v-model="school.JuniorHighSchool.招生对象"></el-input>
            </el-form-item>
            <el-form-item label="授课形式" prop="froml">
              <el-input v-model="school.JuniorHighSchool.授课形式" ></el-input>
            </el-form-item>
            <el-form-item label="入学要求" prop="require">
              <el-input v-model="school.JuniorHighSchool.入学要求" ></el-input>
            </el-form-item>
            <el-form-item label="班级规模" prop="scale">
              <el-input v-model="school.JuniorHighSchool.班级规模" ></el-input>
            </el-form-item>
            <el-form-item label="入学考试" prop="exam">
              <el-input v-model="school.JuniorHighSchool.入学考试" ></el-input>
            </el-form-item>
            <el-form-item label="是否住宿" prop="stay">
              <el-input v-model="school.JuniorHighSchool.是否住宿" ></el-input>
          </el-form-item>
          </div>

           <h4>高中</h4>
           <div class="Kindergarten">
            <el-form-item label="招生对象" prop="target">
              <el-input v-model="school.heightSchool.招生对象"></el-input>
            </el-form-item>
            <el-form-item label="授课形式" prop="froml">
              <el-input v-model="school.heightSchool.授课形式" ></el-input>
            </el-form-item>
            <el-form-item label="入学要求" prop="require">
              <el-input v-model="school.heightSchool.入学要求" ></el-input>
            </el-form-item>
            <el-form-item label="班级规模" prop="scale">
              <el-input v-model="school.heightSchool.班级规模" ></el-input>
            </el-form-item>
            <el-form-item label="入学考试" prop="exam">
              <el-input v-model="school.heightSchool.入学考试" ></el-input>
            </el-form-item>
            <el-form-item label="是否住宿" prop="stay">
              <el-input v-model="school.heightSchool.是否住宿" ></el-input>
            </el-form-item>
           </div>

          <!-- <button @click="addscjson">1111</button> -->
           <el-button @click="addscjson">默认按钮</el-button>


        </div>


        <el-form-item label="招生信息" prop="studentEnrollment">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.studentEnrollment"></el-input>
          <!-- <el-input v-model="form.studentEnrollment" ></el-input> -->
        </el-form-item>
        <el-form-item label="留学生留学国家" prop="studeAbroadCountries" class="addFlex">
          <el-input v-model="form.studeAbroadCountries" ></el-input>
          <i>请分号分割 例：中国;美国;英国</i>
        </el-form-item>
        <el-form-item label="招生对象" prop="prospects">
          <el-input v-model="form.prospects" ></el-input>
        </el-form-item>
        <el-form-item label="申请费" prop="filingFee">
          <el-input v-model="form.filingFee" ></el-input>
        </el-form-item>
        <el-form-item label="办学理念" prop="schoolManagement">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.schoolManagement"></el-input>
          <!-- <el-input v-model="form.schoolManagement" ></el-input> -->
        </el-form-item>
        <el-form-item label="办学特色" prop="schoolCharacteristics">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.schoolCharacteristics"></el-input>
          <!-- <el-input v-model="form.schoolCharacteristics" ></el-input> -->
        </el-form-item>
        <el-form-item label="课程体系" prop="courseSystem">
          <el-input v-model="form.courseSystem" ></el-input>
        </el-form-item>
        <el-form-item label="学生国籍数" prop="nationalityOfStudents">
          <el-input v-model="form.nationalityOfStudents" ></el-input>
        </el-form-item>
        <el-form-item label="班级规模" prop="classSize">
          <el-input v-model="form.classSize" ></el-input>
        </el-form-item>
        <el-form-item label="授课形式" prop="teachingForm">
          <el-input v-model="form.teachingForm" ></el-input>
        </el-form-item>
        <el-form-item label="新学说分析" prop="companyAnalysis">
          <el-input type="textarea" placeholder="请输入内容" :rows="4" v-model="form.companyAnalysis"></el-input>
          <!-- <el-input v-model="form.companyAnalysis" ></el-input> -->
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
    <!-- //提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>学校名已存在</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="maxlogo">

    </div>
  </div>
</template>

<script>
// import qs from 'qs';
import {getSchoolAdd,getDetails,getSchoolUpdate,getSchoolCheck,getupolad} from '@/api/api';
import utils from '@/api/utils.js'
import {provice} from '../../api/city.js'
import bus from "@/api/bus";
import axios from "axios";
import store from '../../vuex/store.js'
export default {
  data() {
    //学校英文名字验证
    var schoolEnglishName = (rele,value,callback) =>{
      let parent = /^[^\(\,]+[a-zA-Z]+$/;
      if(value == ""){
        callback();
      }else{
        if(parent.test(value)){
          callback()
        }else{
          callback(new Error("格式不正确,不能出现中文或者特殊符号"));
        }

      }
    };
    //验证成立时间
    var foundingTime = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback()
      }else{
        if(!/^\d+$/.test(value)){
          callback(new Error("格式不正确,请输入四位数字  例：2019"));
        }else{
          let num = value;
          num = num.toString();
          if(num.length == "4"){
            callback()
          }else{
              callback(new Error("格式不正确,请输入四位数字  例：2019"));
          }

        }
      }
    };
    //验证网址头
    var website = (rele,value,callback) =>{
      if(value == "" || value == null){
        callback();
      }else{
        if(value.indexOf("http") == 0 || value.indexOf("https") == 0){
          callback(new Error("禁止出现 http://或https:// 开头 例:baidu.com"));
        }else{
          callback()
        }
      }
    };
    //学费  容量
    var twoTuition = (rele,value,callback) =>{
      if(value == "" || value == null){
          console.log("ronliang1111")
          callback()
      }else{
        if(!/^\d+$/.test(value)){
          console.log("不是整数");
          callback(new Error("必须为数字值 例：25000"));
        }else{
          callback()
        }
      }
    };
    return {
      tutsc:axios.defaults.baseURL+"/new/school/upload_logo.do?" + "schoolId=" + this.$route.query.id,
      tutscOne:axios.defaults.baseURL+"/new/school/upload_img.do?" + "schoolId=" + this.$route.query.id,
      schoolLogo:"",
      provice:provice, //城市
      fileList: [],
      curshe:0,
      citySelect:false,
      i:0,
      isEdit:1,
      target:"无要求", //招生对象
      froml:"英语", //授课形式
      requirel:"测试+面试",//入学要求
      scale:"15-23人",//班级规模
      exam:"数学英语", //入学考试
      stay:"否",//是否住宿
      citySpan:true, //地区提示文字
      inputCheckbox:[], //学制
      inputCheckboxCourse:[], //课程
      inputCheckboxauthentication:[], //认证组织
      centerDialogVisible: false,//提示框
      //表单属性
      "school":{
        "Kindergarten":{"招生对象":"无要求","授课形式":"英语","入学要求":"测试+面试","班级规模":"18-22人","入学考试":"数学英语","是否住宿":"是"},
        "primarySchool":{"招生对象":"无要求","授课形式":"英语","入学要求":"测试+面试","班级规模":"18-22人","入学考试":"数学英语","是否住宿":"是"},
        "JuniorHighSchool":{"招生对象":"无要求","授课形式":"英语","入学要求":"测试+面试","班级规模":"18-22人","入学考试":"数学英语","是否住宿":"是"},
        "heightSchool":{"招生对象":"无要求","授课形式":"英语","入学要求":"测试+面试","班级规模":"18-22人","入学考试":"数学英语","是否住宿":"是"},
      },
       mouse:[],
      form: {
        schoolName:"",  //学校名字
        schoolEnglishName:"", //学校英文名
        schoolProperties:"",  //学校性质
        province:"",//省
        town:"", //市
        address:"", //地址
        foundingTime:"",  //成立时间
        operationState:"", //运营状态
        schoolSystem:"", //学制
        oneTuition:"", //幼儿园学费
        twoTuition:"",  //小学学费
        thirdTuition:"",  //初中学费
        fourTuition:"", //高中学费
        website:"",  //官网
        telephone:"",  //电话
        interCourseFoundedTime:"", //国际学校成立时间
        course:"",  //课程
        authentication:"",  //认证
        students:"",  //学生总人数
        studentCapacity:"", //学生容量
        graduatedStuNum:"", //毕业班人数
        stuDominantNationality:"", //学生主要国籍
        staffNum:"", //员工数量
        teacherNum:"", //教师数量
        foreignTeacherNum:"", //外籍教师数量
        teacherStuRatio:"", //师生比
        coveredArea:"", //占地面积
        builtArea:"", //建筑面积
        hardware:"",  //硬件设施
        investment:"", //投资信息
        remark:"",  //备注
        submitter:localStorage["userName"], //提交人
        schoolLogo:"", //学校logo
        schoolShowOne:"",  //大图1
        schoolShowTwo:"",  //大图2
        schoolShowThird:"",  //大图3
        schoolShowFour:"",  //大图4
        schoolShowFive:"",  //大图5
        schoolDesc:"",  //学校剪辑
        accommodation:"",  //住宿情况
        studentEnrollment:"", //招生情况
        studeAbroadCountries:"",  //留学生留学国家
        prospects:"", //招生对象
        filingFee:"",  //申请费
        schoolManagement:"",  //办学理念
        schoolCharacteristics:"",  //办学特色
        courseSystem:"",  //课程体系
        nationalityOfStudents:"",  //学生国籍数
        classSize:"",  //班级规模
        fromForm:"",  //授课形式
        companyAnalysis:"",  //新学说分析
        verifySign:"",  //0：审核中 1：审核通过
        yearOfData:2019, //数据年份
      },
      //表单验证
      rules:{
        schoolName:[ //学校名字
          {required:true,message:"学校名字不能为空",trigger:'blur'},
        ],
        schoolEnglishName:[ //学校英文名字
          {required:true,validator: schoolEnglishName,trigger: 'blur' }
        ],
        schoolProperties:[ //学校性质
        ],
        address:[ //地址
          // {required:true,message:"地址不能为空",trigger:'blur'}
        ],
        foundingTime:[ //成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        operationState:[//运营状态
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        schoolSystem:[//学制
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        oneTuition:[ //幼儿园学费
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        twoTuition:[ //小学学费
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        thirdTuition:[ //初中学费
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        fourTuition:[ //高中学费
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        website:[ //官网
          {required:true,validator: website,trigger: 'blur' }
        ],
        telephone:[ //电话
        ],
        interCourseFoundedTime:[ //国际学校成立时间
          {validator: foundingTime,trigger: 'blur' }
        ],
        course:[//国际课程
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
         authentication:[ //认证组织
          // {required:true,message:"选项不能为空",trigger:'blur'}
        ],
        students:[ //学生总人数
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        studentCapacity:[//学生容量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        graduatedStuNum:[//毕业班人数
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        stuDominantNationality:[//学生主要国籍
        ],
        staffNum:[//员工数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        teacherNum:[//教师数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        foreignTeacherNum:[//外籍教师数量
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        teacherStuRatio:[//师生比
        ],
        coveredArea:[//占地面积
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        builtArea:[//建筑面积
          {required:true,validator: twoTuition,trigger: 'blur' }
        ],
        hardware:[ //硬件设施
          // {required:true,message:"硬件不能为空",trigger:'blur'},
        ],
        investment:[//投资信息

        ],
        remark:[ //备注

        ],
      },

    }

  },
  methods:{
    //判断学校是否重复
    CheckSchool(){
      if(this.$route.query.hasOwnProperty('id')){

      }else{
        console.log(11111);

        getSchoolCheck({
          schoolName:this.form.schoolName
        }).then(res=>{
          console.log(res)
          res.code == 0 ? "" : this.centerDialogVisible = true;
          // if(res.code != 0){
          //   this.centerDialogVisible = true
          // }
        }).catch(error=>{
          console.log(error)
        })
      }

    },
    //下拉框
    CityProvice:function(){
      if(this.isEdit == store.state.isEd){
        if(this.i++ == 0){
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex;
          let indexOneCs = myCityProvice.selectedIndex-1;
          this.curshe = indexOne-1;
          this.form.province = myCityProvice[indexOne].text;
          this.form.town = this.provice[this.curshe].city[0].name;
        }else{
          let myCityProvice = document.getElementById("cityProvice");
          let indexOne = myCityProvice.selectedIndex ;
          this.curshe = indexOne;
          this.form.province = myCityProvice[indexOne].text;
          this.form.town = this.provice[indexOne].city[0].name;
        }
        store.commit("changeis",0)
      }else{
        let myCityProvice = document.getElementById("cityProvice");
        let indexOne = myCityProvice.selectedIndex ;
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
    },

    //立即创建按钮   插入  编辑   学校接口
    submitForm:utils.debounce(function(formName) {
      //学制 分隔符中英文转换
      let str1 = this.form.schoolSystem;
      this.form.schoolSystem = str1;
      //课程中英文分隔符转换
      let str3 = this.form.course;
      let str4 = str3.split("；").join(";")
      str4.charAt(str4.length-1) == ";" || str4.length==0  ? "" : str4= str4 + ";";
      this.form.course = str4
      //认证组织 分隔符中英文转换
      let str5 = this.form.authentication;
      let str6 = str5.split("；").join(";")
      str6.charAt(str6.length-1) == ";" || str6.length==0 ? "" : str6= str6 + ";";
      this.form.authentication = str6
      //师生比 冒号中英文转换
      let str7 = this.form.teacherStuRatio;
      str7 = str7.replace(/：/g,":");
      this.form.teacherStuRatio = str7;

      //立即创建按钮的执行操作
      this.$refs[formName].validate((valid) => {
        if (valid) {
            //添加接口
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
      console.log( this.form.schoolShowOne)
    },
    //json 生成
    addscjson:function(){
      console.log(this.school)
      // this.mouse = this.mouse.push(this.school)
      this.form.studentEnrollment=JSON.stringify(this.school)
    }
  },
  created() {
  },
  watch: {
    //学制多选
    "inputCheckbox":function(val){
      let str1 = ""
      for(let i=0;i<val.length;i++){
        str1 += val[i]
      }
      this.form.schoolSystem = str1;
    },
    //国际课程多选
    "inputCheckboxCourse":function(val){
      let str2 = ""
      for(let i=0;i<val.length;i++){
        str2 += val[i]
      }
      this.form.course = str2;
    },
    //认证组织
    "inputCheckboxauthentication":function(val){
      let str3 = ""
      for(let i=0;i<val.length;i++){
        str3 += val[i]
      }
      this.form.authentication = str3;
    }
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
    h2{

    }
    h4{
      margin-top: 0px;
      margin-bottom: 20px;
    }
    .Kindergarten{
      display: flex;
      flex-wrap: wrap;
    }
    .el-form-item[data-v-7e47b10f] {
      margin-top: 0px;
    }
  }
</style>
