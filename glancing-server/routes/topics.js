const Router = require("koa-router");
const router = new Router({ prefix: "/api/topics" });
const jwt = require("koa-jwt");
const { secret } = require("../config");

const {
  find,
  findById,
  create,
  update,
  delete: del,
  listPosts,
} = require("../controllers/topics");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findById);
router.post("/", auth, create);
router.patch("/:id", auth, update);
router.delete("/:id", auth, del);

router.get("/:id/posts", listPosts);

module.exports = router;
