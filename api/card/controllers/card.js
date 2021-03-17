'use strict'
const { parseMultipartData, sanitizeEntity } = require('strapi-utils')
const { logger } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities
    logger.info('hello -------------')

    if (ctx.query._q) {
      entities = await strapi.services.card.search(ctx.query)
    } else {
      entities = await strapi.services.card.find(ctx.query)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.card })
    )
  },

  async vote(ctx) {
    const { id } = ctx.params
    logger.info('multipart', ctx.is('multipart'))
    let entity

    entity = await strapi.services.card.update({ id }, { $inc: { votes: 1 } })

    return sanitizeEntity(entity, { model: strapi.models.card })
  },
}
