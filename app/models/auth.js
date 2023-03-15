const MainSchemas = require(__path_schemas + "users");
const AuthUtils = require("../auth/authUtils");
const { checkLogin } = require("../service/auth.service");
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
};
