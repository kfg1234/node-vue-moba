module.exports = (options) => {
    const jwt = require("jsonwebtoken");
    const assert = require("http-assert");
    const AdminUser = require("../models/AdminUser");
    return async (req, res, next) => {
        let token = String(req.headers.authorization || "")
            .split(" ")
            .pop();
        assert(token, 401, "请先登录");
        let data;
        try {
            data = jwt.verify(token, req.app.get("secret"));
        } catch (error) {
            return res.status(401).send({
                message: "请先登录",
            });
        }
        req.user = await AdminUser.findById(data.id); //token验证通过，查出用户信息，挂载到req.user上
        assert(req.user, 401, "请先登录");
        await next();
    };
};
