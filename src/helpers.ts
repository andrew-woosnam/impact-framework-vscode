/** helpers.ts */
import { Plugin } from "./types";
import * as vscode from 'vscode';

export function buildPluginsHtml(plugins: Plugin[], styleUri: vscode.Uri): string {
  let pluginsHtml = '';

  for (const plugin of plugins) {
    const listItem = `
        <div class="plugin-listing">
          <h2 class="plugin-title">${plugin.name}</h2>
          <h3 class="plugin-subtitle">by ${plugin.author}</h3>
          <p class="plugin-description">${plugin.description}</p>
          <div class="tags-container">
            ${plugin.tags.map(tag => `<span class="green-tag">${tag}</span>`).join('')}
          </div>
        </div>`;
    pluginsHtml += listItem;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="${styleUri}">
      <title>IF Plugins</title>
    </head>
    <body>
    ${pluginsHtml}
    </body>
    </html>`;

  return htmlContent;
}