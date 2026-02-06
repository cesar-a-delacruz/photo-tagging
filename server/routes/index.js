import RESTRouter from "./RESTRouter.js";
import controllers from "../controllers/index.js";

export default {
  image: new RESTRouter("image", controllers.image),
  object: new RESTRouter("object", controllers.object),
};
