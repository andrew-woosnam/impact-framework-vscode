/** helpers.ts */
import { Plugin } from "./types";

export function buildPluginsHtml(plugins: Plugin[]): string {
  let pluginsHtml = '';

  for (const plugin of plugins) {
    const listItem = `
        <div class="plugin-listing">
          <h2>${plugin.name}</h2>
          <h3>by ${plugin.author}</h3>
          <p>${plugin.description}</p>
          <div>
            ${plugin.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>`;
    pluginsHtml += listItem;
  }

  return `<div class="plugins-list">${pluginsHtml}</div>`;
}