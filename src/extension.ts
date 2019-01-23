import * as path from "path";
import * as vscode from "vscode";

// Base code for the webview: https://github.com/rebornix/vscode-webview-react
// React TODO app: https://github.com/Nemak121/react-redux-todo-ts
export function activate(context: vscode.ExtensionContext) {
  const extensionPath = context.extensionPath;
  const disposables: vscode.Disposable[] = [];
  let panel;
  context.subscriptions.push(
    vscode.commands.registerCommand("demoTime.start", () => {
      panel = vscode.window.createWebviewPanel(
        "Demo Panel",
        "Demo Time",
        vscode.ViewColumn.Two,
        {
          enableScripts: true
        }
      );

      const manifest = require(path.join(
        extensionPath,
        "build",
        "asset-manifest.json"
      ));
      const mainScript = manifest["main.js"];
      const scriptPathOnDisk = vscode.Uri.file(
        path.join(extensionPath, "build", mainScript)
      );
      const scriptUri = scriptPathOnDisk.with({ scheme: "vscode-resource" });

      panel.webview.html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="stylesheet" type="text/css" href="index.css">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	 crossorigin="anonymous">
	<!-- Optional theme -->
	        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
   crossorigin="anonymous">
          <link rel="stylesheet" type="text/css" href="index.css">
        </head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
          <script src="${scriptUri}"></script>
        </body>
        </html>
        `;
    })
  );
  // Our new command
  context.subscriptions.push(
    vscode.commands.registerCommand('demoTime.doRefactor', () => {
      if (!panel) {
        vscode.window.showErrorMessage('failed');
      }

      // Send a message to our webview.
      // You can send any JSON serializable data.
      panel.webview.postMessage({ action: 'addTodo', data: 'new todo' });

    }),
    vscode.commands.registerCommand('demoTime.toggleTodo', () => {
      if (!panel) {
        vscode.window.showErrorMessage('failed');
      }

      // Send a message to our webview.
      // You can send any JSON serializable data.
      panel.webview.postMessage({ action: 'toggleTodo', data: 1 });
    })
  );
}
