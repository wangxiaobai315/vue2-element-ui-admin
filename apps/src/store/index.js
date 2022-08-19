import Vue from "vue";
import Vuex from "vuex";
import request from "../api/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flag:false,
    
  },
  getters: {
    
  },
  mutations: {
    toggle(state){
      state.flag = !state.flag
    },
    
  },
  actions: {
    
  },
  modules: {},
});
