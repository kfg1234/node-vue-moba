<template>
    <div>
        <h1>创建分类</h1>
        <el-form label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {},
        };
    },
};
</script>
