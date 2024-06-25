/** showPluginDetailsCmd.ts */
import * as vscode from 'vscode';
import { Plugin } from './types.js';

export async function showPluginDetails(
  plugin: Plugin,
  extensionUri: vscode.Uri,
) {
  const panel = vscode.window.createWebviewPanel(
    'pluginDetails',
    'Plugin Details',
    vscode.ViewColumn.One,
    { enableScripts: true },
  );

  const styleUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'static', 'styles.css'),
  );

  panel.webview.html = getPluginDetailsHtml(plugin, styleUri);
}

function getPluginDetailsHtml(plugin: Plugin, styleUri: vscode.Uri): string {
  return `
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
        ${generateTags(plugin.tags)}
        ${generateStats(plugin.npmDownloads, plugin.githubStars)}
        ${generateLinks(plugin.docs, plugin.github, plugin.npm)}
    </body>
    </html>`;
}

function generateTags(tags?: string[]): string {
  if (!tags) return '';
  return `
    <div class="details-tags-container">
      ${tags
        .map((tag) => `<span class="details-green-tag">${tag}</span>`)
        .join('')}
    </div>`;
}

function generateStats(npmDownloads?: number, githubStars?: number): string {
  if (!npmDownloads && !githubStars) return '';
  return `
    <div class="details-stats">
      ${
        npmDownloads
          ? `<div><strong>NPM Downloads:</strong> ${npmDownloads.toLocaleString()}</div>`
          : ''
      }
      ${
        githubStars
          ? `<div><strong>GitHub Stars:</strong> ${githubStars.toLocaleString()}</div>`
          : ''
      }
    </div>`;
}

function generateLinks(docs?: string, github?: string, npm?: string): string {
  return `
    <div class="details-links">
      ${docs ? `<a href="${docs}" target="_blank">Documentation</a>` : ''}
      ${
        github
          ? `<a href="${github}" target="_blank">GitHub Repository</a>`
          : ''
      }
      ${npm ? `<a href="${npm}" target="_blank">NPM</a>` : ''}
    </div>`;
}
