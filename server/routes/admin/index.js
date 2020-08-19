module.exports = (app) => {
    const express = require("express");
    const router = express.Router({
        mergeParams: true, //保留req.params来自父路由器的值。如果父项和子项的参数名称冲突，则子项的值优先。
    });
    // const req.Model = require("../../models/req.Model");

    // 创建公共的增删改查接口
    app.use(
        "/admin/api/rest/:resource",
        async (req, res, next) => {
            // 获取动态的resource值
            let modelName = require("inflection").classify(req.params.resource); //将复数形式英文转化为单数首字母大写
            req.Model = require(`../../models/${modelName}`); //将转化后的名字挂载到req.Model，下面的接口都可以使用
            next();
        },
        router
    );

    // 创建分类接口
    router.post("/", async (req, res) => {
        await req.Model.create(req.body); // 为req.Model表添加一条数据，也可以通过new req.Model({})创建
        res.send("操作成功");
    });

    // 编辑分类接口
    router.put("/:id", async (req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send("操作成功");
    });

    // 删除分类接口
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send("删除成功");
    });

    //查看分类列表接口         // get和post可以重名
    router.get("/", async (req, res) => {
        let queryOptions = {};
        if (req.Model.modelName === "Category") {
            queryOptions.populate = "parent";
        }
        // populate作用：创建Schema时，找到parent关联的数据，并替换掉parent此时的值
        let items = await req.Model.find().setOptions(queryOptions).limit(10); //setOptions可以将后面的链式操作转化为对象的形式
        res.send(items);
    });

    //根据id获取分类名称接口（编辑分类时用到）
    router.get("/:id", async (req, res) => {
        let model = await req.Model.findById(req.params.id);
        res.send(model);
    });
};
