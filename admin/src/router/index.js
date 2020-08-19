import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemsEdit from "../views/ItemsEdit.vue";
import ItemsList from "../views/ItemsList.vue";
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
                component: ItemsEdit,
            },
            {
                path: "/items/list",
                component: ItemsList,
            },
            {
                path: "/items/edit/:id",
                component: ItemsEdit,
                props: true,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
