const { body, validationResult } = require("express-validator");
const CareersSchema = require("../schemas/careers");

module.exports = {
  CreateValidator: () => [
    body("name")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Name Must be at least 5 and max 80 characters")
      .custom((value) => {
        return CareersSchema.findOne({ name: value }).then((career) => {
          if (career) {
            return Promise.reject("Name already is used");
          }
        });
      }),
  ],

  EditValidator: () => [
    body("name")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Name Must be at least 5 and max 80 characters"),
  ],
};
