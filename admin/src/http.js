import axios from "axios";
import Vue from "vue";
import router from "./router";
// 创建一个axios实例
const http = axios.create({
    baseURL: "http://localhost:3000/admin/api", //设置baseURL
});

//请求拦截器
http.interceptors.request.use(
    function(config) {
        //在发送请求之前做一些事情return config;
        if (localStorage.token) {
            config.headers.Authorization = "Bearer " + localStorage.token; //添加的Bearer是规范
        }
        return config;
    },
    function(error) {
        //做一些有请求错误的事情
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    function(response) {
        console.log(response);
        return response; // 返回处理后的数据
    },
    function(error) {
        // 对响应错误做点什么
        console.log(error.response);
        if (error.response.data.message) {
            Vue.prototype.$message({
                type: "error",
                message: error.response.data.message,
            });
        }

        if (error.response.status === 401) {
            router.push("/login");
        }

        return Promise.reject(error);
    }
);

export default http;
