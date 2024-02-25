const fs = require("fs");

module.exports = (app) => {
  // 路由的统一注册
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
  });
};
