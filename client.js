const path = require("path");
const vscode = require("vscode");
const { LanguageClient, TransportKind } = require("vscode-languageclient/node");

function activate(context) {
  const serverModule = context.asAbsolutePath(path.join("server", "server.js"));

  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc },
  };

  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "jsui" }],
  };

  const client = new LanguageClient(
    "jsui",
    "JSUI Language Server",
    serverOptions,
    clientOptions
  );
  context.subscriptions.push(client.start());
}

exports.activate = activate;
