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
          <el-button type="primary">添加商品</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="schoolData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        fixed="left"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="schoolName"
        align="center"
        fixed="left"
        label="中文名"
        width="150">
      </el-table-column>
      <el-table-column label="课程&认证">
        <el-table-column
          prop="name"
          label="外部考试与"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    {{schoolData}}111
  </div>
</template>

<script>
export default {
  data() {
    return {
      input:"",
      schoolData:"1111111",
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
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    getSchoolData(){
      let url=this.baseUrl + "/new/school/list.do";
      let that = this;
      this.$axios.get(url,{
        params:{}
      }).then(function (res) {
        console.log("11111")
        console.log(that.schoolData);
        that.schoolData=res.data.data.list
          // console.log(res.data.data.list);
          console.log(5412654156456);
      }).catch(function name(params) {

      })
      //  var that=this;
      //  let url=this.baseUrl + "/new/school/list.do"
      //   this.$axios.get(url)
      //   .then(function(response){
      //     consoele.log(response)
      //     that.pageTotalnum=response.data.data.total
      //     that.websiteTableData=response.data.data.list
      //     for (let index = 0; index <  that.websiteTableData.length; index++) {
      //       that.websiteTableData[index].goodsCreattime=that.dateToDo(that.websiteTableData[index].goodsCreattime)
      //     }
      //     let websiteTableDataLength=that.websiteTableData.length
      //     that.websiteTableDataloading=false
      //   }).catch(function (response){
      //     that.websiteTableDataloading=false
      //     that.$message({
      //       message: '数据请求失败',
      //       type: 'error'
      //     });
      //   });
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

<style lang="scss">
  .headerBtn{
    display: flex;
    justify-content: start;
    .headerBtnLeft{
    margin-left: 30px;
    }
  }
</style>
