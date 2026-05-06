const RESTRepository = require("./RESTRepository.js");

module.exports = class ImageRepository extends RESTRepository {
  findOne = async (id) => {
    const result = await this.model.findUnique({
      where: { id },
      include: { objects: true },
    });
    if (!result) throw new Error("This row doesn't exists");
    return result;
  };
};
