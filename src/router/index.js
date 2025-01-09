import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;