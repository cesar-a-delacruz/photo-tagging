const RESTRouter = require("./RESTRouter.js");
const controllers = require("../controllers/index.js");
const ScoreRouter = require("./ScoreRouter.js");

module.exports = {
  image: new RESTRouter("image", controllers.image),
  object: new RESTRouter("object", controllers.object),
  user: new RESTRouter("user", controllers.user),
  score: new ScoreRouter("score", controllers.score),
};
