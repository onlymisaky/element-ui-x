import { VueConstructor, PluginObject } from 'vue';

declare global {

  interface IComponentWithInstall<T> extends VueConstructor, PluginObject<T> {

  }

  interface PluginOptions {
    namespace: string
  }

  interface IComp extends IComponentWithInstall<PluginOptions> {

  }

}

export { };
