const hasOnDirective = require("./hasOnDirective");

const hasOnDirectives = (node, names) =>
  names.some((name) => hasOnDirective(node, name));

module.exports = hasOnDirectives;
