const Router = require("koa-router");
const router = new Router({ prefix: "/api/users" });
const jwt = require("koa-jwt");
const { secret } = require("../config");

const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  checkUserExist,
  listFollowing,
  listFollowers,
  follow,
  unfollow,
  listPosts,
} = require("../controllers/users");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);

router.post("/login", login);
router.get("/:id/following", listFollowing);
router.get("/:id/followers", listFollowers);
router.put("/following/:id", auth, checkUserExist, follow);
router.put("/unfollowing/:id", auth, checkUserExist, unfollow);
router.get("/:id/posts", listPosts);

module.exports = router;
