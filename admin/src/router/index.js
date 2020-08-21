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

Vue.use(VueRouter);

const routes = [
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
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
