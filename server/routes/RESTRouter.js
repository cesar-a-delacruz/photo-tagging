import autorizationMiddleware from "../middlewares/autorizationMiddleware.js";
import BaseRouter from "./BaseRouter.js";

export default class RESTRouter extends BaseRouter {
  constructor(basePath, controller) {
    super(basePath, controller);

    this.router.get("/", autorizationMiddleware, this.controller.findAll);
    this.router.get("/:id", autorizationMiddleware, this.controller.findOne);
    this.router.post("/", autorizationMiddleware, this.controller.create);
    this.router.put("/:id", autorizationMiddleware, this.controller.update);
    this.router.delete("/:id", autorizationMiddleware, this.controller.delete);
  }
}
