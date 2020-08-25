// 使用multer处理文件上传，并且设置上传文件目录以及格式
function setFile() {
    const path = require("path");
    const multer = require("multer");
    const sd = require("silly-datetime");
    const mkdirp = require("mkdirp");
    var storage = multer.diskStorage({
        destination: async function (req, file, cb) {
            // 1.获取当前日期并且格式化
            let day = sd.format(new Date(), "YYYY-MM-DD");
            // 拼接成目录
            let dir = path.join("uploads", day);
            // 2.生成目录
            await mkdirp(path.resolve(__filename, `../../../${dir}`)); //mkdirp是一个异步方法

            cb(null, dir);
        },
        filename: function (req, file, cb) {
            // 1.获取后缀名
            let extname = path.extname(file.originalname);
            // 2.根据时间戳生成文件名
            cb(null, Date.now() + extname);
        },
    });
    return multer({ storage: storage });
}

module.exports = (app) => {
    const express = require("express");
    const jwt = require("jsonwebtoken");
    const assert = require("http-assert"); //处理错误模块
    const AdminUser = require("../../models/AdminUser");
    const router = express.Router({
        mergeParams: true, //保留req.params来自父路由器的值。如果父项和子项的参数名称冲突，则子项的值优先。
    });

    // token权限验证中间件
    let authMiddleware = async (req, res, next) => {
        let token = String(req.headers.authorization || "")
            .split(" ")
            .pop();
        assert(token, 401, "请先登录");
        let data;
        try {
            data = jwt.verify(token, app.get("secret"));
        } catch (error) {
            return res.status(401).send({
                message: "请先登录",
            });
        }
        req.user = await AdminUser.findById(data.id); //token验证通过，查出用户信息，挂载到req.user上
        assert(req.user, 401, "请先登录");
        await next();
    };

    // 创建公共的增删改查接口
    app.use(
        "/admin/api/rest/:resource",
        authMiddleware,
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

    //查看分类列表接口
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

    // 上传文件接口
    app.post("/admin/api/upload", authMiddleware, setFile().single("file"), async (req, res) => {
        let file = req.file;
        file.url = "http://localhost:3000/" + file.path;
        res.send(req.file);
    });

    app.set("secret", "1i2ufbjri$u5o3%hhu898#"); //设置secret，用于设置token
    // 登录接口
    app.post("/admin/api/login", async (req, res) => {
        let { username, password } = req.body;
        // 1.根据用户名找用户
        let user = await AdminUser.findOne({ username }).select("+password"); //强制包含已经在 schema level 排除的字段
        assert(user, 422, "用户不存在");

        // 2.校验密码
        let isValid = require("bcrypt").compareSync(password, user.password); //校验密码
        assert(isValid, 422, "密码错误");

        // 3.返回token   // npm i jsonwebtoken -s
        let token = jwt.sign(
            {
                id: user.id,
            },
            app.get("secret")
        );
        res.send({ token });
    });

    // 处理错误中间件;
    app.use(async (err, req, res, next) => {
        console.log(err.statusCode);
        console.log(err.message);
        res.status(err.statusCode || 500).send({
            message: err.message,
        });
    });
};
