import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Components */
import Index from '@/components/Index'
import Register from '@/components/Customer/Register'
import Login from '@/components/Customer/Login'
import Home from '@/components/Customer/Home'
import Yokla from '@/components/Customer/Yokla'
import CreateClass from '@/components/Customer/CreateClass'
import ClassUserList from '@/components/Customer/ClassUserList'
import ViewYoklamaHistory from '@/components/Customer/ViewYoklamaHistory'
import YoklamaDetail from '@/components/Customer/YoklamaDetail'
import ClassManagement from '@/components/Customer/ClassManagement'

import AuthMiddleware from './auth-middleware'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthMiddleware
    },
    {
      path: '/yokla/:classid',
      name: 'Yokla',
      props: true, // bu sayede $route, parametreleri props olarak componente geçirecek
      component: Yokla
    },
    {
      path: '/create-class',
      name: 'CreateClass',
      component: CreateClass
    },
    {
      path: '/class-user-list/:classid',
      name: 'ClassUserList',
      component: ClassUserList
    },
    {
      path: '/view-yoklama-history/:classid',
      name: 'ViewYoklamaHistory',
      component: ViewYoklamaHistory
    },
    {
      path: '/yoklama-detail/:classid/:time',
      name: 'YoklamaDetail',
      component: YoklamaDetail
    },
    {
      path: '/class-management',
      name: 'ClassManagement',
      component: ClassManagement
    }
  ],
  mode: 'history'
})

/*
 çıkış işlemi yapılacak
 login-register feedback lari yapılacak
 sayfalara auth middleware yapılacak
 createClass---
  */
