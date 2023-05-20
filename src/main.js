import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Chat from './components/Chat.vue';
import './style.css';
import { auth } from './firebase';
import store from './store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
