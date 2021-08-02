import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import 'assets/css/base.css';
import storage from './utils/storage'
import api from './api/api'



const app = createApp(App)
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage;
app.use(store).use(router).use(ElementPlus).mount('#app')
