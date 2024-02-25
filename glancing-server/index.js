const Koa = require("koa");
const { bodyParser } = require("@koa/bodyparser");
const mongoose = require("mongoose");
const routing = require("./routes");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const { dbConnection } = require("./config");

const app = new Koa();

mongoose.connect(dbConnection).catch(error => console.error);
mongoose.connection.on('error', err => console.error)

app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(bodyParser());
app.use(parameter(app));
routing(app);

app.listen(8080, () =>
  console.log("glancing server already start on http://localhost:8080")
);
