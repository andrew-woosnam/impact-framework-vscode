/** pluginsList.ts */
import * as vscode from 'vscode';
import { Plugin } from './types';

export function extractPackageName(npmUrl?: string): string {
  if (!npmUrl) {
    return '';
  }
  const urlParts = npmUrl.split('/');
  return urlParts.pop() || urlParts.pop() || ''; // handle potential trailing slash
}

export function createPluginListItem(plugin: Plugin): string {
  const npmPackage = extractPackageName(plugin.npm);
  const tagsHtml = plugin.tags ? generateTagsHtml(plugin.tags) : '';

  return `
    <div class="plugin-listing" data-command="impact-framework-vscode.showPluginDetails" data-plugin-id="${plugin.objectID}">
      <div class="plugin-header">
        <h2 class="plugin-title">${plugin.name}</h2>
        <div class="plugin-install-btn" data-command="execNpmInstall" data-package-name="${npmPackage}">Install</div>
      </div>
      <h3 class="plugin-subtitle">by ${plugin.author}</h3>
      <p class="plugin-description">${plugin.description}</p>
      ${tagsHtml}
    </div>`;
}

export function generateTagsHtml(tags: string[]): string {
  return tags && tags.length > 0
    ? `
    <div class="tags-container">
      ${tags.map((tag) => `<span class="green-tag">${tag}</span>`).join('')}
    </div>`
    : '';
}

export function generateHtmlContent(
  pluginsHtml: string,
  styleUri: vscode.Uri,
): string {
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
          vscode.postMessage({ command, pluginId });
        });
      });

      document.querySelectorAll('.plugin-install-btn').forEach(button => {
        button.addEventListener('click', event => {
          event.stopPropagation();
          const command = event.currentTarget.getAttribute('data-command');
          const packageName = event.currentTarget.getAttribute('data-package-name');
          vscode.postMessage({ command, args: packageName });
        });
      });
    </script>
    </body>
    </html>`;
}

export function generatePluginsListHtml(
  plugins: Plugin[],
  styleUri: vscode.Uri,
): string {
  if (plugins.length < 1) {
    return `<p>No Plugins Found.</p>`;
  }

  const pluginsHtml = plugins.map(createPluginListItem).join('');
  return generateHtmlContent(pluginsHtml, styleUri);
}
