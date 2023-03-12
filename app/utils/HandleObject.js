const _ = require("lodash");

module.exports = {
  getFields: (object = {}, fields = []) => {
    return _.pick(object, fields);
  },
};
