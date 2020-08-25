module.exports = (options) => {
    return async (req, res, next) => {
        // 获取动态的resource值
        let modelName = require("inflection").classify(req.params.resource); //将复数形式英文转化为单数首字母大写
        req.Model = require(`../models/${modelName}`); //将转化后的名字挂载到req.Model，下面的接口都可以使用
        next();
    };
};
