const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../configs/system");
const crypt = require("crypto");
const UserSchema = require("../schemas/users");
const SendEmail = require("../utils/SendEmail");
class AuthUtils {
  static createToken = async ({ _id }) => {
    const privateKey = PRIVATE_KEY;
    return jwt.sign({ id: _id }, privateKey, {
      expiresIn: "1h",
    });
  };

  static resetPassword = async (user) => {
    const resetToken = crypt.randomBytes(20).toString("hex");
    const resetPassToken = crypt
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPassTokenExp = Date.now() + 10 * 60 * 1000;
    const newUser = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { resetPassToken, resetPassTokenExp },
      {
        new: true,
      }
    );
    const resetURL = `/api/v1/auth/resetPassword/${resetToken}`;
    const message = `Access Link to change password: ${resetURL}`;

    try {
      await SendEmail({
        email: user.email,
        subject: "Change PassWord",
        message,
      });
      return "Let's Check Email";
    } catch (error) {
      const newUser = await UserSchema.findByIdAndUpdate(
        { _id: user._id },
        { resetPassToken: "undefined", resetPassTokenExp: "undefined" },
        {
          new: true,
        }
      );
      return "Can't send email, Let't Do It Again";
    }

    return resetToken;
  };
}

module.exports = AuthUtils;
