import { PluginFunction, VueConstructor } from 'vue';

export function markInstall(component: VueConstructor) {
  // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
  (component as IComp).install = (Vue, options) => {
    Vue.component(component.name, component);
  };

  return component as IComp;
}

export function autoInstall(install: PluginFunction<PluginOptions>) {
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
}
