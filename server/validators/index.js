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
      url: {
        isURL: {
          errorMessage: "url must be a valid url",
        },
      },
    },
    {
      create: undefined,
      update: {
        name: {
          optional: true,
        },
        url: {
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
      record: {
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
        record: {
          optional: true,
        },
      },
    },
  ),
};
