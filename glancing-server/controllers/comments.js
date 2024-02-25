const Comment = require("../models/comments");

class CommentController {
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const { postId } = ctx.params;
    const { rootCommentId } = ctx.query;
    ctx.body = await Comment.find({
      content: new RegExp(ctx.query.q),
      postId,
      rootCommentId,
    })
      .limit(perPage)
      .populate("commentator replyTo")
      .skip(page * perPage);
  }

  async findById(ctx) {
    const { fields = "" } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter((field) => field)
      .map((field) => ` +${field}`)
      .join("");
    const comment = await Comment.findById(ctx.params.id)
      .select(selectFields)
      .populate("commentator");
    ctx.body = comment;
  }

  async create(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
      rootCommentId: { type: "string", required: false },
      replyTo: { type: "string", required: false },
    });
    const commentator = ctx.state.user._id;
    const { postId } = ctx.params;
    const comment = await new Comment({
      ...ctx.request.body,
      commentator,
      postId,
    }).save();
    ctx.body = comment;
  }

  async update(ctx) {
    ctx.verifyParams({
      content: { type: "string", required: true },
    });
    const { content } = ctx.request.body;
    await ctx.state.comment.updateOne({ content });
    ctx.body = ctx.state.comment;
  }

  async delete(ctx) {
    await Comment.findByIdAndDelete(ctx.params.id);
    ctx.status = 204;
  }

  async checkCommentExist(ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select(
      "+commentator"
    );
    if (!comment) {
      ctx.throw(404, "评论不存在");
    }
    if (ctx.params.postId && comment.postId.toString() !== ctx.params.postId) {
      ctx.throw(404, "该帖子下没有此评论");
    }
    ctx.state.comment = comment;
    await next();
  }

  async checkCommentator(ctx, next) {
    const { comment } = ctx.state;
    if (comment.commentator.toString() !== ctx.state.user._id) {
      ctx.throw(403, "该评论您没有操作的权限");
    }
    await next();
  }
}

module.exports = new CommentController();
