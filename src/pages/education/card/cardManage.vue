<template>
  <div class="school">
    <div class="headerBox headerBox_two">
      <!-- <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="搜索内容">
          <el-select v-model="form.searchKey" placeholder="请选择"  @change="changeSearch">
            <el-option label="姓名" value="username"></el-option>
            <el-option label="电话" value="telphone"></el-option>
            <el-option label="邮箱" value="userMail"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <el-input class="headerBox_three" v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="success" icon="el-icon-search" @click="schoolSearch">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="EliteData"
      border
      style="width: 100%"
      height="640">
      <el-table-column
        prop="itemId"
        align="center"
        fixed="left"
        label="id"
        width="80">
      </el-table-column>
      <el-table-column
        prop="nickName"
        align="center"
        label="昵称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="标题"
        width="400">
      </el-table-column>
      <el-table-column
        align="center"
        label="评论"
        :show-overflow-tooltip="true"
        width="600">
        <template slot-scope="scope">
          <p @click="contentBtn(scope.row.content,scope.row.itemId)" class="hoveColor">{{scope.row.content}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"  
        width="100"
        v-if="EliteShow">
        <template slot-scope="scope">
          <!-- <el-button @click="EliteAgree(scope.row.id)" type="text" size="small" style="color:#67C23A">{{EliteAgreeHtml}}</el-button> -->
          <el-button @click="EliteDisagree(scope.row.itemId)" type="text" size="small" style="color:red">{{EliteRefuseHtml}}</el-button>
        </template>
      </el-table-column>


    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage1"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="ExhibitionPageSize">
      </el-pagination>
    </div>

    <!-- {{prizeDrawData}}111 -->
  </div>
</template>

<script>
import axios from "axios";
import {postItemList,postItemDelete} from "@/api/api";
import utils from "@/api/utils.js";
export default {
  data() {
    return {
      input:"",
      currentPage1: 5,
      ExhibitionPageSize:0,
      pageNum:1,
      pageSize:50,
      EliteData:[],
      isCheck:1,
      activeName: '0',
      EliteShow:true,
      EliteAgreeHtml:"编辑",
      EliteRefuseHtml:"删除",
      searchState:""
    }
  },
  methods: {
    // 请求审核数据
    getData(){
      let that = this;
      postItemList({
        pageNum:1,
        pageSize:10,
        isCheck:1,
        title:this.input
      }).then(res=>{
        this.ExhibitionPageSize = res.data.total;
        that.EliteData= res.data.list;
        //评论截取
        for(var i=0; i<res.data.list.length; i++){
          that.EliteData[i].content = that.EliteData[i].content.slice(0,30) + "..."
        }
         //时间戳 转换时间
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
        for(var i=0; i<res.data.list.length; i++){
          var d=new Date(res.data.list[i].createTime);
          this.EliteData[i].createTime = formatDate(d);
        }
        for(var i=0; i<res.data.list.length; i++){
          var d=new Date(res.data.list[i].updateTime);
          this.EliteData[i].updateTime = formatDate(d);
        }

      }).catch(error=>{
        this.$message({
          message: '数据请求失败',
          type: 'error'
        });
      })
    },
    // 每页多少条
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    // 当前页: ${val}`;
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getData()
    },
    //编辑按钮
    EliteAgree(row) {
        // this.$router.push({path:'/siku/sikuEliteDetail',query:{talentId:row}});
        console.log("编辑")
    },
    //删除操作
    EliteDisagree(row){
      this.$confirm('此操作将删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        postItemDelete({
          itemId:row
        }).then(res => {
          
          this.$message({
            message: '该信息已删除',
            type: 'success'
          });
          this.getData()    
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //搜索
    schoolSearch(){
      this.getData()
    },
    //查看评论 富文本编辑器
    contentBtn(row,id){
      localStorage.setItem("code",row)
      this.$router.push({path:"/card/cardDetail",query:{isState:"1",itemId:id}})
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  .headerBox_two{
    height: 60px;
    // width: 630px;
    .headerBox_three{
      width: 200px;
    }
    form{
      input{
        width: 120px;
      }
    }
    form,.headerBox_three,button{
      float: left;
      margin-left: 10px;
    }

  }
  .hoveColor:hover{
    color: #24d2b5;
    cursor:pointer;
  }
</style>
