<template>
    <div>
        <h1>{{ id ? "编辑" : "创建" }}管理员</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
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
            parents: [],
        };
    },
    methods: {
        // 新建分类并保存
        async save() {
            let res;
            // 如果存在id，执行编辑分类接口
            if (this.id) {
                res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
            } else {
                res = await this.$http.post("/rest/admin_users", this.model);
            }
            this.$router.replace("/admin_users/list");
            this.$message({
                showClose: true,
                message: res.data,
                type: "success",
                duration: 2000,
            });
        },
        // 编辑时获取分类名字
        async fetch() {
            let result = await this.$http.get(`/rest/admin_users/${this.id}`);
            this.model = result.data;
        },
    },
    created() {
        // 如果是从分类列表跳转过来，id就存在，执行后面的fetch
        this.id && this.fetch();
    },
};
</script>
