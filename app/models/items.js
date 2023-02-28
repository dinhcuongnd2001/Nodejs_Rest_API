const MainSchemas = require(__path_schemas + "items");

module.exports = {
  create: (item) => {
    return new MainSchemas(item).save();
  },
  listItem: (params, option) => {
    if (option.task == "all") {
      return MainSchemas.find({}).select("id name status");
    }
    if (option.task == "one") {
      return MainSchemas.find({ id: params.id }).select("id name status");
    }
  },
};
