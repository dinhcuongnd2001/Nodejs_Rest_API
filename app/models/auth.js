const MainSchemas = require(__path_schemas + "users");
const AuthUtils = require("../auth/authUtils");
const { checkLogin } = require("../service/auth.service");
const crypto = require("crypto");
module.exports = {
  create: async (item) => {
    const data = await MainSchemas(item).save();
    return await AuthUtils.createToken(data);
  },

  login: async ({ email, password }, res) => {
    const data = await checkLogin({ email, password });
    if (data.err) {
      return {
        statusCode: 401,
        success: true,
        notice: "Login False",
        message: data.err,
      };
    }
    const token = await AuthUtils.createToken(data.user);
    return {
      statusCode: 200,
      success: true,
      notice: "Login Successfull",
      token,
    };
  },

  forgotPassword: async ({ email }) => {
    const user = await MainSchemas.findOne({ email }).lean();
    if (!user)
      return {
        statusCode: 401,
        success: true,
        massage: "Email is not existen",
      };
    const message = await AuthUtils.resetPassword(user);

    return {
      statusCode: 200,
      success: true,
      message,
    };
  },
  resetPassword: async ({ resetToken, password }) => {
    const resetPassToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await MainSchemas.findOne({
      resetPassToken,
      resetPassTokenExp: { $gt: Date.now() },
    });
    if (!user) {
      console.log("user:: ", user);
      return {
        statusCode: 401,
        message: "Token is not true, re-change password again",
      };
    }
    user.password = password;
    user.resetPassToken = undefined;
    user.resetPassTokenExp = undefined;
    await user.save();
    return {
      statusCode: 200,
      message: "Change Password successfully",
    };
  },
};
