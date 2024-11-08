import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView/HomeView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            children:[
                {
                    path:'/article/userList',
                    name:'userBlog',
                    component: () => import("../views/HomeView/subView/UserBlogView.vue")

                },
                {

                    path:'/article/post',
                    name:'post',
                    component: () => import("../views/HomeView/subView/PostView.vue")

                },
                {

                    path:'/article/:articleId',
                    name:'article',
                    component: () => import("../views/HomeView/subView/ArticleDetailView.vue")

                },
                {
                    path: '/user/info',
                    name: 'userInfo',
                    component: () => import("../views/HomeView/subView/UserInfoView.vue")
                },
                {
                    path: '/user/collection',
                    name: 'userCollection',
                    component: () => import("../views/HomeView/subView/UserCollectionView.vue"),
                    children:[
                        {
                            path: '/user/collection/:collectionId',
                            name: 'CollectionArticles',
                            component: () => import("../views/HomeView/subView/CollectionBlogView.vue")
                        },
                    ]
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: () => import("../views/HomeView/subView/TagView.vue")
                },

            ]
        },
        {
            path: '/user/login',
            name: 'login',
            component: () => import("../views/LoginView.vue")
        },
        {
            path: '/user/register',
            name: 'register',
            component: () => import("../views/RegisterView.vue")
        },
        {
            path: '/error',
            name: 'error',
            component: () => import("../views/ErrorPageView.vue")
        },
    ]
})

export default router



