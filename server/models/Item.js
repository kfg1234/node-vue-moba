const mongoose = require("mongoose");

// 创建一个表（集合）
const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    icon: { type: String },
});

// 第三参数为创建集合，不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Item", schema, "items");
