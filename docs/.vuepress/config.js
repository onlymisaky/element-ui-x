const fs = require('fs');
const path = require('path');
const { defineConfig } = require('vuepress/config');

function extractString(input) {
  const match = input.match(/\((.*?)\)$/);
  if (match) {
    return match[1] || input;
  } else {
    return input;
  }
}

function genSidebarItems(base, filepath) {
  return fs.readdirSync(filepath)
    .sort()
    .reduce((prev, current) => {
      if (current.toLowerCase() === 'readme.md' || current.toLowerCase() === 'data.json') {
        return prev;
      }
      if (/\.md$/.test(current)) {
        return [
          ...prev,
          base + current.replace(/\.md$/, '')
        ];
      }
      let title = current;
      const dataPath = path.resolve(filepath, current, 'data.json');
      if (fs.existsSync(dataPath)) {
        title = require(dataPath).title || current;
      }

      return [
        ...prev,
        {
          title,
          collapsable: false,
          children: genSidebarItems(base + current + '/', path.resolve(filepath, current))
        }
      ];
    }, []);
}

module.exports = defineConfig({
  title: 'ElementUIX',
  description: 'element-ui 增强版',
  sass:'',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com' },
    ],
    sidebar: {
      '/guide/': genSidebarItems('/guide/', path.resolve(__dirname, '../guide'))
    },
  },
});
