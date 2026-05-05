const { checkSchema } = require("express-validator");

module.exports = class BaseValidator {
  schemas = {};
  constructor(
    baseSchema,
    validations = { create: undefined, update: undefined },
  ) {
    for (const validation in validations) {
      this.schemas[validation] = baseSchema;
      if (validations[validation] !== undefined) {
        for (const field in validations[validation]) {
          for (const rule in validations[validation][field]) {
            this.schemas[validation][field][rule] =
              validations[validation][field][rule];
          }
        }
      }
      this[validation] = checkSchema(this.schemas[validation]);
    }
  }
};
