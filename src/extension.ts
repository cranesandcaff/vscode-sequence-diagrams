'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import preview from './preview';
import logger from './logger';

var previewInstance: preview;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    logger.info("Active!")

    // Retrieve the extension's absolute path
    let absolutePath = context.asAbsolutePath("out/src/");
    if (absolutePath[0] === '/')
        absolutePath = "file://" + absolutePath;
    else absolutePath = "file:///" + absolutePath;

    // Open the preview
    previewInstance = new preview(absolutePath);
    previewInstance.present();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.showsequencediagrampreview', () => {
        previewInstance.present();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}