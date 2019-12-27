<template>
    <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      orgOptions:{}
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        var echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('myChart'));
        myChart.setOption({
           title: {
                text: '社区折线图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['最近评论','最近提交'],
                selectedMode:"multiple",
                 selected: {
                        // 选中'系列1'
                        '最近评论': true,
                        // 不选中'系列2'
                        '最近提交': false
                    }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日','周五','周六','周日'],
                axisLine:{
                    lineStyle:{
                        color:'#36a3f7',
                        width:3,//这里是为了突出显示加上的
                    },
                }

            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#40c9c6',
                        width:3,//这里是为了突出显示加上的
                    }
                }
            },
            series: [
                {
                    name:'最近评论',
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    data:[1200, 1320, 1010, 1340, 900, 2300, 100, 1010, 1340, 900]
                },
                {
                    name:'最近提交',
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    data:[220, 69, 191, 234, 290, 330, 310, 1010, 1340, 900]
                }
            ]
        })
    }
  }
}
</script>
<style scoped>
    #myChart{
        margin-top: 30px;
    }
</style>