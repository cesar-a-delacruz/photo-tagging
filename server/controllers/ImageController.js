import RESTController from "./RESTController.js";
import { upload } from "../utils/file.js";
import FileService from "../services/FileService.js";
import { validationResult } from "express-validator";

export default class ImageController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await await this.repository.findOne(req.params.id);
      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully", data: row });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find item", error });
    }
  };
  create = [
    upload.single("file"),
    this.validator.create,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: "Failed to create item", error: errors.mapped() });

      try {
        const fileUpload = await FileService.upload(
          req.body.name,
          req.file.buffer,
        );
        req.body.url = fileUpload.secure_url;

        const row = await this.repository.create(this.dataParser.run(req.body));
        console.log(row);
        return res
          .status(201)
          .json({ message: "Item created successfully", data: row });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error });
      }
    },
  ];
  delete = async (req, res) => {
    try {
      const row = await this.repository.delete(req.params.id);
      console.log(row);

      const fileUpload = await FileService.delete(row.url);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete item", error });
    }
  };
}
