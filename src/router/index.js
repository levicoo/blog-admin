import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: "Home",
    component: () => import('views/Home'),
    redirect: { name: "Welcome" },
    children: [
      {
        path: '/',
        name: "Welcome",
        component: () => import('views/Home/Main'),
      },
      {
        path: '/frontpage/header',
        name: "HeaderNav",
        component: () => import('views/Home/Main/Frontpage/HeaderNav'),
      },
      {
        path: '/frontpage/banner',
        name: "Banner",
        component: () => import('views/Home/Main/Frontpage/Banner'),
      },
      {
        path: '/frontpage/nav',
        name: "Nav",
        component: () => import('views/Home/Main/Frontpage/Nav'),
      },
      {
        path: '/frontpage/card',
        name: "Card",
        component: () => import('views/Home/Main/Frontpage/Card'),
      },
      {
        path: '/frontpage/footer',
        name: "Footer",
        component: () => import('views/Home/Main/Frontpage/Footer'),
      },
      {
        path: '/frontpage/logo',
        name: "Logo",
        component: () => import('views/Home/Main/Frontpage/Logo'),
      },
      {
        path: '/blog/articles',
        name: "BlogArticles",
        component: () => import('views/Home/Main/Blog/Articles.vue'),
      },
      {
        path: '/philosophy/articles',
        name: "PhilosophyArticles",
        component: () => import('views/Home/Main/Philosophy/Articles.vue'),
      },
      {
        path: '/sentiment/articles',
        name: "SentimentArticles",
        component: () => import('views/Home/Main/Sentiment/Articles.vue'),
      },
      {
        path: '/recordlife/articles',
        name: "RecordlifeArticles",
        component: () => import('views/Home/Main/Recordlife/Articles.vue'),
      },
      {
        path: '/about/articles',
        name: "AboutArticles",
        component: () => import('views/Home/Main/About/Articles.vue'),
      },

    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/Login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
