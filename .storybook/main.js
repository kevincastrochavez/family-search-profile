require('dotenv').config()
const path = require('path')

process.env.STORYBOOK = true
module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.js'],
  managerWebpack: async (config) => {
    // Update config here
    config.resolve.alias = {
      ...config.resolve.alias,
      '/coalesced-locales': path.resolve(path.join(process.cwd(), 'src/locales/')),
    }
    // console.log('managerWebpack', config, options)
    return config
  },
  webpackFinal: async (config) => {
    // Update config here
    config.resolve.alias = {
      ...config.resolve.alias,
      '/coalesced-locales': path.resolve(path.join(process.cwd(), 'src/locales/')),
    }
    // console.log('webpackFinal', config, options)
    return config
  },
  addons: [
    // Contains docs, actions, controls, viewport, toolbar, and globals
    '@storybook/addon-essentials',

    '@storybook/preset-create-react-app',
    '@storybook/addon-a11y',
    '@storybook/addon-links',

    '@fs/storybook-addons/dist/grid',
    '@fs/storybook-addons/dist/locale-switcher',
    '@fs/storybook-addons/dist/sign-in',
    '@fs/storybook-addons/dist/env',
    // '@fs/storybook-addons/dist/theme-switcher',
  ],

  // make config variables (used in fs-config) available to storybook stories
  // if the env file is set up properly
  previewHead: (head) =>
    process.env.TARGET_ENV
      ? `
    ${head}
    <script>
      window.SERVER_DATA = {
        targetEnv: "${process.env.TARGET_ENV}",
        baseUrl: "${process.env.BASE_URL}",
        sgBaseUrl: "${process.env.SG_BASE_URL}",
        splitioAuthKey: "${process.env.SPLITIO_AUTH_KEY}"
      };
    </script>
  `
      : head,
}
