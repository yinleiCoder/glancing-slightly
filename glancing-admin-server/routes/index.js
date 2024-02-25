module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const User = require("../models/AdminUser");
  const router = express.Router({
    mergeParams: true,
  });

  const authMiddleware = require("../middlewares/auth");

  const resourceMiddleware = require("../middlewares/resource");

  router.get("/", async (req, res) => {
    const items = await req.Model.find().limit(20);
    res.send(items);
  });

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  router.post("/", authMiddleware(), async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  router.put("/:id", authMiddleware(), async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/:id", authMiddleware(), async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });

  app.use("/api/rest/:resource", resourceMiddleware(), router);

  const multer = require("multer");
  const upload = multer({ dest: "uploads/" });
  app.post(
    "/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign(
      {
        id: user._id,
        _id: user._id,
        username: user.username,
      },
      app.get("secret")
    );
    res.send({
      username: user.username,
      token,
    });
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
