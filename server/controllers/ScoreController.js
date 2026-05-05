const RESTController = require("./RESTController.js");

module.exports = class ScoreController extends RESTController {
  findOne = async (req, res) => {
    try {
      const row = await this.repository.findOne(
        req.params.userId,
        req.params.imageId,
      );
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
};
