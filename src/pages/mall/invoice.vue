<template>
<div>
  <!-- 头部按钮 -->
  <div class="headerBtn" style="display:flex;flex-direction: row;justify-content: flex-start;">
    <el-form label-width="50px" class="updateCardForm">
      <el-form-item label="状态">
          <el-select @change="billstatusChange" v-model="billstatusValue" placeholder="请选择">
              <el-option
              v-for="item in billstatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div class="headerBtnRight">
      <el-input v-model="keyword" placeholder="请输入关键字搜索"></el-input>
      <el-button @click="getWebsiteTable" type="success" class="selectBtn" ><i class="el-icon-search"></i><span>查询</span></el-button>
      <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="primary">导出(全部)</el-button>
      <el-button @click="invoiceAdd" style="margin-top: 2px;" size="medium" type="primary">添加</el-button>
    </div>

  </div>
  <!-- 表格 -->
  <el-table
    :data="websiteTableData"
    id="rebateSetTable"
    border
    stripe
    v-loading="websiteTableDataloading"
    height="640"
    class="websiteTable">
    <el-table-column
      prop="userordernum"
      label="用户订单号"
      align="center"
      width="130">
    </el-table-column>
    <el-table-column
      prop="id"
      align="center"
      fixed="left"
      label="编号"
      width="50"
      >
    </el-table-column>
    <el-table-column
      prop="managename"
      align="center"
      label="来源"
      width="100"
      >
    </el-table-column>
    <el-table-column
      prop="userinvoicename"
      label="用户发票抬头"
      align="center"
      width="160"
      >
    </el-table-column>

    <el-table-column
      prop="userinvoicenum"
      align="center"
      label="用户税号"
      width="160">
    </el-table-column>
    <el-table-column
      prop="managemoney"
      label="金额"
      align="center"
      width="60">
    </el-table-column>
    <el-table-column
      prop="userbillingtype"
      label="开票类型"
      align="center"
      >
    </el-table-column>
     <el-table-column
      prop="usermail"
      label="邮箱"
      width="160"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      align="center"
      width="70">
    </el-table-column>

    <el-table-column
      prop="managepaymentmethod"
      label="支付方式"
      align="center"
      width="120">
    </el-table-column>

    <el-table-column
      prop="managestate"
      label="审核状态"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="financename"
      label="财务角色"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      align="center"
      width="120">
    </el-table-column>

    <el-table-column
      prop="managename"
      label="审核姓名"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="manageprojectname"
      label="审核项目名称"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="createtime"
      align="center"
      label="创建时间"
      width="160"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click.prevent="edit(scope.row.id)" type="text" size="small">{{scope.row.financestate==0?'未开票':'未开票'}}</el-button>
        <el-button @click.prevent="deleteWebsiteTableData(scope.row.id,websiteTableData)" type="text" size="small" style="color:#f56c6c">删除</el-button>
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
import {getInvoiceDel} from '@/api/api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
        ExhibitionPageSize:"",//xlsx导出条数
        billstatus:[{
          value: '未开票',
          label: '未开票'
        }, {
          value: '已开票',
          label: '已开票'
        }],
        billstatusValue:'未开票',
      }
    },
    methods:{
      //切换状态
      billstatusChange(data1){
        this.pageNum=1
        this.getWebsiteTable()
      },
      //获取表格数据
      getWebsiteTable(){
        var that=this
        that.websiteTableDataloading=true
        let url=this.baseUrl + "/Invoice/InvoiceList.do"
        let addNews=new URLSearchParams();
        addNews.append('SearchKey',that.keyword);
        addNews.append('manageState','确认通过');
        addNews.append('financeState',that.billstatusValue);
        addNews.append('pageNum',that.pageNum);
        addNews.append('pageSize',that.pageSize);
        this.$axios.post(url,addNews).then(function(response){
          console.log(response)
          that.pageTotalnum=response.data.data.total
          that.websiteTableData=response.data.data.list
          that.ExhibitionPageSize = that.websiteTableData.length;
          console.log(that.websiteTableData)

          for (var i = 0; i < that.websiteTableData.length; i++) {
              that.websiteTableData[i].createtime=that.changetime(that.websiteTableData[i].createtime)
              that.websiteTableData[i].updatetime=that.changetime(that.websiteTableData[i].updatetime)
          };
          let websiteTableDataLength=that.websiteTableData.length
          let flagNum=0
          that.websiteTableDataloading=false
        }).catch(function (response){
          console.log(response)
          that.websiteTableDataloading=false
          that.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
      },
      changetime(createtime){
        function add0(data){
            return data>9?data:'0'+data
          }
           var time = new Date(createtime);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            //var riqi=y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
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
      //跳转添加发票页面
      invoiceAdd(){
        this.$router.push({path:"/mall/invoiceAdd"})
        console.log("11111")
      },
      //编辑资讯
      edit(newsId){
        var that=this
        that.$confirm('确定已开票?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {

          let url=that.baseUrl + "/Invoice/PassShopInvoice.do"
          var formData =new URLSearchParams();
          formData.append('Id', newsId)

          that.$axios.post(url,formData).then(function(response){
            console.log(response)
            that.$message({
              message: response.data.msg,
              type: 'sucess'
            });
            that.getWebsiteTable()
          }).catch(function (response){
            that.$message({
              message: '数据请求失败',
              type: 'error'
            });
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
        // this.$store.state.websiteNewsId=newsId
        // this.$router.push({path:'/website/createnews'});
      },
      //删除资讯
      deleteWebsiteTableData(articleId){
        var that=this
        that.$confirm('此操作将删除该条信息,且无法恢复, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          getInvoiceDel({
            id:articleId
          }).then(res => {
            if(res.code == 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              that.$message({
                message: '数据删除失败',
                type: 'error'
              });
            }
            this.getWebsiteTable()
            console.log(res)
          }).catch(error =>{
            that.$message({
              message: '数据请求失败',
              type: 'error'
            });
          })
          // let url=that.baseUrl + "/manager/article/delete.do"+"?articleId="+articleId
          // that.$axios.get(url).then(function(response){
          //   that.$message({
          //     message: response.data.msg,
          //     type: 'sucess'
          //   });
          //   that.getWebsiteTable()
          // }).catch(function (response){
          //   that.$message({
          //     message: '数据请求失败',
          //     type: 'error'
          //   });
          // });
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
      //创建新资讯
      createNews(){

      },
      //导出excel
      exportExcel () {
        var _this = this;
        this.pageSize = this.ExhibitionPageSize;
        this.getWebsiteTable();
        setTimeout(function(){
          console.log("14121212")
          _this.exportExcelTwo()
          _this.pageSize = 20;
          _this.getWebsiteTable();
        },1000)
      },
      exportExcelTwo(){
        var fix = document.querySelector('.el-table__fixed');
        console.log(fix)
        var wb;
        var xlsxParam = { raw: true }  //转换成excel时，使用原始的格式
        if (fix) {
          wb = XLSX.utils.table_to_book(document.getElementById('rebateSetTable').removeChild(fix),xlsxParam);
          document.getElementById('rebateSetTable').appendChild(fix);
        } else {
            wb = XLSX.utils.table_to_book(document.getElementById('rebateSetTable'),xlsxParam);
        }
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        });
        try {

          //xlsx加时间
          var timestamp = Date.parse(new Date());
          var d=new Date(timestamp);
          function formExcl(now) {
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          }
          let formExclTime = formExcl(d);

          FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
          '审核列表'+formExclTime+'.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout;
      }
    },
    created(){
      //初始化表格数据
      this.getWebsiteTable()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.distributionTable, .websiteTable, .headerBtn {
    width: 100%;
    max-height: 550px!important;
}
</style>
