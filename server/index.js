const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // post请求传过来的参数，经过处理，在req.body中获取
app.use("/uploads", express.static(path.resolve(__filename, "../uploads")));

require("./routes/admin/index")(app);
require("./routes/web/index")(app);
require("./plugins/db")(app);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
