const crypto = require("crypto");
const jwt = require("jsonwebtoken");
class AuthUtils {
  static createToken = async ({ _id }) => {
    const privateKey = crypto.randomBytes(64).toString("hex");
    return jwt.sign({ id: _id }, privateKey, {
      expiresIn: "1h",
    });
  };
}

module.exports = AuthUtils;
