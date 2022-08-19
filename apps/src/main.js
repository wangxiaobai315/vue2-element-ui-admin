import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./css/reset.css";
import "@/mock/index.js";
import myplugin from "./fdou/index.js";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(myplugin)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
