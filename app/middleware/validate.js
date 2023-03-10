const { validationResult } = require("express-validator");

module.exports = {
  validateData: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errMessage = errors.array().map((error) => {
        return { [error.param]: error.msg };
      });
      return res.status(400).json({ errors: errMessage });
    }
    next();
  },
};
