import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/core/HomeView.vue"
// import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiredAuth:true
    },
    redirect:{ name: "AllContact" },
    children:[
      {
        path:"/all-contact",
        name:"AllContact",
        component: () => import("../views/core/AllContact.vue")
      },
      {
        path:"/add-contact",
        name:"AddContact",
        component: () => import("../views/core/AddContact.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to,from, next) => {
const isAuthenticated = await !!localStorage.getItem("user")
  if (to.meta.requiredAuth && !isAuthenticated){
    next({ name: 'Register' });
  }
  else next()
})

export default router
