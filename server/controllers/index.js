import RESTController from "./RESTController.js";
import { PrismaClient } from "../generated/prisma/index.js";
import validators from "../validators/index.js";

const prisma = new PrismaClient();

export default {
  image: new RESTController(
    prisma.image,
    {
      name: "string",
      url: "string",
    },
    validators.image,
  ),
};
