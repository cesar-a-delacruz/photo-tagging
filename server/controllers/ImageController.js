import RESTController from "./RESTController.js";

export default class ImageController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await this.model.findUnique({
        where: { id: req.params.id },
        include: { objects: true },
      });
      console.info(row);
      res.status(200).json(row);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch item" });
    }
  };
}
