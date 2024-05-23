import * as vscode from 'vscode';
import { createManifestYamlAsync } from './createManifestCmd';
import { createManifestHoverProvider } from './hoverProviderFactory';
import { IFPluginsViewProvider } from './IFPluginsViewProvider';
import { listNpmPackages } from './listNpmPackages';

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    'impact-framework-vscode.createManifest',
    () => {
      createManifestYamlAsync();
    }
  );

  vscode.languages.registerHoverProvider(
    'yaml',
    createManifestHoverProvider(context)
  );

  const provider = new IFPluginsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      IFPluginsViewProvider.viewType,
      provider
    )
  );

  let listNpmPackagesCmd = vscode.commands.registerCommand(
    'impact-framework-vscode.listNpmPackages',
    () => {
      listNpmPackages();
    }
  );

  context.subscriptions.push(createManifestCmd, listNpmPackagesCmd);
}

export function deactivate() {}
