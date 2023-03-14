const MainSchemas = require(__path_schemas + "users");
const AuthUtils = require("../auth/authUtils");
module.exports = {
  create: async (item) => {
    const data = await MainSchemas(item).save();
    return await AuthUtils.signUp(data);
  },
};
