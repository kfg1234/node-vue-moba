<template>
    <div>
        <h1>{{ id ? "编辑" : "创建" }}文章</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" placeholder="请选择" :multiple="true">
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
        },
    },
    data() {
        return {
            model: {},
            categories: [],
        };
    },
    methods: {
        // 新建分类并保存
        async save() {
            let res;
            // 如果存在id，执行编辑分类接口
            if (this.id) {
                res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
            } else {
                res = await this.$http.post("/rest/articles", this.model);
            }
            this.$router.replace("/articles/list");
            this.$message({
                showClose: true,
                message: res.data,
                type: "success",
                duration: 2000,
            });
        },
        // 编辑时获取
        async fetch() {
            let result = await this.$http.get(`/rest/articles/${this.id}`);
            this.model = result.data;
        },
        // 获取下拉框的分类数据
        async fetchCategories() {
            let res = await this.$http.get("/rest/categories");
            this.categories = res.data;
        },
    },
    created() {
        this.fetchCategories();
        // 如果是从分类列表跳转过来，id就存在，执行后面的fetch
        this.id && this.fetch();
    },
};
</script>
