<template>
  <div class="school">
    <!-- 头部导航 -->
    <div class="headerBtn" style="">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="headerBtnRight">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="success" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="headerBtnLeft">
          <el-button type="primary" @click="schoolAddPage">添加商品</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="schoolData"
      border
      style="width: 100%"
      height="500">
      <el-table-column
        align="center"
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="schoolName"
        align="center"
        fixed="left"
        label="中文名"
        height="100"
        width="190">
      </el-table-column>
      <el-table-column
        prop="id"
        align="center"
        label="ID"
        width="90">
      </el-table-column>
      <el-table-column
        prop="schoolEnglishName"
        align="center"
        label="英文名"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column label="基本信息" align="center">
        <el-table-column
          prop="schoolProperties"
          label="类型"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="operationState"
          label="运营状态"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="schoolSystem"
          label="学制"
          :show-overflow-tooltip="true"
          align="center"
          width="150">
        </el-table-column>
      </el-table-column>
      <el-table-column label="课程&认证" align="center">
        <el-table-column
          prop="course"
          label="国际课程"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="认证"
          align="center"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <el-table-column
          prop="province"
          label="省"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="town"
          label="市"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          :show-overflow-tooltip="true"
          label="详细地址"
          align="center"
          width="300">
        </el-table-column>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <el-table-column
          prop="foundingTime"
          label="建校"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="国际课程认证"
          align="center"
          width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column label="学费" align="center">
        <el-table-column
          prop="oneTuition"
          label="幼儿园"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="twoTuition"
          label="小学"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="thirdTuition"
          label="初中"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="fourTuition"
          label="高中"
          align="center"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column label="学生数" align="center">
        <el-table-column
          prop="graduatedStuNum"
          label="毕业班(国际部)"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="studentCapacity"
          label="总在容量(国际部)"
          align="center"
          width="150">
        </el-table-column>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <el-table-column
          prop="website"
          label="官网"
          align="center"
          width="190">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          align="center"
          width="190">
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="130">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">分享</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="schoolPageSize">
      </el-pagination>
    </div>
    <!-- {{schoolData}}111 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input:"",
      schoolData:null,
      currentPage1: 5,
      schoolPageSize:0,
      pageNum:1,
      pageSize:10,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
    }
  },
  methods: {
    getSchoolData(){
      let url=this.baseUrl + "/new/school/list.do";
      let that = this;
      this.$axios.get(url,{
        params:{
          pageNum : that.pageNum,
          pageSize : that.pageSize
        }
      }).then(function (res) {
        that.schoolData=res.data.data.list;
        that.schoolPageSize = res.data.data.total;
      }).catch(function name(params) {

      })
    },
    schoolAddPage(){
      this.$router.push({path:"/siku/schooAdd"})
    },
    // console.log(`当前页: ${val}`);
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getSchoolData()
    }
  },
  created() {
    this.getSchoolData()

  }
}

// http://data.xinxueshuo.cn/nsi-1.0/new/school/list.do


        // let url=this.baseUrl + "/goods/goods_list.do"+"?type=新学说书籍&state="+that.billstatusValue+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&searchKey="+this.keyword
        // this.$axios.get(url)

        // .then(function(response){
        //   that.pageTotalnum=response.data.data.total
        //   that.websiteTableData=response.data.data.list
        //   for (let index = 0; index <  that.websiteTableData.length; index++) {
        //     that.websiteTableData[index].goodsCreattime=that.dateToDo(that.websiteTableData[index].goodsCreattime)
        //   }
        //   let websiteTableDataLength=that.websiteTableData.length
        //   that.websiteTableDataloading=false
        // }).catch(function (response){
        //   that.websiteTableDataloading=false
        //   that.$message({
        //     message: '数据请求失败',
        //     type: 'error'
        //   });
        // });

</script>

<style lang="scss" scoped>
  .headerBtn{
    display: flex;
    justify-content: start;
    .headerBtnLeft{
      margin-left: 30px;
    }
  }
  .block{
    margin-top: 30px;
  }
</style>
