const UserSchema = require("../schemas/users");
const bcrypt = require("bcrypt");
const checkLogin = async ({ email, password }) => {
  let err = "";
  const user = await UserSchema.findOne({ email }).lean();
  if (!user) return { err: "The Email And Password is not true" };
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return { err: "The Email And Password is not true" };
  return { user };
};

module.exports = {
  checkLogin,
};
