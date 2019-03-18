var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://dev.api.peopleware.io/saving/"',
  ROOT_API_COMMON: '"http://dev.api.peopleware.io/common/"',
  AUTH_URL: '"http://localhost:5000/"',
  LOGOUT_URL: '"http://dev.stamp.peopleware.io"',
  FORDOCS: '"http://dev.api.peopleware.io/document"',
  PROJECT: '"CAAH"'
})
