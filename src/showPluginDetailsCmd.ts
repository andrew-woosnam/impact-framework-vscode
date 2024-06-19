/** showPluginDetailsCmd.ts */
import * as vscode from "vscode";

export async function showPluginDetails(pluginId: string) {
    const document = await vscode.workspace.openTextDocument({
        content: `# Plugin Details\n\nDetails for plugin with ID: ${pluginId}\n\nThis is some dummy text for the plugin.`,
        language: 'markdown'
    });
    await vscode.window.showTextDocument(document, { preview: false });
}