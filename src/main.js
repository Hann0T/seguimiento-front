import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router';

import './assets/main.css';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.vue'
import HomeVue from './views/Home.vue';
import LoginVue from './views/Login.vue';
import ProveedoresVue from './views/Proveedores/Proveedores.vue';
import SuscripcionesVue from './views/Suscripciones/Suscripciones.vue';
import finanzasVue from './views/Finanzas.vue';
import NotFoundVue from './views/NotFound.vue';
import UserInfoVue from './views/UserInfo.vue';
import UsersVue from './views/Users.vue';
import RegisterVue from './views/Register.vue';

const routes = [
  { path: '/', component: HomeVue, name: 'Home' },
  { path: '/login', component: LoginVue, name: 'Login' },
  { path: '/registro', component: RegisterVue, name: 'Register' },
  { path: '/proveedores', component: ProveedoresVue, name: 'Proveedores' },
  { path: '/suscripciones', component: SuscripcionesVue, name: 'Suscripciones' },
  { path: '/finanzas', component: finanzasVue, name: 'Finanzas' },
  { path: '/user-info', component: UserInfoVue, name: 'UserInfo' },
  { path: '/usuarios', component: UsersVue, name: 'Usuarios' },
  { path: '/:pathMatch(.*)*', component: NotFoundVue }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
