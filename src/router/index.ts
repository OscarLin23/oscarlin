import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/TheWelcome.vue'
import axios, { Axios, type AxiosResponse } from 'axios'

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
      path: '/error',
      name: 'error',
      component: () => import('../views/Error.vue'),
    },
    {
      path:'/selectALL',
      name:'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path.startsWith('/')) {
    window.localStorage.removeItem('token')
    next()
  }else{
    let admin=JSON.parse(window.localStorage.getItem('token') )
    if(!admin){
      next({path:'/'})
    }else{
      axios({
        url:'http://localhost:8080/checkToken',
        method:'get',
        headers: {
          token:admin.token
      }}).then((response:AxiosResponse) => {
        console.log(response.data)
        if(!response.data){
          console.log('校验失效')
          next({path:'/error'})
        } 
      })
      next();
    }
  }
})

export default router
