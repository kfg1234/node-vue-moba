const mongoose = require("mongoose");

// 创建一个表（集合）
const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    // 上级分类，形成关联，
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, //和自己产生关联，可以形成无限级分类
});

schema.virtual("children", {
    localField: "_id",
    foreignField: "parent",
    justOne: false,
    ref: "Category",
});

// 第三参数为创建集合，不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Category", schema, "categories");
