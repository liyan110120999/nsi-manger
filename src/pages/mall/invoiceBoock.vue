<template>
<div>
  <!-- 头部按钮 -->
  <div class="headerBtn">
    <div style="display:flex;flex-direction: row;">
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
          <el-input v-model="input" placeholder="可搜索订单号,姓名,手机号"></el-input>
          <el-button type="success" icon="el-icon-search" @click="mallBillSearch">搜索</el-button>
      </div>
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
      align="center"
      label="类型"
      width="100"
      >
      <template slot-scope="scope">
          <p :class="{ 'shopColor': scope.row.productType == '购物车','BoockColor': scope.row.productType == '书店' }" @click="getorderNoData(scope.row.productType,scope.row.goodsId)">{{scope.row.productType}}</p>
          <!-- <el-button @click="centerDialogVisibl(scope.row)" type="text" size="small" style="color:#67C23A">展示门票</el-button> -->
      </template>
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
  <el-dialog
    :title="dialogTitle"
    :modal-append-to-body="false"
    :visible.sync="buyCar"
    width="50%"
    height="200px">
      <el-table
        :data="buycarData"
        border
        stripe
        v-loading="websiteTableDataloading"
        v-if="dialogShow == true"
        :max-height="windowHeight"
        class="websiteTable">
        <el-table-column
          prop="goodsName"
          align="center"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="goodsNum"
          label="商品数量"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="价格"
          align="center"
          width="120">
        </el-table-column>
      </el-table>
      <el-table
        :data="buycarData"
        border
        stripe
        v-loading="websiteTableDataloading"
        v-if="dialogShow == false"
        :max-height="windowHeight"
        class="websiteTable">
        <el-table-column
          prop="goodsName"
          align="center"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="goodsStock"
          label="数量"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="价格"
          align="center"
          width="120">
        </el-table-column>
      </el-table>

    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="buyCar=false">确认</el-button>
    </div>
  </el-dialog>
</div>

</template>

