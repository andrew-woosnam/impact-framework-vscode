/** helpers.ts */
import { Plugin } from "./types";

export function buildPluginsHtml(plugins: Plugin[]): string {
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

  return `<div class="plugins-list">${pluginsHtml}</div>`;
}