const makeKebabCase = (value) =>
  value
    .replace(/_/gu, "-")
    .replace(/\B([A-Z])/gu, "-$1")
    .toLowerCase();

module.exports = makeKebabCase;
