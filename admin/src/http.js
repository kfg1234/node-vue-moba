import axios from "axios";

// 创建一个axios实例
const http = axios.create({
    baseURL: "http://localhost:3000/admin/api/", //设置baseURL
});

// 响应拦截器
http.interceptors.response.use(
    function(response) {
        console.log(response);
        return response; // 返回处理后的数据
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default http;
