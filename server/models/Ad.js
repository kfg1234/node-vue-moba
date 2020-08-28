const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    items: [
        {
            image: { type: String },
            url: { type: String },
        },
    ],
});

// 第三参数为创建集合,不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Ad", schema, "ads");
