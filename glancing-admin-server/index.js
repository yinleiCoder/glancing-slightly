const express = require("express");

const app = express();

app.set("secret", "yinlei");

app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./routes")(app);

app.listen(3000, () => {
  console.log("glancing slightly server listen: http://localhost:3000");
});
