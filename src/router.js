import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Chat from './components/Chat.vue';
import { auth } from './firebase'; // Убедитесь, что путь и имя файла firebase.js правильные

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

export default router;
