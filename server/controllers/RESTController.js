import BaseController from "./BaseController.js";
import { validationResult } from "express-validator";

export default class RESTController extends BaseController {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll();
      console.table(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items", error })
        .end();
    }
  };
  findOne = async (req, res) => {
    try {
      const row = await this.repository.findOne(req.params.id);
      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully", data: row })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find item", error })
        .end();
    }
  };
  create = [
    this.validator.create,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(422)
          .json({ message: "Invalid item:", errors: errors.mapped() })
          .end();

      try {
        const row = await this.repository.create(this.dataParser.run(req.body));
        console.info(row);
        return res
          .status(201)
          .json({ message: "Item created successfully", data: row })
          .end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error })
          .end();
      }
    },
  ];
  update = [
    this.validator.update,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(422)
          .json({ message: "Invalid item:", errors: errors.mapped() })
          .end();

      try {
        const row = await this.repository.update(
          req.params.id,
          this.dataParser.run(req.body),
        );
        console.info(row);
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error })
          .end();
      }
    },
  ];
  delete = async (req, res) => {
    try {
      const row = await this.repository.delete(req.params.id);
      console.info(row);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to create item", error })
        .end();
    }
  };
}
