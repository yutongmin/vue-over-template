import { createRouter, createWebHashHistory } from 'vue-router';
import defaultRouter from '@/template/default/router';
import templateARouter from '@/template/templateA/router';
import templateBRouter from '@/template/templateB/router';
const routes = [
  ...defaultRouter,
  ...templateARouter,
  ...templateBRouter,
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});