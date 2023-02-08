require('dotenv').config()
const path = require('path')
const { watchCoalesce } = require('@fs/react-scripts/scripts/coalesceLocales')

const paths = {
  appPath: process.cwd(),
  appSrc: path.join(process.cwd(), 'src'),
}

watchCoalesce(paths)

module.exports = async ({ config }) => {
  // https://github.com/storybooks/storybook/issues/457#issuecomment-459772340
  if (config.mode === 'development' && process.env.SOURCE_MAPS !== 'false') {
    config.devtool = 'inline-source-map'
  }

  // ability to turn off HMR with an envar
  if (process.env.DISABLE_HMR === 'true') {
    config.entry = config.entry.filter((singleEntry) => !singleEntry.includes('/webpack-hot-middleware/'))
  }

  // printRules(config.module.rules)
  return config
}

function printRules(rules) {
  rules.forEach((rule) => {
    if (rule.oneOf) {
      return printRules(rule.oneOf)
    }
    console.log('rule.test: ', rule.test && rule.test.toString())
    console.log('rule.include: ', rule.include && rule.include.toString())
    console.log('rule.exclude: ', rule.exclude && rule.exclude.toString())
    console.log('JSON.stringify(rule, null, 2): ', JSON.stringify(rule, null, 2))
    console.log('\n')
  })
}
