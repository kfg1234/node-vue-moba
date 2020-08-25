<template>
    <div>
        <h1>{{ id ? "编辑" : "创建" }}广告位</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i> 添加广告</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col :md="12" v-for="(item, index) in model.items" :key="index" style="margin-top:1rem;">
                        <el-form-item label="跳转链接">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:0.5rem;">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="
                                    (res) => {
                                        $set(item, 'image', res.url);
                                    }
                                "
                            >
                                <img v-if="item.image" :src="item.image" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" @click="model.items.splice(index, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
            model: {
                items: [],
            },
            parents: [],
        };
    },
    methods: {
        // 新建分类并保存
        async save() {
            let res;
            // 如果存在id，执行编辑分类接口
            if (this.id) {
                res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
            } else {
                res = await this.$http.post("/rest/ads", this.model);
            }
            this.$router.replace("/ads/list");
            this.$message({
                showClose: true,
                message: res.data,
                type: "success",
                duration: 2000,
            });
        },
        // 编辑时获取分类名字
        async fetch() {
            let result = await this.$http.get(`/rest/ads/${this.id}`);
            this.model = Object.assign({}, this.model, result.data);
        },
    },
    created() {
        // 如果是从分类列表跳转过来，id就存在，执行后面的fetch
        this.id && this.fetch();
    },
};
</script>
