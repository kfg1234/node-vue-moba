<template>
    <div>
        <el-table border :data="items">
            <el-table-column prop="_id" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="英雄名称" align="center"></el-table-column>
            <el-table-column prop="title" label="称号" align="center"></el-table-column>
            <el-table-column prop="avatar" label="头像" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="" style="height:3rem" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/heros/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [],
        };
    },
    methods: {
        // 获取分类列表数据
        async fetch() {
            let result = await this.$http.get("/rest/heros");
            this.items = result.data;
        },
        remove(row) {
            this.$confirm(`是否确定删除分类"${row.name}"?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    let res = await this.$http.delete(`/rest/heros/${row._id}`);
                    this.$message({
                        type: "success",
                        message: res.data,
                    });
                    this.fetch();
                })
                .catch(() => {});
        },
    },
    created() {
        this.fetch();
    },
};
</script>
