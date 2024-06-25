/** pluginsList.test.ts */
import {
  extractPackageName,
  createPluginListItem,
  generateTagsHtml,
  generateHtmlContent,
  generatePluginsListHtml,
} from '../../pluginsList.js';
import * as vscode from 'vscode';
import { Plugin } from '../../types.js';

// Constants
const PLUGIN_ID = '1';
const PLUGIN_NAME = 'Test Plugin';
const PLUGIN_PACKAGE_NAME = 'test-plugin';
const NPM_URL = 'https://www.npmjs.com/package/test-plugin';
const PLUGIN_AUTHOR = 'Test Author';
const PLUGIN_DESCRIPTION = 'This is a test plugin';
const TAG1 = 'tag1';
const TAG2 = 'tag2';
const DOCS_URL = 'https://www.testplugin.com/docs';
const GITHUB_URL = 'https://github.com/test-author/test-plugin';
const NPM_DOWNLOADS = 1234;
const GITHUB_STARS = 567;
const STYLE_URI = 'vscode-resource:/path/to/style.css';
const STYLE_LINK = `<link rel="stylesheet" type="text/css" href="${STYLE_URI}">`;
const PLUGINS_HTML = '<div class="plugin-listing"></div>';
const styleUri = vscode.Uri.parse(STYLE_URI);

// Mock Plugin data
const mockPlugin: Plugin = {
  objectID: PLUGIN_ID,
  name: PLUGIN_NAME,
  npm: NPM_URL,
  author: PLUGIN_AUTHOR,
  description: PLUGIN_DESCRIPTION,
  tags: [TAG1, TAG2],
  docs: DOCS_URL,
  github: GITHUB_URL,
  npmDownloads: NPM_DOWNLOADS,
  githubStars: GITHUB_STARS,
};

const mockPluginMinimal: Plugin = {
  objectID: PLUGIN_ID,
  name: PLUGIN_NAME,
  npm: NPM_URL,
  author: PLUGIN_AUTHOR,
  description: PLUGIN_DESCRIPTION,
  tags: undefined,
  docs: undefined,
  github: undefined,
  npmDownloads: undefined,
  githubStars: undefined,
};

describe('extractPackageName', () => {
  test('should extract package name from npm URL', () => {
    expect(extractPackageName(NPM_URL)).toBe(PLUGIN_PACKAGE_NAME);
  });

  test('should return empty string if URL is empty', () => {
    expect(extractPackageName('')).toBe('');
  });

  test('should handle URLs with trailing slashes', () => {
    expect(extractPackageName(`${NPM_URL}/`)).toBe(PLUGIN_PACKAGE_NAME);
  });

  test('should return empty string if URL is undefined', () => {
    expect(extractPackageName(undefined)).toBe('');
  });
});

describe('createPluginListItem', () => {
  test('should create HTML for plugin list item', () => {
    const html = createPluginListItem(mockPlugin).replace(/\n\s*/g, '').trim();
    expect(html).toContain('class="plugin-listing"');
    expect(html).toContain(`data-plugin-id="${PLUGIN_ID}"`);
    expect(html).toContain(`data-package-name="${PLUGIN_PACKAGE_NAME}"`);
    expect(html).toContain(`<h2 class="plugin-title">${PLUGIN_NAME}</h2>`);
    expect(html).toContain(
      `<h3 class="plugin-subtitle">by ${PLUGIN_AUTHOR}</h3>`,
    );
    expect(html).toContain(
      `<p class="plugin-description">${PLUGIN_DESCRIPTION}</p>`,
    );
    expect(html).toContain(`<span class="green-tag">${TAG1}</span>`);
    expect(html).toContain(`<span class="green-tag">${TAG2}</span>`);
  });

  test('should handle missing optional fields', () => {
    const html = createPluginListItem(mockPluginMinimal)
      .replace(/\n\s*/g, '')
      .trim();

    expect(html).toContain('class="plugin-listing"');
    expect(html).toContain(`data-plugin-id="${PLUGIN_ID}"`);
    expect(html).toContain(`data-package-name="${PLUGIN_PACKAGE_NAME}"`);
    expect(html).toContain(`<h2 class="plugin-title">${PLUGIN_NAME}</h2>`);
    expect(html).toContain(
      `<h3 class="plugin-subtitle">by ${PLUGIN_AUTHOR}</h3>`,
    );
    expect(html).toContain(
      `<p class="plugin-description">${PLUGIN_DESCRIPTION}</p>`,
    );
  });
});

describe('generateTagsHtml', () => {
  test('should generate HTML for tags', () => {
    const tagsHtml = generateTagsHtml([TAG1, TAG2]);
    expect(tagsHtml).toContain(`<span class="green-tag">${TAG1}</span>`);
    expect(tagsHtml).toContain(`<span class="green-tag">${TAG2}</span>`);
  });

  test('should generate empty string for no tags', () => {
    const tagsHtml = generateTagsHtml([]).replace(/\n\s*/g, '').trim(); // trim whitespace
    expect(tagsHtml).toBe('');
  });
});

describe('generateHtmlContent', () => {
  test('should generate full HTML content with plugins HTML and style URI', () => {
    const htmlContent = generateHtmlContent(PLUGINS_HTML, styleUri);

    expect(htmlContent).toContain(STYLE_LINK);
    expect(htmlContent).toContain(PLUGINS_HTML);
    expect(htmlContent).toContain('<!DOCTYPE html>');
    expect(htmlContent).toContain('<title>IF Plugins</title>');
    expect(htmlContent).toContain('<body>');
    expect(htmlContent).toContain('</body>');
  });

  test('should include script for handling messages', () => {
    const htmlContent = generateHtmlContent(PLUGINS_HTML, styleUri);

    const expectedScript = `<script>
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
    </script>`;

    expect(htmlContent).toContain(expectedScript);
  });

  test('should handle empty plugins HTML', () => {
    const htmlContent = generateHtmlContent('', styleUri);

    expect(htmlContent).toContain(STYLE_LINK);
    expect(htmlContent).toContain('<!DOCTYPE html>');
    expect(htmlContent).toContain('<title>IF Plugins</title>');
    expect(htmlContent).toContain('<body>');
    expect(htmlContent).toContain('</body>');
  });
});

describe('generatePluginsListHtml', () => {
  test('should return HTML with "No Plugins Found" message when plugins list is empty', () => {
    const styleUri = vscode.Uri.parse('vscode-resource:/path/to/style.css');
    const htmlContent = generatePluginsListHtml([], styleUri);

    expect(htmlContent).toContain('<p>No Plugins Found.</p>');
  });
});
