/** showPluginDetailsCmd.ts */
import * as vscode from "vscode";
import { Plugin } from "./types";

export async function showPluginDetails(plugin: Plugin, extensionUri: vscode.Uri) {
    const panel = vscode.window.createWebviewPanel(
        'pluginDetails', // Identifies the type of the webview. Used internally
        'Plugin Details', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            enableScripts: true
        }
    );

    const styleUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(extensionUri, 'static', 'styles.css')
    );

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Plugin Details</title>
        <link rel="stylesheet" type="text/css" href="${styleUri}">
    </head>
    <body class="details-body">
        <div class="details-title">${plugin.name}</div>
        <div class="details-subtitle">by ${plugin.author}</div>
        <div class="details-description">${plugin.description}</div>
        <div class="details-tags-container">
            ${plugin.tags.map(tag => `<span class="details-green-tag">${tag}</span>`).join('')}
        </div>
        <div class="details-stats">
            <div><strong>NPM Downloads:</strong> ${plugin.npmDownloads.toLocaleString()}</div>
            <div><strong>GitHub Stars:</strong> ${plugin.githubStars.toLocaleString()}</div>
        </div>
        <div class="details-links">
            <a href="${plugin.docs}" target="_blank">Documentation</a>
            <a href="${plugin.github}" target="_blank">GitHub Repository</a>
        </div>
    </body>
    </html>`;

    panel.webview.html = htmlContent;
}