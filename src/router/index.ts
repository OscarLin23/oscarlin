import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/TheWelcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/selectALL',
      name:'login',
      component: Login
    }
  ]
})


// 添加路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const publicPages = ['/login', '/register']; // 公开页面
    const authRequired = !publicPages.includes(to.path); // 需要授权的页面

    if (authRequired && !token) {
        next({ name: 'Login' }); // 如果未登录，重定向到登录页面
    } else {
        next(); // 放行
    }
});

export default router
