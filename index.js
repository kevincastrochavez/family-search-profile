/* eslint-disable global-require */
if (!process.env.STORYBOOK) {
  // This file is meant to be run by Heroku. It can be run locally
  // by typing `heroku local` on the command line.

  // You should not need to modify this file.
  // Changes to proxies should be done in setupProxy.js
  // Changes to routes should be done in server.js

  // sets local proxies using http-proxy-middleware configs
  // Docs here: https://www.familysearch.org/frontier/docs/develop/proxies
  const setProxies = require('@fs/react-scripts/proxy/setupProxy')
  const customProxies = require('./src/setupProxy').customProxies
  const app = require('./server')()

  // If in development mode i.e. locally
  if (app.get('env') === 'development') {
    app.stack.front(() => {
      // Sets up local proxies for XHR calls.
      //      e.g. /service/tree/tf => https://beta.familysearch.org/service/tree/tf
      //      beta above comes from your .env file
      setProxies(app, customProxies)
    })
  }

  module.exports = app
}
