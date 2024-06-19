/** extension.ts */
import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";
import { createManifestHoverProvider } from "./hoverProviderFactory";
import { IFPluginsViewProvider } from './IFPluginsViewProvider';
import { showPluginDetails } from './showPluginDetailsCmd';
import * as dotenv from 'dotenv';
import path from "path";
import { Plugin } from "./types";

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

function registerCommand(context: vscode.ExtensionContext, command: string, callback: (...args: any[]) => any) {
  let cmd = vscode.commands.registerCommand(command, callback);
  context.subscriptions.push(cmd);
}

export function activate(context: vscode.ExtensionContext) {
  registerCommand(context, "impact-framework-vscode.createManifest", createManifestYamlAsync);

  vscode.languages.registerHoverProvider("yaml", createManifestHoverProvider(context));

  const provider = new IFPluginsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(IFPluginsViewProvider.viewType, provider)
  );

  registerCommand(context, "impact-framework-vscode.showPluginDetails", (plugin: Plugin) => {
    showPluginDetails(plugin, context.extensionUri);
  });
}

export function deactivate() { }