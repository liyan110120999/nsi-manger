<template>
<div>
  <!-- 头部按钮 -->
  <div class="headerBtn">
    <!-- <div class="headerBtnLeft">
      <el-button @click="createNews" type="primary">添加资讯</el-button>
    </div> -->
    <div class="headerBtnRight">
      <el-input v-model="keyword" placeholder="请输入关键字搜索"></el-input>
      <el-button type="success" class="selectBtn" @click="getWebsiteTable"><i class="el-icon-search"></i><span>查询</span></el-button>
    </div>

  </div>
  <!-- 表格 -->
  <el-table
    :data="websiteTableData"
    border
    stripe
    v-loading="websiteTableDataloading"
    class="websiteTable">
    <el-table-column
      prop="_id"
      align="center"
      label="编号"
      width="250">
    </el-table-column>

    <el-table-column
      prop="user.chineseName"
      align="center"
      label="用户"
      width="200">
    </el-table-column>

    <el-table-column
      prop="card.cardName"
      align="center"
      label="卡类型"
      width="100">
    </el-table-column>

    <el-table-column
      prop="card.amount"
      align="center"
      label="金额"
      width="100">
    </el-table-column>

    <el-table-column
      prop="card.given"
      align="center"
      label="赠送金额"
      width="100">
    </el-table-column>

    <el-table-column
      prop="iceArena.iceArenaName"
      label="场地"
      align="center"
      width="300">
    </el-table-column>

    <el-table-column
      prop="modifiedTime"
      align="center"
      width="300"
      label="时间">
    </el-table-column>

    <!-- <el-table-column
      prop="type"
      label="类型"
      align="center"
      width="200">
    </el-table-column> -->

    <el-table-column
      prop=""
      label=""
      align="center">
    </el-table-column>

    <!-- <el-table-column
      prop="articleReader"
      label="浏览量"
      align="center"
      width="120">
    </el-table-column> -->

    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <!-- <el-button @click.prevent="edit(scope.row.id)" type="text" size="small">编辑</el-button> -->
        <el-button @click.prevent="deleteTableData(scope.row._id)" type="text" size="small" style="color:#f56c6c">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    class="mypagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10,20,30,40,50]"
    :page-size="100"
    :total="pageTotalnum">
  </el-pagination>
</div>

</template>

<script>
  export default {
    data() {
      return {
        websiteTableData: [],//表格数据
        pageTotalnum:0,//数据总数
        pageNum:1,//页码
        pageSize:10,//默认每页数据量
        typeIndex:1,//序号开始
        keyword:'',//搜索
        websiteTableDataloading:true,//表格数据展示
        warnClass:'warnClass',
        commonCalss:''
      }
    },
    methods:{
      //获取表格数据
      getWebsiteTable(){
        var that=this
        that.websiteTableDataloading=true
        let url=this.baseUrl + "/test/list"+"?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&searchkey="+this.keyword
        this.$axios.get(url).then(function(response){

          that.pageTotalnum=response.data.count;
          that.websiteTableData=response.data.data

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
          //如果记得时间戳是毫秒级的就需要*1000 不然就错了记得转换成int整型
          for(var i=0; i<response.data.data.length; i++){
            var d=new Date(parseInt(response.data.data[i].modifiedTime));
            console.log("D::"+that.websiteTableData[i].modifiedTime)
            that.websiteTableData[i].modifiedTime = formatDate(d);
            console.log("modifiedTime::"+that.websiteTableData[i].modifiedTime)
          }


          console.log(that.websiteTableData)
          let websiteTableDataLength=that.websiteTableData.length
          let flagNum=0
          that.websiteTableDataloading=false

        }).catch(function (response){
          that.websiteTableDataloading=false
          console.log("response "+response)
          that.$message({
            message: '数据请求失败，请检查网络',
            type: 'error'
          });
        });
      },
      //页码改变
      handleCurrentChange(num){
        this.pageNum=num
        this.getWebsiteTable()
      },
      //一页数据量改变
      handleSizeChange(num){
        this.pageSize=num
        this.getWebsiteTable()
      },
     
      //删除信息
      deleteTableData(id){
        var that=this
        that.$confirm('此操作将删除该条信息,且无法恢复, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
            let url=that.baseUrl + "/test/delete"+"?id="+id
            that.$axios.get(url).then(function(res){
                console.log(res)
                if(res.data.code==1){
                    that.$message({
                        message: "删除成功",
                        type: 'success'
                    });
                }else{
                    that.$message({
                        message: "操作失败",
                        type: 'error'
                    });
                }
                that.getWebsiteTable()
            }).catch(function (res){
                console.log(res)
                that.$message({
                    message: '数据请求失败，请检查网络',
                    type: 'error'
                });
            });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //复制链接成功
      copysucess(){
        this.$message({
          message: '复制链接成功',
          type: 'sucess'
        });
      },
      //复制失败
      copyError(){
        this.$message({
          message: '复制链接失败',
          type: 'sucess'
        });
      },
  

    },
    created(){
      //初始化表格数据
      this.getWebsiteTable()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .warnClass{
    color:#F00;
  }
</style>
