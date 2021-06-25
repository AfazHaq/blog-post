import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVueIcons } from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(BootstrapVueIcons);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
