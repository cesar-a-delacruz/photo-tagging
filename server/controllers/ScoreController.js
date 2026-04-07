import RESTController from "./RESTController.js";

export default class ScoreController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await this.model.findMany({
        where: {
          userId: req.params.userId,
          imageId: req.params.imageId,
        },
      });
      console.info(row[0]);
      res.status(200).json({ data: row[0] });
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
