const path = require('path')

function resolve_relative (dir) {
  return path.join(__dirname, '../../app/javascript/packs', dir)
}

module.exports = {
  resolve: {
    alias: {
      'components': resolve_relative('components'),
      'api': resolve_relative('api')
    }
  }
}
