'use strict';

/**
 * Menutab.js controller
 *
 * @description: A set of functions called "actions" for managing `Menutab`.
 */

module.exports = {

  /**
   * Retrieve menutab records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.menutab.search(ctx.query);
    } else {
      return strapi.services.menutab.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a menutab record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.menutab.fetch(ctx.params);
  },

  /**
   * Count menutab records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.menutab.count(ctx.query);
  },

  /**
   * Create a/an menutab record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.menutab.add(ctx.request.body);
  },

  /**
   * Update a/an menutab record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.menutab.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an menutab record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.menutab.remove(ctx.params);
  }
};
