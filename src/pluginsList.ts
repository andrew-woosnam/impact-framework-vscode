/** pluginsList.ts */
import { Plugin } from "./types";
import * as vscode from 'vscode';

function createPluginListItem(plugin: Plugin): string {
  return `
    <div class="plugin-listing" data-command="impact-framework-vscode.showPluginDetails" data-plugin-id="${plugin.objectID}">
      <h2 class="plugin-title">${plugin.name}</h2>
      <h3 class="plugin-subtitle">by ${plugin.author}</h3>
      <p class="plugin-description">${plugin.description}</p>
    ${plugin.tags ? `
        <div class="tags-container">
          ${plugin.tags.map(tag => `<span class="green-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
    </div>`;
}

function generateHtmlContent(pluginsHtml: string, styleUri: vscode.Uri): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="${styleUri}">
      <title>IF Plugins</title>
    </head>
    <body>
    ${pluginsHtml}
    <script>
      const vscode = acquireVsCodeApi();
      document.querySelectorAll('.plugin-listing').forEach(item => {
        item.addEventListener('click', event => {
          const pluginId = event.currentTarget.getAttribute('data-plugin-id');
          const command = event.currentTarget.getAttribute('data-command');
          console.log('Posting message:', { command, pluginId });
          vscode.postMessage({ command, pluginId });
        });
      });
    </script>
    </body>
    </html>`;
}

export function generatePluginsListHtml(plugins: Plugin[], styleUri: vscode.Uri): string {
  const pluginsHtml = plugins.map(createPluginListItem).join('');
  return generateHtmlContent(pluginsHtml, styleUri);
}