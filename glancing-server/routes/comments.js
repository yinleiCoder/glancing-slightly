const Router = require("koa-router");
const router = new Router({ prefix: "/api/posts/:postId/comments" });
const jwt = require("koa-jwt");
const { secret } = require("../config");

const {
  find,
  findById,
  create,
  update,
  delete: del,
  checkCommentExist,
  checkCommentator,
} = require("../controllers/comments");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", checkCommentExist, checkCommentator, findById);
router.post("/", auth, create);
router.patch("/:id", auth, checkCommentExist, checkCommentator, update);
router.delete("/:id", auth, checkCommentExist, checkCommentator, del);

module.exports = router;
