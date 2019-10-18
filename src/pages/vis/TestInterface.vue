<template>
  <div class="schoolAdd">
    <button @click="changeBtn" class=cc>202</button>
  </div>
</template>

<script>
// import qs from 'qs';
import {TeacherApi,getDetails} from '@/api/api';
import axios from "axios";
export default {
  data() {
    return{
      form:{
        schoolId : "e100053",
        name:"lgl",
        age:"18",
        phone:"18353077779"
      }
    }

  },
  methods:{

    changeBtn(){
      this.getData();
    },
    //获取数据
    getData(){
        getDetails({
          whereFrom:"ES121515155"
        }).then(res=>{
          console.log(res)
        }).catch(error=>{

        })

    },

  },

  created() {



  }
}

</script>

<style lang="scss" scoped>

</style>
