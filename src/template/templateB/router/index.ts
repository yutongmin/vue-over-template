import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Login from '@/template/templateB/views/Login.vue';
import Home from '@/template/templateB/views/Home.vue';
import Index from '@/template/templateB/views/Index.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/loginB', component: Login },
  { path: '/homeB', component: Home },
  { path: '/indexB', component: Index },
  // 更多模板 A 的路由...
];
export default routes
// export default createRouter({
//   history: createWebHistory('/templateA'),
//   routes,
// });