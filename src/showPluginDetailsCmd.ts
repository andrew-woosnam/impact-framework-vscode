/** showPluginDetailsCmd.ts */
import * as vscode from "vscode";
import { Plugin } from "./types";

export async function showPluginDetails(plugin: Plugin) {
    const panel = vscode.window.createWebviewPanel(
        'pluginDetails', // Identifies the type of the webview. Used internally
        'Plugin Details', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            enableScripts: true
        }
    );

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Plugin Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            .plugin-title {
                font-size: 24px;
                font-weight: bold;
            }
            .plugin-details {
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="plugin-title">${plugin.name}</div>
        <div class="plugin-details">${plugin.description}</div>
    </body>
    </html>`;

    panel.webview.html = htmlContent;
}