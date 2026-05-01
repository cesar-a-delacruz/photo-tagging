import RESTController from "./RESTController.js";
import { cloudinary, upload } from "../utils/file.js";
import { validationResult } from "express-validator";

export default class ImageController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await await this.repository.findOne(req.params.id);
      console.info(row);
      return res.status(200).json(row);
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
      if (!errors.isEmpty()) return res.status(400).json(errors.mapped());

      try {
        await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "photo-tagging", display_name: req.body.name },
              (error, result) => {
                if (error) {
                  console.error(error);
                  return res
                    .status(500)
                    .json({ error: "Failed to create item" });
                }
                resolve(result);
                req.body.url = result.secure_url;
              },
            )
            .end(req.file.buffer);
        });
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
      await new Promise((resolve) => {
        cloudinary.api.delete_resources([
          row.url.substring(
            row.url.lastIndexOf("photo-tagging"),
            row.url.lastIndexOf("."),
          ),
        ]);
        resolve();
      });
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete item", error });
    }
  };
}
