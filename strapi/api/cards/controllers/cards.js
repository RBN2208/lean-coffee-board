'use strict'

const { parseMultipartData, sanitizeEntity } = require('strapi-utils')

module.exports = {
  async vote(ctx) {
    const { id } = ctx.params

    const card = await strapi.services.cards.update(
      { id },
      { $inc: { votes: 1 } }
    )

    return sanitizeEntity(card, { model: strapi.models.cards })
  },
}
