import RESTRepository from "./RESTRepository.js";

export default class ScoreRepository extends RESTRepository {
  findOne = async (userId, imageId) => {
    const result = await this.model.findMany({
      where: {
        userId: userId,
        imageId: imageId,
      },
    });
    if (!result.length) throw new Error("This row doesn't exists");
    return result[0];
  };
}
