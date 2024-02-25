const Topic = require("../models/topics");
const Post = require("../models/posts");

class TopicsController {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
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
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      banner: { type: "string", required: false },
      introduction: { type: "string", required: false },
    });
    const { name } = ctx.request.body;
    const repeatedTopic = await Topic.findOne({ name });
    if (repeatedTopic) {
      ctx.throw(409, "话题已存在");
    }
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      banner: { type: "string", required: false },
      introduction: { type: "string", required: false },
    });
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    ctx.body = topic;
  }

  async delete(ctx) {
    const topic = await Topic.findByIdAndDelete(ctx.params.id);
    if (!topic) {
      ctx.throw(404, "话题不存在");
    }
    ctx.body = topic;
  }

  // 列出属于该话题下的所有帖子
  async listPosts(ctx) {
    const posts = await Post.find({ topics: ctx.params.id });
    ctx.body = posts;
  }
}

module.exports = new TopicsController();
