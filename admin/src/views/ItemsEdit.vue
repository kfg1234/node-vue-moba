<template>
    <div>
        <h1>{{ id ? "编辑" : "创建" }}物品</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-input v-model="model.icon"></el-input>
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
        };
    },
    methods: {
        // 新建分类并保存
        async save() {
            let res;
            // 如果存在id，执行编辑分类接口
            if (this.id) {
                res = await this.$http.put(`rest/items/${this.id}`, this.model);
            } else {
                res = await this.$http.post("rest/items", this.model);
            }
            this.$router.replace("/items/list");
            this.$message({
                showClose: true,
                message: res.data,
                type: "success",
                duration: 2000,
            });
        },
        // 编辑时获取分类名字
        async fetch() {
            let result = await this.$http.get(`rest/items/${this.id}`);
            this.model = result.data;
        },
    },
    created() {
        this.id && this.fetch();
    },
};
</script>
