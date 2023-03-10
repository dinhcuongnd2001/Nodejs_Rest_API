const { body, validationResult } = require("express-validator");
const ItemSchema = require("../schemas/items");

module.exports = {
  CreateValidator: () => [
    body("name")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Name Must be at least 5 and max 80 characters"),
    body("email")
      .isEmail()
      .withMessage("Must be Email")
      .custom((value) => {
        return ItemSchema.findOne({ email: value }).then((item) => {
          if (item) {
            return Promise.reject("E-mail already is used");
          }
        });
      }),
  ],

  EditValidator: () => [
    body("name")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Name Must be at least 5 and max 80 characters"),
    body("email").isEmail().withMessage("Must be Email"),
  ],
};
