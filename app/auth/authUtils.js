const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../configs/system");
class AuthUtils {
  static createToken = async ({ _id }) => {
    const privateKey = PRIVATE_KEY;
    return jwt.sign({ id: _id }, privateKey, {
      expiresIn: "1h",
    });
  };
}

module.exports = AuthUtils;
