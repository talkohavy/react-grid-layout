function runValidationsOnData(data) {
  if (!Array.isArray(data)) {
    throw new Error(`\`data\` MUST be of an array type! You passed ${typeof data}`);
  }
}

export { runValidationsOnData };
