module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const Category = require("../../models/Category");

    app.use("/admin/api", router);

    // 创建分类接口
    router.post("/categories", async (req, res) => {
        await Category.create(req.body); // 为Category表添加一条数据，也可以通过new Category({})创建
        res.send("操作成功");
    });

    // 编辑分类接口
    router.put("/categories/:id", async (req, res) => {
        await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send("操作成功");
    });

    // 删除分类接口
    router.delete("/categories/:id", async (req, res) => {
        await Category.findByIdAndDelete(req.params.id);
        res.send("删除成功");
    });

    //查看分类列表接口         // get和post可以重名
    router.get("/categories", async (req, res) => {
        //! populate作用：创建Schema时，找到parent关联的数据，并替换掉parent此时的值
        let items = await Category.find().populate("parent").limit(10);
        res.send(items);
    });

    //根据id获取分类名称接口（编辑分类时用到）
    router.get("/categories/:id", async (req, res) => {
        let model = await Category.findById(req.params.id);
        res.send(model);
    });
};
