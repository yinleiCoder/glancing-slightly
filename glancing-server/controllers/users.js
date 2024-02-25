const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const { secret } = require("../config");

class UsersController {
  async find(ctx) {
    ctx.body = await User.find();
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async create(ctx) {
    ctx.verifyParams({
      username: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { username } = ctx.request.body;
    const repeatedUser = await User.findOne({ username });
    if (repeatedUser) {
      ctx.throw(409, "用户已存在");
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      username: { type: "string", required: false },
      password: { type: "string", required: false },
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async delete(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async login(ctx) {
    ctx.verifyParams({
      username: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }
    const { _id, username } = user;
    const token = jsonwebtoken.sign({ _id, username }, secret, {
      expiresIn: "7d",
    });
    ctx.body = {
      _id,
      username,
      token,
    };
  }

  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, "没有权限操作");
    }
    await next();
  }
}

module.exports = new UsersController();
