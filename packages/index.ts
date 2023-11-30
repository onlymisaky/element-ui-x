import { PluginFunction } from 'vue';
import * as components from './components/index';
import { autoInstall } from './utils';

const install: PluginFunction<PluginOptions> = (Vue, options) => {
  Object.values(components as unknown as Record<string, IComp>)
    .forEach((component) => {
      if (component && typeof component.install === 'function') {
        component.install(Vue, options);
      }
    });
};

autoInstall(install);

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
