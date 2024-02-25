const Koa = require("koa");
const { koaBody } = require("koa-body");
const serve = require("koa-static");
const mongoose = require("mongoose");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const { dbConnection } = require("./config");
const path = require("path");
const routing = require("./routes");

const app = new Koa();

mongoose.connect(dbConnection).catch((error) => console.error);
mongoose.connection.on("error", (err) => console.error);

app.use(serve(path.join(__dirname, "public")));
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"),
      keepExtensions: true,
    },
  })
);
app.use(parameter(app));
routing(app);

app.listen(8080, () =>
  console.log("glancing server already start on http://localhost:8080")
);
