'use strict';

/**
 * Links.js controller
 *
 * @description: A set of functions called "actions" for managing `Links`.
 */

module.exports = {

  /**
   * Retrieve links records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.links.search(ctx.query);
    } else {
      return strapi.services.links.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a links record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.links.fetch(ctx.params);
  },

  /**
   * Count links records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.links.count(ctx.query);
  },

  /**
   * Create a/an links record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.links.add(ctx.request.body);
  },

  /**
   * Update a/an links record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.links.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an links record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.links.remove(ctx.params);
  }
};
