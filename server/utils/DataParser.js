export default class DataParser {
  constructor(schema) {
    this.schema = schema;
  }

  run = (data) => {
    let parsedData = {};
    for (const field in data) {
      if (this.schema.hasOwnProperty(field) && data[field]) {
        parsedData[field] = this.#convert(field, data[field]);
      }
    }
    return parsedData;
  };

  #convert = (field, value) => {
    const type = this.schema[field];
    switch (type) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "date":
        return new Date(value);
      default:
        return null;
    }
  };
}
