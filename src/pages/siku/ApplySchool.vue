<template>
  <div class="wrapper">
    <!-- 表格 -->
    <el-table
      :data="AppluSchoolData"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="id"
        align="center"
        label="编号"
        :show-overflow-tooltip="true"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        fixed="left"
        label="学生姓名"
        width="170">
      </el-table-column>
      <el-table-column
        prop="telphone"
        align="center"
        label="手机号"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
       <el-table-column
        prop="attend"
        align="center"
        label="在读年级"
        :show-overflow-tooltip="true"
        width="200">
      </el-table-column>
       <el-table-column
        prop="remark"
        align="center"
        label="备注"
        :show-overflow-tooltip="true"
        width="220">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        width="300">
      </el-table-column>


      <!-- <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="schoolDetail(scope.row.id)" type="text" size="small" style="color:#67C23A">编辑</el-button>
          <el-button @click="SchoolDelete(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
  import {getApplySchool} from '@/api/api'
  export default {

    components: {

    },
    data() {
      return {
        AppluSchoolData:[],
        schoolPageSize:""
      }
    },
    methods: {
      getApplySchoolData(){
        getApplySchool({

        }).then(res => {
          this.AppluSchoolData = res.data.list
          this.schoolPageSize = res.data.list.length
          function formatDate(now) {
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          }
          //如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成整型
          console.log(res.data.list.length)
          for(var i=0; i<res.data.list.length; i++){
            var d=new Date(res.data.list[i].createTime);
            this.AppluSchoolData[i].createTime = formatDate(d);
          }

          console.log(res)
        }).catch(error => {

        })
        console.log("1111")
      }
    },
    created() {
      this.getApplySchoolData()
    },

  }
</script>

<style>

</style>
