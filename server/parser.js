function parseJSUI(text) {
  const lines = text.split("\n");
  const symbols = [];

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    let match;
    if ((match = trimmed.match(/^view (\w+)/))) {
      symbols.push({
        kind: "Component",
        name: match[1],
        position: { line: i, character: line.indexOf(match[1]) },
      });
    }
    if ((match = trimmed.match(/^state (\w+)/))) {
      symbols.push({
        kind: "State",
        name: match[1],
        position: { line: i, character: line.indexOf(match[1]) },
      });
    }
    if ((match = trimmed.match(/^const (\w+)/))) {
      symbols.push({
        kind: "Const",
        name: match[1],
        position: { line: i, character: line.indexOf(match[1]) },
      });
    }
  });

  return symbols;
}

module.exports = {
  parseJSUI,
};
