/** extension.ts */
import * as vscode from 'vscode';
import { createManifestYamlAsync } from './createManifestCmd';
import { createManifestHoverProvider } from './manifestHoverProvider';
import { PluginExplorer } from './pluginExplorer';
import { showPluginDetails } from './showPluginDetailsCmd';
import * as dotenv from 'dotenv';
import path from 'path';
import { Plugin } from './types';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

function registerCommand(
  context: vscode.ExtensionContext,
  command: string,
  callback: (...args: any[]) => any,
) {
  const cmd = vscode.commands.registerCommand(command, callback);
  context.subscriptions.push(cmd);
}

function registerHoverProvider(
  context: vscode.ExtensionContext,
  selector: string,
  provider: vscode.HoverProvider,
) {
  const disposable = vscode.languages.registerHoverProvider(selector, provider);
  context.subscriptions.push(disposable);
}

function registerWebviewViewProvider(
  context: vscode.ExtensionContext,
  provider: vscode.WebviewViewProvider,
) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      PluginExplorer.viewType,
      provider,
    ),
  );
}

export function activate(context: vscode.ExtensionContext) {
  registerCommand(
    context,
    'impact-framework-vscode.createManifest',
    createManifestYamlAsync,
  );

  registerHoverProvider(context, 'yaml', createManifestHoverProvider(context));

  const pluginExplorerProvider = new PluginExplorer(context.extensionUri);
  registerWebviewViewProvider(context, pluginExplorerProvider);

  registerCommand(
    context,
    'impact-framework-vscode.showPluginDetails',
    (plugin: Plugin) => {
      showPluginDetails(plugin, context.extensionUri);
    },
  );
}

export function deactivate() {}
