<template>
    <div>
        <h1>{{ id ? "编辑" : "创建" }}英雄</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-tabs type="border-card" value="0">
                <el-tab-pane label="基本信息">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" placeholder="请选择" :multiple="true">
                            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.6rem;" :max="9" :show-score="true" v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.6rem;" :max="9" :show-score="true" v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.6rem;" :max="9" :show-score="true" v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.6rem;" :max="9" :show-score="true" v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" placeholder="请选择" :multiple="true">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" placeholder="请选择" :multiple="true">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能">
                    <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index" style="margin-top:1rem;">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="
                                        (res) => {
                                            $set(item, 'icon', res.url);
                                        }
                                    "
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" size="small" @click="model.skills.splice(index, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem;">
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
            categories: [],
            items: [],
            model: {
                name: "",
                avatar: "",
                scores: {},
                skills: [],
            },
        };
    },
    methods: {
        // 新建分类并保存
        async save() {
            let res;
            // 如果存在id，执行编辑分类接口
            if (this.id) {
                res = await this.$http.put(`/rest/heros/${this.id}`, this.model);
            } else {
                res = await this.$http.post("/rest/heros", this.model);
            }
            this.$router.replace("/heros/list");
            this.$message({
                showClose: true,
                message: res.data,
                type: "success",
                duration: 2000,
            });
        },
        // 编辑时获取英雄信息
        async fetch() {
            let result = await this.$http.get(`/rest/heros/${this.id}`);
            this.model = Object.assign({}, this.model, result.data);
        },
        // 上传文件
        afterUpload(file) {
            this.model.avatar = file.url;
        },
        // 获取类型下拉框数据
        async fetchCategories() {
            let result = await this.$http.get(`/rest/categories`);
            this.categories = result.data;
        },
        // 获取出装下拉框数据
        async fetchItems() {
            let result = await this.$http.get(`/rest/items`);
            this.items = result.data;
        },
    },
    created() {
        this.fetchCategories();
        this.fetchItems();
        this.id && this.fetch();
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>
