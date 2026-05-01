import RESTController from "./RESTController.js";

export default class ScoreController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await this.repository.findOne(
        req.params.userId,
        req.params.imageId,
      );
      console.info(row[0]);
      return res.status(200).json({ data: row[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find item", error });
    }
  };
}
