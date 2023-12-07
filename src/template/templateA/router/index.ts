import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/template/templateA/views/Login.vue';
import Home from '@/template/templateA/views/Home.vue';
import Index from '@/template/templateA/views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Login },
  { path: '/templateA/login', component: Login },
  { path: '/templateA/home', component: Home },
  { path: '/templateA/index', component: Index },
  // 更多模板 A 的路由...
];
export default routes
// export default createRouter({
//   history: createWebHistory('/templateA'),
//   routes,
// });