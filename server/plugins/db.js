module.exports = (app) => {
    const mongoose = require("mongoose");
    mongoose.connect(
        "mongodb://admin:123456@127.0.0.1:27017/node-vue-moba?authSource=admin",
        { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
        (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("连接成功");
        }
    );

    require("require-all")(__dirname, "/../models");//将所有model映入进来，防止报错
};
