export default class RESTRepository {
  constructor(model) {
    this.model = model;
  }

  findAll = async () => {
    const rows = await this.model.findMany();
    return rows;
  };
  findOne = async (id) => {
    const row = await this.model.findUnique({
      where: { id },
    });
    return row;
  };
  create = async (data) => {
    const row = await this.model.create({
      data,
    });
    return row;
  };
  update = async (id, data) => {
    const row = await this.model.update({
      where: { id },
      data,
    });
  };
  delete = async (id) => {
    const row = await this.model.delete({
      where: { id },
    });
  };
}
