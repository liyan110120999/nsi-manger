<template>
  <div>
    联系 联系 <p @click="lianxi">练习</p>
  </div>
</template>

<script>
import store from '../../vuex/store.js'
export default {
  data() {
    return {
    }

  },
  methods: {
    lianxi:function(){
      console.log(store.state.isEd)
      store.commit("changeis",1)

    }
  },
  mounted(){

  },
}
</script>

<style scoped>

</style>
