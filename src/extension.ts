/** extension.ts */
import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";
import { createManifestHoverProvider } from "./hoverProviderFactory";
import { IFPluginsViewProvider } from './IFPluginsViewProvider';
import { showPluginDetails } from './showPluginDetailsCmd';
import * as dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.createManifest",
    () => {
      createManifestYamlAsync();
    }
  );

  context.subscriptions.push(createManifestCmd);

  vscode.languages.registerHoverProvider(
    "yaml",
    createManifestHoverProvider(context)
  );

  const provider = new IFPluginsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      IFPluginsViewProvider.viewType,
      provider
    )
  );

  let showPluginDetailsCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.showPluginDetails",
    (pluginId: string) => {
      showPluginDetails(pluginId);
    }
  );

  context.subscriptions.push(showPluginDetailsCmd);
}

export function deactivate() { }
