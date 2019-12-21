'use strict';

/**
 * Родивійськ.js controller
 *
 * @description: A set of functions called "actions" for managing `Родивійськ`.
 */

module.exports = {

  /**
   * Retrieve родивійськ records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.родивійськ.search(ctx.query);
    } else {
      return strapi.services.родивійськ.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a родивійськ record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.родивійськ.fetch(ctx.params);
  },

  /**
   * Count родивійськ records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.родивійськ.count(ctx.query);
  },

  /**
   * Create a/an родивійськ record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.родивійськ.add(ctx.request.body);
  },

  /**
   * Update a/an родивійськ record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.родивійськ.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an родивійськ record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.родивійськ.remove(ctx.params);
  }
};
