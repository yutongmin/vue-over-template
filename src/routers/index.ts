import { createRouter, createWebHashHistory } from 'vue-router';
import templateARouter from '@/template/templateA/router';
import templateBRouter from '@/template/templateB/router';
const routes = [
  ...templateARouter,
  ...templateBRouter,
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});