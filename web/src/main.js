import Vue from "vue";
import App from "./App.vue";

import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";
import router from "./router";
Vue.config.productionTip = false;

import Card from "./components/Card.vue";
Vue.component("m-card", Card);
import ListCard from "./components/ListCard.vue";
Vue.component("m-list-card", ListCard);

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
