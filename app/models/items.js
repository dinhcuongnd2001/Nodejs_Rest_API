const MainSchemas = require(__path_schemas + "items");

module.exports = {
  create: (item) => {
    return new MainSchemas(item).save();
  },

  listItem: (params, option) => {
    if (option.task == "all") {
      let condition = {};
      let sort = {};
      if (params.keySearch) {
        condition["name"] = params.keySearch;
      }
      if (params.status) condition["status"] = params.status;
      if (params.order) sort["name"] = params.order;
      return MainSchemas.find(condition).sort(sort);
    }
    if (option.task == "one") {
      return MainSchemas.findById(params.id);
    }
  },

  editItem: (params, data, option) => {
    if (option.task == "edit") {
      return MainSchemas.updateOne({ _id: params.id }, { ...data });
    }
  },

  deleteItem: (params, option) => {
    if (option.task == "one") {
      return MainSchemas.deleteOne({ _id: params.id });
    }
  },
};
