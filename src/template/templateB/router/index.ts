import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/template/templateB/views/Login.vue';
import Home from '@/template/templateB/views/Home.vue';
import Index from '@/template/templateB/views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/templateB/login', component: Login },
  { path: '/templateB/home', component: Home },
  { path: '/templateB/index', component: Index },
  // 更多模板 A 的路由...
];
export default routes
// export default createRouter({
//   history: createWebHistory('/templateA'),
//   routes,
// });