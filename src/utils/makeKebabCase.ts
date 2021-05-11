function makeKebabCase(value: string) {
  return value
    .replace(/_/gu, "-")
    .replace(/\B([A-Z])/gu, "-$1")
    .toLowerCase();
}

export default makeKebabCase;
