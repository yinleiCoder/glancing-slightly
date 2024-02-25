const Post = require("../models/posts");

class PostController {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Post.find({ $or: [{ title: q }, { description: q }] })
      .populate("owner")
      .limit(perPage)
      .skip(page * perPage);
  }

  async findById(ctx) {
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter((field) => field)
      .map((field) => ` +${field}`)
      .join("");
    const post = await Post.findById(ctx.params.id)
      .select(selectFields)
      .populate("owner topics");
    ctx.body = post;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: true },
      description: { type: "string", required: false },
      images: { type: "array", itemType: "string", required: false },
    });
    const post = await new Post({
      ...ctx.request.body,
      owner: ctx.state.user._id,
    }).save();
    ctx.body = post;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: "string", required: false },
      description: { type: "string", required: false },
    });
    await ctx.state.post.updateOne(ctx.request.body);
    ctx.body = ctx.state.post;
  }

  async delete(ctx) {
    await Post.findByIdAndDelete(ctx.params.id);
    ctx.status = 204;
  }

  async checkPostExist(ctx, next) {
    const post = await Post.findById(ctx.params.id).select("+owner");
    if (!post) {
      ctx.throw(404, "帖子不存在");
    }
    ctx.state.post = post;
    await next();
  }

  async checkPostOwner(ctx, next) {
    const { post } = ctx.state;
    if (post.owner.toString() !== ctx.state.user._id) {
      ctx.throw(403, "没有权限操作");
    }
    await next();
  }
}

module.exports = new PostController();
