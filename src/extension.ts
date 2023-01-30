// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('documentdropedit-test.registerDropEditProvider', () => {

		const provider = vscode.languages.registerDocumentDropEditProvider({ language: "*", scheme: 'file' }, {
			async provideDocumentDropEdits(document, pos, dataTransfer, token): Promise<vscode.DocumentDropEdit> {
				let mimeType: string = "";
				dataTransfer.forEach((item, mime) => {
					const fileName = item.asFile()?.name;
					if (fileName) {
						vscode.window.showInformationMessage("dropped " + fileName + " into editor");
						mimeType = mime;
					}
				});
				console.log("mimeType: " + mimeType);
				console.log("fileName: " + dataTransfer.get(mimeType)?.asFile()?.name);
				return new Promise(async resolve => resolve({
					insertText: new TextDecoder().decode(await dataTransfer.get(mimeType)?.asFile()?.data())
				}));
			}
		});

		context.subscriptions.push(provider);
		vscode.window.showInformationMessage('dropdown provider registered!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
