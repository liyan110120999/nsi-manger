<template>
  <div class="school">
    <!-- 表格 -->
    <el-table
      :data="DataList"
      id="rebateSetTable"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="id"
        align="center"
        fixed="left"
        label="id"
        width="70">
      </el-table-column>
      <el-table-column
        prop="env"
        align="center"
        label="浏览器详情信息"
        width="400">
      </el-table-column>
      <el-table-column
        prop="request_data"
        align="center"
        label="接口参数"
        :show-overflow-tooltip="true"
        width="190">
      </el-table-column>
      <el-table-column
        prop="html_url"
        align="center"
        label="报错页面"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
      <el-table-column
        prop="api_url"
        align="center"
        label="报错接口"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
      <el-table-column
        prop="err_msg"
        align="center"
        label="返回值"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
      <el-table-column
        prop="create_time"
        align="center"
        label="创建时间"
        :show-overflow-tooltip="true"
        width="250">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="SysExceptionLogDelete(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- {{schoolData}}111 -->
  </div>

</template>

<script>
import axios from "axios";
import QS from 'qs';
import {getSysExceptionLogList,getSysExceptionLogDelete} from "@/api/api";
import utils from "@/api/utils.js";
export default {
  data() {
    return {
      DataList:[]
    }
  },
  methods: {
    // 请求列表数据
    getList(){
      getSysExceptionLogList({

      }).then(res => {
        this.DataList = res.data
        console.log(res.data)
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
        for(var i=0; i<res.data.length; i++){
          var d=new Date(res.data[i].create_time);
          console.log( formatDate(d))
          this.DataList[i].create_time = formatDate(d);
        }

        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //删除数据
    SysExceptionLogDelete(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getSysExceptionLogDelete({
          id:id
        }).then(res => {
          console.log(id)
          this.getList()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log("取消")
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });




    }

  },
  created() {
    this.getList()
  }
}

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
  .QRcodebox{
    text-align: center;
    .CQRcodeURL{
      width: 220px;
      margin-top: 20px;
    }
    span{
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
