const BaseRouter = require("./BaseRouter.js");

module.exports = class RESTRouter extends BaseRouter {
  constructor(basePath, controller) {
    super(basePath, controller);

    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    this.router.post("/", this.controller.create);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
};
