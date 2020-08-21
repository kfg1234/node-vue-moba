const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

// 第三参数为创建集合，或查询集合时的名字，不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Article", schema, "articles");
