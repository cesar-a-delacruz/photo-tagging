import RESTController from "./RESTController.js";
import ImageController from "./ImageController.js";
import { PrismaClient } from "../generated/prisma/index.js";
import validators from "../validators/index.js";
import ScoreController from "./ScoreController.js";
import RESTRepository from "../repositories/RESTRepository.js";
import ScoreRepository from "../repositories/ScoreRepository.js";
import ImageRepository from "../repositories/ImageRepository.js";

const prisma = new PrismaClient();

export default {
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
