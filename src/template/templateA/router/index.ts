import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/template/templateA/views/Login.vue';
import Home from '@/template/templateA/views/Home.vue';
import Index from '@/template/templateA/views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/loginA', component: Login },
  { path: '/homeA', component: Home },
  { path: '/indexA', component: Index },
  // 更多模板 A 的路由...
];
export default routes
// export default createRouter({
//   history: createWebHistory('/templateA'),
//   routes,
// });