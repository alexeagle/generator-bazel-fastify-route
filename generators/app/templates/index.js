'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('<%= routePath %>', function (req, reply) {
    return 'It Works!'
  })
}
