const DataParser = require("../utils/DataParser.js");

module.exports = class BaseController {
  constructor(repository, fields, validator) {
    this.repository = repository;
    this.dataParser = new DataParser({ ...fields });
    this.validator = validator;
  }
};
