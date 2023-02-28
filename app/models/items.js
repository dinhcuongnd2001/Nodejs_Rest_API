const MainSchemas = require(__path_schemas + "items");

module.exports = {
  create: (item) => {
    return new MainSchemas(item).save();
  },
};
