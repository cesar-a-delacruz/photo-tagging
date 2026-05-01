import RESTRepository from "./RESTRepository.js";

export default class ImageRepository extends RESTRepository {
  findOne = async (id) => {
    const row = await this.model.findUnique({
      where: { id },
      include: { objects: true },
    });
    return row;
  };
}
