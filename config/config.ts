import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  title: 'Fiskalizimi',
  extraPostCSSPlugins: [
    require('postcss-import')
  ],
  404: true
});
