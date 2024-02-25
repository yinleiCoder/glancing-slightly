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
} = require("../controllers/users");

const auth = jwt({ secret });

router.get("/", find);
router.get("/:id", findById);
router.post("/", create);
router.patch("/:id", auth, checkOwner, update);
router.delete("/:id", auth, checkOwner, del);

router.post("/login", login);

module.exports = router;
