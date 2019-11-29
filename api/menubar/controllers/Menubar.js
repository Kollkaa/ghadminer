'use strict';

/**
 * Menubar.js controller
 *
 * @description: A set of functions called "actions" for managing `Menubar`.
 */

module.exports = {

  /**
   * Retrieve menubar records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.menubar.search(ctx.query);
    } else {
      return strapi.services.menubar.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a menubar record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.menubar.fetch(ctx.params);
  },

  /**
   * Count menubar records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.menubar.count(ctx.query);
  },

  /**
   * Create a/an menubar record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.menubar.add(ctx.request.body);
  },

  /**
   * Update a/an menubar record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.menubar.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an menubar record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.menubar.remove(ctx.params);
  }
};
