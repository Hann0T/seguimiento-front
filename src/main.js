import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router';

import './assets/main.css';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'
import HomeVue from './views/Home.vue';
import LoginVue from './views/Login.vue';
import ProveedoresVue from './views/Proveedores.vue';
import SuscripcionesVue from './views/Suscripciones.vue';
import UsuariosVue from './views/Usuarios.vue';
import NotFoundVue from './views/NotFound.vue';

const routes = [
  { path: '/', component: HomeVue, name: 'Home' },
  { path: '/login', component: LoginVue, name: 'Login' },
  { path: '/proveedores', component: ProveedoresVue, name: 'Proveedores' },
  { path: '/suscripciones', component: SuscripcionesVue, name: 'Suscripciones' },
  { path: '/usuarios', component: UsuariosVue, name: 'Usuarios' },
  { path: '/:pathMatch(.*)*', component: NotFoundVue }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
