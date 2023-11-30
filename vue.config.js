const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.output.libraryExport('default');

    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('packages', path.resolve('packages'));

    config.module.rule('js').include.add(path.resolve('packages')).end();
  },
});
