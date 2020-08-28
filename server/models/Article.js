const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: { type: String },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
        body: { type: String },
    },
    {
        timestamps: true,//自动生成创建时间和更新时间字段
    }
);

// 第三参数为创建集合，不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Article", schema, "articles");
