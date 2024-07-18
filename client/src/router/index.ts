import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegistrationPage from "@/views/RegistrationPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/registration',
    component: RegistrationPage
  },
  {
    path: '/login',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
