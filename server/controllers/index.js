import RESTController from "./RESTController.js";
import ImageController from "./ImageController.js";
import { PrismaClient } from "../generated/prisma/index.js";
import validators from "../validators/index.js";

const prisma = new PrismaClient();

export default {
  image: new ImageController(
    prisma.image,
    {
      name: "string",
      url: "string",
    },
    validators.image,
  ),
  object: new RESTController(
    prisma.object,
    {
      name: "string",
      position: "json",
      imageId: "number",
    },
    validators.object,
  ),
};
