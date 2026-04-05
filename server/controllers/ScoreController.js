import RESTController from "./RESTController.js";

export default class ScoreController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await this.model.findUnique({
        where: {
          userId: parseInt(req.query.userId),
          imageId: parseInt(req.query.imageId),
        },
      });
      console.info(row);
      res.status(200).json(row);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  };
  findAll = async (req, res) => {
    try {
      const rows = await this.model.findMany();
      console.table(rows);
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch items" });
    }
  };
}
