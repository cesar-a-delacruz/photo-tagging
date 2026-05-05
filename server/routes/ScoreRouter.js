const BaseRouter = require("./BaseRouter.js");

module.exports = class ScoreRouter extends BaseRouter {
  constructor(basePath, controller) {
    super(basePath, controller);

    this.router.get("/user/:userId", this.controller.findAll);
    this.router.get("/user/:userId/image/:imageId", this.controller.findOne);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
};
