/*
* @Author: 123456
* @Date:   2018-07-11 15:10:08
* @Last Modified by:   123456
* @Last Modified time: 2018-07-11 15:19:26
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    websiteNewsId:'',
    isEd:0,
  },
  mutations:{
    changeWebsiteNewsId( state, msg ){
      state.websiteNewsId = msg;
    },
    changeis(state,n){
      state.isEd=n
      // console.log(state.isEd++)
    }
  }
})

export default store
