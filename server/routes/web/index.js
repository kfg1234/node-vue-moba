module.exports = (app) => {
    const router = require("express").Router();
    const Category = require("../../models/Category");
    const Article = require("../../models/Article");

    app.use("/web/api", router);

    // 录入数据
    router.get("/news/init", async (req, res) => {
        const parent = await Category.findOne({
            name: "新闻分类",
        });
        const cats = await Category.find()
            .where({
                // parent: parent,//也可以查出
                parent: parent._id,
            })
            .lean(); //lean返回的文档是普通 javascript 对象, 这些对象没有 save 方法、getters/setters，也没有被赋予其他 Mongoose magic。
        const newsTtiles = [
            "联手“乞巧”非遗，《王者荣耀》缔造数字“情人节”",
            "缘起峡谷，情定七夕 | 我所爱的，都在王者峡谷里",
            "听说，小妲己偷偷从峡谷溜去云南了？",
            "狗粮满满|最动人的情书读给你听",
            "英雄调整情报丨杨戬/苏烈加强，阿古朵降温，蔡文姬优化",
            "8月26日七夕“为爱向前冲”活动维护完成公告",
            "8月26日外挂专项打击公告",
            "8月26日“演员”惩罚名单",
            "8月26日净化游戏环境声明及处罚公告",
            "8月26日体验服停机更新公告",
            "荣耀中国节·银河配对，参与必得乞巧牵缘回城特效（新）",
            "峡谷迎七夕，甜蜜好礼来袭",
            "恭喜TS夺得世冠总冠军，回馈福利来袭，典韦-蓝屏警告星元上新",
            "【看世冠对决 赢豪华大礼】活动公告",
            "应援世冠得好礼，墨子两款皮肤重塑完成即将登场",
            "王者荣耀电竞推出六大措施打造全民参与体验闭环",
            "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售",
            "8月7日【比赛服】版本更新公告",
            "7月29日【比赛服】版本更新公告",
            "7月13日【比赛服】版本更新公告",
        ];
        const newsList = newsTtiles.map((title) => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
            return {
                categories: randomCats.splice(0, 2),
                title: title,
            };
        });
        await Article.deleteMany({});
        await Article.insertMany(newsList);

        res.send(newsList);
    });

    router.get("/news/list", async (req, res) => {
        const parent = await Category.findOne({
            name: "新闻分类",
        })
    });
};
