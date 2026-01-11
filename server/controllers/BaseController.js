import DataParser from "../utils/DataParser.js";
export default class BaseController {
  constructor(model, fields, validator) {
    this.model = model;
    this.dataParser = new DataParser({ ...fields });
    this.validator = validator;
  }
}
