require('dotenv')
const setupProxy = require('@fs/react-scripts/proxy/setupProxy')
const customProxies = require('../src/setupProxy').customProxies

module.exports = (router) => {
  setupProxy(router, customProxies)

  router.get('/dev-env', (req, res) => {
    res.status(200).send({ environment: process.env.TARGET_ENV || 'local' })
  })
}
