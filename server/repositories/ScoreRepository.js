import RESTRepository from "./RESTRepository.js";

export default class ScoreRepository extends RESTRepository {
  findOne = async (userId, imageId) => {
    const rows = await this.model.findMany({
      where: {
        userId: userId,
        imageId: imageId,
      },
    });
    return rows[0];
  };
}
