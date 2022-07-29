import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'

import uView from "uview-ui";
Vue.use(uView);
/*import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)*/
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif