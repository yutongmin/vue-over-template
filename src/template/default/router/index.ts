import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/template/default/views/Login.vue';
import Home from '@/template/default/views/Home.vue';
import Index from '@/template/default/views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/default', component: Login },
  { path: '/default/login', component: Login },
  { path: '/default/home', component: Home },
  { path: '/default/index', component: Index },
  // 更多模板 A 的路由...
];
export default routes
// export default createRouter({
//   history: createWebHistory('/templateA'),
//   routes,
// });