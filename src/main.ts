import { createApp } from 'vue'
import './style.css'
import "@/styles/common.less";
import App from './App.vue'
import ElementPlus from "element-plus"; //国际化
import zhCn from "element-plus/es/locale/lang/zh-cn"; //国际化
import router from "./routers/index";
import store from './stores';

const app = createApp(App)

app.use(router).use(ElementPlus, { locale: zhCn }).use(store).mount("#app");
