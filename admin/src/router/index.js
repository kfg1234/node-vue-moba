import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";

import AdEdit from "../views/AdEdit.vue";
import AdList from "../views/AdList.vue";

import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";

import Login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        component: Login,
        meta: {
            isPublic: true,
        },
    },
    {
        path: "/",
        name: "Main",
        component: Main,
        children: [
            {
                path: "/categories/create",
                component: CategoryEdit,
            },
            {
                path: "/categories/list",
                component: CategoryList,
            },
            {
                path: "/categories/edit/:id",
                component: CategoryEdit,
                props: true, //将传过来的id注入到CategoryEdit组件的props属性中,解耦
            },
            {
                path: "/items/create",
                component: ItemEdit,
            },
            {
                path: "/items/list",
                component: ItemList,
            },
            {
                path: "/items/edit/:id",
                component: ItemEdit,
                props: true,
            },
            {
                path: "/heros/create",
                component: HeroEdit,
            },
            {
                path: "/heros/list",
                component: HeroList,
            },
            {
                path: "/heros/edit/:id",
                component: HeroEdit,
                props: true,
            },
            {
                path: "/articles/create",
                component: ArticleEdit,
            },
            {
                path: "/articles/list",
                component: ArticleList,
            },
            {
                path: "/articles/edit/:id",
                component: ArticleEdit,
                props: true,
            },
            {
                path: "/ads/create",
                component: AdEdit,
            },
            {
                path: "/ads/list",
                component: AdList,
            },
            {
                path: "/ads/edit/:id",
                component: AdEdit,
                props: true,
            },
            {
                path: "/admin_users/create",
                component: AdminUserEdit,
            },
            {
                path: "/admin_users/list",
                component: AdminUserList,
            },
            {
                path: "/admin_users/edit/:id",
                component: AdminUserEdit,
                props: true,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to);
    if (!to.meta.isPublic && !localStorage.token) {
        return next("/login");
    }
    next();
});

export default router;
