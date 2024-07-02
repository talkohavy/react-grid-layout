function runValidationsOnData(data: any) {
  if (!Array.isArray(data)) {
    throw new Error(`\`data\` MUST exists and be of type array! You passed ${typeof data}`);
  }
}

export { runValidationsOnData };
