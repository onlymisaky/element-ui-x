import ElementUI from 'element-ui/lib/index';
import 'element-ui/lib/theme-chalk/index.css'

import ElementUIX from '../../lib/index.umd.min'
import '../../lib/index.css'

/**
 * @param {import('vue').VueConstructor} Vue VuePress 正在使用的 Vue 构造函数 
 * @param {Record<string, any>} options  附加到根实例的一些选项
 * @param {import('vue-router').default} router 当前应用的路由实例
 * @param {Record<string, any>} siteData 站点元数据
 * @param {Record<string, any>} isServer 当前应用配置是处于 服务端渲染 或 客户端
 */
const enhanceApp = ({ Vue, options, router, siteData, isServer }) => {
  Vue.use(ElementUI);
  Vue.use(ElementUIX);
}

export default enhanceApp;