<script>
  import {postInvoiceOrderList,postShopCartcartDetail,postGoodsDetail} from "@/api/api";
  export default {
    data() {
      return {
        input:"",
        websiteTableData: [],//表格数据
        buycarData:[],
        pageTotalnum:0,//数据总数
        pageNum:1,//页码
        pageSize:10,//默认每页数据量
        typeIndex:1,//序号开始
        keyword:'',//搜索
        websiteTableDataloading:false,//表格数据展示
        dialogShow:"true", //切换弹框详情数据
        dialogTitle:"",//弹框标题
        warnClass:'warnClass',
        commonCalss:'',
        puchaDrag:false,
        billstatus:[{
          value: '未开票',
          label: '未开票'
        }, {
          value: '已开票',
          label: '已开票'
        }],
        billstatusValue:"未开票",
        billstatusValue2:false,
        updatebillstatusValue:'',
        buy_message:'',
        product_type:'',
        shipping_code:'',
        productTypeValue:'',
        fahuoOrbianji:true,
        billId:'',
        wuliuypuchaDrag:false,
        buyCar:false,
        buzhouData:'',
        buzhouDataLength:9,
        shipping_codeName:'ZTO_',
      }
    },
    methods:{
        billstatusChange(data1){
          this.pageNum=1
          if(data1==4||data1==5){
            this.billstatusValue2=true
          }else{
            this.billstatusValue2=false
          }
            this.getWebsiteTable()
        },
        tableRowClassName({row, rowIndex}) {
          if (row.statusDesc==='已付款') {
            return 'firstrow';
          } else if (row.statusDesc==='已发货') {
            return 'secondrow';
          }
          return '';
        },
        wuliuDan(rowData){
            let that=this
            if(rowData.shippingCode){
              let url=that.baseUrl + "/order/find_logistics_info.do"+"?orderNo="+rowData.orderNo+'&logisticCode='+rowData.shippingCode
              that.$axios.get(url).then(function(response){
               that.buzhouData=response.data.traces
               console.log(that.buzhouData)
               that.wuliuypuchaDrag=true
              }).catch(function (response){
                that.$message({
                  message: '数据请求失败，请检查物流单号',
                  type: 'error'
                });
              });
            }else{
              that.$message({
                  message: '无物流，请重新添加物流信息',
                  type: 'error'
                });
            }
            console.log(rowData)
        },
      //获取表格数据
      getWebsiteTable(){
        let that = this;
        postInvoiceOrderList({
          financeState:this.billstatusValue,
          manageState:"确认通过",
          productType:this.productTypeValue,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          searchKey:this.input
        }).then(res => {
          console.log(res)
          // that.pageTotalnum=res.data.total;
          that.websiteTableData=res.data.list;
        })
        // let that=this
        // that.websiteTableDataloading=true
        // let url=that.baseUrl + "/manager/order/get_order_list.do"+"?status="+this.billstatusValue+"&productType="+this.productTypeValue+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize + "&searchKey=" + this.input
        // this.$axios.get(url).then(function(response){
        //     console.log(response)
        //     that.pageTotalnum=response.data.data.total
        //     that.websiteTableData=response.data.data.list
        //     for (let index = 0; index <  that.websiteTableData.length; index++) {
        //       if(that.websiteTableData[index].shopVo){
        //         that.websiteTableData[index].receivearea=that.websiteTableData[index].shopVo.receivearea01+that.websiteTableData[index].shopVo.receivearea02+that.websiteTableData[index].shopVo.receivearea03
        //       }else{
        //          that.websiteTableData[index].receivearea=''
        //       }
        //       that.websiteTableData[index].createTime=that.changeDate(that.websiteTableData[index].createTime)
        //       console.log(that.websiteTableData[index].shippingCode)
        //       if(!that.websiteTableData[index].shippingCode){
        //         that.websiteTableData[index].shippingCode=''
        //       }
        //     }

        //     console.log(that.websiteTableData)
        //     let websiteTableDataLength=that.websiteTableData.length
        //     that.websiteTableDataloading=false
        // }).catch(function (response){
        //   console.log(response)
        //   that.websiteTableDataloading=false
        //   that.$message({
        //     message: '数据请求失败1',
        //     type: 'error'
        //   });
        // });
      },
      changeDate(index02){
          var date = new Date(index02);
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let s = date.getSeconds();
          return Y+M+D+h+m+s
      },
      //搜索
      mallBillSearch(){
        this.getWebsiteTable();
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
      //获取购物车订单信息
      getorderNoData(orderNo,shopId){
        let that=this;
        that.buyCar=true;
        console.log(orderNo == "购物车")
        if(orderNo == "购物车"){
          this.dialogShow = true;
          that.dialogTitle = "购物车信息"
          postShopCartcartDetail({
            cartId:shopId
          }).then(res => {
            that.buycarData=res.data
            console.log(that.buycarData)
          })
        }else{
          this.dialogShow = false;
          postGoodsDetail({
            Id:shopId
          }).then(res => {
            that.dialogTitle = "书店信息"
            console.log(that.buycarData)
            that.buycarData.length = 0;
            that.buycarData.push(res.data)
            console.log(that.buycarData)
          })
        }
        // let url=this.baseUrl + "/ShopCart/cartDetail.do"
        // let addNews=new URLSearchParams();
        // addNews.append('cartId',orderNo);
        // that.$axios.post(url,addNews).then(function(response){
        //   that.buycarData=response.data.data
        //   that.buyCar=true
        // }).catch(function (response){
        //   that.$message({
        //     message: '数据请求失败',
        //     type: 'error'
        //   });
        // });
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
    

    },
    created(){
      //初始化表格数据
      this.getWebsiteTable()
      this.windowHeight=window.innerHeight-220
      console.log(this.windowHeight)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .warnClass{
    color:#F00;
  }
  .el-select-dropdown{
      z-index: 99999999 !important;
      margin-left: 0;
  }
  .el-table .firstrow {
    background: #CCFF99;
  }

  .el-table .secondrow {
    background: #99CCCC;
  }
  .shopColor{
    color: red;
  }
  .BoockColor{
    color: blue;
  }
</style>
