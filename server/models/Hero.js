const mongoose = require("mongoose");

// 创建一个表（集合）
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [
        {
            icon: { type: String },
            name: { type: String },
            description: { type: String },
            tips: { type: String },
        },
    ],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [
        {
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
            description: { type: String },
        },
    ],
});

// 第三参数为创建集合，不然mongoose会将category末尾自动添加s来命名
module.exports = mongoose.model("Hero", schema, "heros");
