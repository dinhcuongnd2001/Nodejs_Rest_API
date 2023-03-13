const { body, validationResult } = require("express-validator");
const ItemSchema = require("../schemas/users");

module.exports = {
  CreateValidator: () => [
    body("username")
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
    body("password")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Password must be at least 5 and max 80 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .withMessage("at least one letter and one number"),
  ],

  EditValidator: () => [
    body("username")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Name Must be at least 5 and max 80 characters"),
    body("email").isEmail().withMessage("Must be Email"),
    body("password")
      .isLength({ min: 5, max: 80 })
      .withMessage("The Password must be at least 5 and max 80 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .withMessage("at least one letter and one number"),
  ],
};
