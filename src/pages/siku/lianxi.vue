<template>
  <div>
    <select @change="cityChan">
      <option v-for="(v,i) in provice" :key="i">{{v.name}}{{i}}</option>
    </select>
    <select @change="">
      <option v-for="(v,i) in provice[curshe].city" :key="i">{{v.name}}</option>
    </select>
    <!-- <el-select v-model="value" placeholder="请选择" @change="cityChan">
      <el-option
          v-for="(v,i) in provice"
          :key="i"
          :label="v.name"
          :value="v.name">
        </el-option>
    </el-select>
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="(v,i) in provice[curshe].city"
          :key="i"
          :label="v.name"
          :value="v.name">
        </el-option>
    </el-select> -->
    <!-- <div @click="aaa">4142</div> -->
  </div>
</template>

<script>
import {provice} from '../../api/city.js'
export default {
  data() {
    return {
      provice:provice,
      curshe:0,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }

  },
  methods: {
    cityChan:function(evt){
      this.curshe=evt.target.selectedIndex;
      console.log(evt)
      console.log(evt.target.selectedIndex)
    },
    // :function(evt){

    // }
    // aaa:function(){

    //   console.log(provice)
    // }
  },
  mounted(){
  },
}
</script>

<style scoped>
  select{
    width: 400px;
    height: 40px;
    padding-left: 10px;
  }
</style>
