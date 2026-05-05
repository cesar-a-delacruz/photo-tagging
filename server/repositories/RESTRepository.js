export default class RESTRepository {
  constructor(model) {
    this.model = model;
  }

  findAll = async () => {
    const result = await this.model.findMany();
    if (result.length === 0) throw new Error("No rows have been found");

    return result;
  };
  findOne = async (id) => {
    const result = await this.model.findUnique({
      where: { id },
    });
    if (!result) throw new Error("This row doesn't exists");

    return result;
  };
  create = async (data) => {
    const result = await this.model.create({
      data,
    });
    return result;
  };
  update = async (id, data) => {
    const result = await this.model.update({
      where: { id },
      data,
    });
  };
  delete = async (id) => {
    const result = await this.model.delete({
      where: { id },
    });
    return result;
  };
}
