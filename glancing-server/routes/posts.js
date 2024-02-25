const Router = require("koa-router");
const router = new Router({ prefix: "/api/posts" });
const jwt = require("koa-jwt");
const { secret } = require("../config");

const {
  find,
  findById,
  create,
  update,
  delete: del,
  checkPostExist,
  checkPostOwner,
} = require("../controllers/posts");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", checkPostExist,findById);
router.post("/", auth, create);
router.patch("/:id", auth, checkPostExist, checkPostOwner, update);
router.delete("/:id", auth, checkPostExist, checkPostOwner, del);

module.exports = router;
