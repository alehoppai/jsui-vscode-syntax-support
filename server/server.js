const {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  TextDocumentSyncKind,
} = require("vscode-languageserver");

const { TextDocument } = require("vscode-languageserver-textdocument");
const { parseJSUI } = require("./parser");

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      hoverProvider: true,
    },
  };
});

documents.onDidChangeContent((change) => {
  // Here you can trigger validation if needed
});

connection.onHover((params) => {
  const doc = documents.get(params.textDocument.uri);
  const pos = params.position;

  const parsed = parseJSUI(doc.getText());

  const match = parsed.find((symbol) => {
    return (
      symbol.position.line === pos.line &&
      pos.character >= symbol.position.character &&
      pos.character <= symbol.position.character + symbol.name.length
    );
  });

  if (match) {
    return {
      contents: {
        kind: "markdown",
        value: `**${match.kind}** \`${match.name}\``,
      },
    };
  }

  return null;
});

documents.listen(connection);
connection.listen();
