'use strict';

/**
 * Menuside.js controller
 *
 * @description: A set of functions called "actions" for managing `Menuside`.
 */

module.exports = {

  /**
   * Retrieve menuside records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.menuside.search(ctx.query);
    } else {
      return strapi.services.menuside.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a menuside record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.menuside.fetch(ctx.params);
  },

  /**
   * Count menuside records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.menuside.count(ctx.query);
  },

  /**
   * Create a/an menuside record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.menuside.add(ctx.request.body);
  },

  /**
   * Update a/an menuside record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.menuside.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an menuside record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.menuside.remove(ctx.params);
  }
};
