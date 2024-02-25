class HomeController {
  index(ctx) {
    ctx.body = "home page";
  }
}

module.exports = new HomeController();
