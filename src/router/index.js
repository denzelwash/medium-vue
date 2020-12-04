import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from '../views/Login'
import GlobalFeed from '../views/GlobalFeed'
// import UserProfile from '../views/UserProfile'
// import Article from '../views/Article'
// import YourFeed from '../views/YourFeed'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    name: 'GlobalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'YourFeed',
    component: GlobalFeed
  },
  {
    path: '/tags/:slug',
    name: 'Tag',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'CreateArticle',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'Article',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug/edit',
    name: 'EditArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'Settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'UserProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'Favorites',
    component: GlobalFeed
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
