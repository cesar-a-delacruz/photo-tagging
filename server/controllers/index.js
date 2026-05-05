const RESTController = require("./RESTController.js");
const ImageController = require("./ImageController.js");
const { PrismaClient } = require("../generated/prisma/index.js");
const validators = require("../validators/index.js");
const ScoreController = require("./ScoreController.js");
const RESTRepository = require("../repositories/RESTRepository.js");
const ScoreRepository = require("../repositories/ScoreRepository.js");
const ImageRepository = require("../repositories/ImageRepository.js");

const prisma = new PrismaClient();

module.exports = {
  image: new ImageController(
    new ImageRepository(prisma.image),
    {
      name: "string",
      url: "string",
    },
    validators.image,
  ),
  object: new RESTController(
    new RESTRepository(prisma.object),
    {
      name: "string",
      position: "json",
      imageId: "string",
    },
    validators.object,
  ),
  user: new RESTController(
    new RESTRepository(prisma.user),
    {
      name: "string",
    },
    validators.user,
  ),
  score: new ScoreController(
    new ScoreRepository(prisma.score),
    {
      record: "string",
      userId: "string",
      imageId: "string",
    },
    validators.score,
  ),
};
