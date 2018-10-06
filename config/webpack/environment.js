const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')
const aliasesConfig = require('./aliases')

environment.loaders.append('vue', vue)
environment.config.merge(aliasesConfig)

module.exports = environment


