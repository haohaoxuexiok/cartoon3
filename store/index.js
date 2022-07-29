import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	 
  },
  mutations:{},
  getters:{},
  actions:{
	  change_loginState({commit,state}){
		  const token = uni.getStorageSync('token')
		  if(token){
			  state.login_state = true
			  uni.setStorage({
			  	key: 'login_state',
			  	data:state.login_state ,
			  });
		  }
	  }
  },
}) 

export default store