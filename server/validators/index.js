import BaseValidator from "./BaseValidator.js";
export default {
  image: new BaseValidator(
    {
      name: {
        isLength: {
          options: {
            min: 3,
            max: 25,
          },
          errorMessage: "name must be between 3 and 25 characters long",
        },
      },
    },
    {
      create: undefined,
      update: {
        name: {
          optional: true,
        },
      },
    },
  ),
  object: new BaseValidator(
    {
      name: {
        isLength: {
          options: {
            min: 3,
            max: 25,
          },
          errorMessage: "name must be between 3 and 25 characters long",
        },
      },
      position: {
        isEmpty: {
          negated: true,
          errorMessage: "position is required",
        },
      },
    },
    {
      create: undefined,
      update: {
        name: {
          optional: true,
        },
        position: {
          optional: true,
        },
      },
    },
  ),
  user: new BaseValidator(
    {
      name: {
        isLength: {
          options: {
            min: 3,
            max: 25,
          },
          errorMessage: "name must be between 3 and 25 characters long",
        },
      },
    },
    {
      create: undefined,
      update: {
        name: {
          optional: true,
        },
      },
    },
  ),
  score: new BaseValidator(
    {
      record: {
        isLength: {
          options: {
            max: 8,
          },
          errorMessage: "record must be 8 characters long",
        },
      },
    },
    {
      create: undefined,
      update: {
        record: {
          optional: true,
        },
      },
    },
  ),
};
