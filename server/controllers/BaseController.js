import DataParser from "../utils/DataParser.js";
export default class BaseController {
  constructor(repository, fields, validator) {
    this.repository = repository;
    this.dataParser = new DataParser({ ...fields });
    this.validator = validator;
  }
}
