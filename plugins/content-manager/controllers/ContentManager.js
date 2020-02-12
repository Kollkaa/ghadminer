'use strict';
const _ = require('lodash');
const RSSCreator =require('./RssCreator');
/**
 * A set of functions called "actions" for `ContentManager`
 */

module.exports = {
  models: async ctx => {
    const pluginsStore = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'content-manager',
    });

    const models = await pluginsStore.get({ key: 'schema' });

    ctx.body = {
      models,
    };
  },

  find: async ctx => {
    // Search
    if (!_.isEmpty(ctx.request.query._q)) {
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].search(ctx.params, ctx.request.query);

      return;
    }

    // Default list with filters or not.
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].fetchAll(ctx.params, ctx.request.query);
  },

  count: async ctx => {
    // Search
    const count = !_.isEmpty(ctx.request.query._q)
      ? await strapi.plugins['content-manager'].services['contentmanager'].countSearch(ctx.params, ctx.request.query)
      : await strapi.plugins['content-manager'].services['contentmanager'].count(ctx.params, ctx.request.query);

    ctx.body = {
      count: _.isNumber(count) ? count : _.toNumber(count)
    };
  },

  findOne: async ctx => {
    const { source } = ctx.request.query;

    // Find an entry using `queries` system
    const entry = await strapi.plugins['content-manager'].services['contentmanager'].fetch(ctx.params, source, null, false);

    // Entry not found
    if (!entry) {
      return (ctx.notFound('Entry not found'));
    }

    ctx.body = entry;
  },

  create: async ctx => {
    const { source } = ctx.request.query;

    try {
      // Create an entry using `queries` system
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].add(ctx.params, ctx.request.body, source);

      strapi.emit('didCreateFirstContentTypeEntry', ctx.params, source);
    } catch(error) {
      strapi.log.error(error);
      ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: error.message, field: error.field }] }] : error.message);
    }


    let url = "mongodb://192.168.0.25:27017/app";
    let db = require("monk")(url);
    console.log("db_state", db._state);
    console.log("connecting....");
    let collection_news = db.get("novunu");
    let allNews = await collection_news.find({},{fields:{__v:0,date_publish:0,updatedAt:0}, sort: {createdAt: -1}});
    console.log(allNews);
    db.close();
    const testData = {
      feedData: {
        title: "Rss chanell Armed Forces of Ukraine",
        description: `Join us`,
        urlHome: `http://localhost:3000`,
        icon: `icon.jpg`,
        company: `Збройні сили України`,
        language: `ua`,
        pubDate: Date.now(),
      },
      news: allNews
    };
    const rss= new RSSCreator.RSSCreator(testData);
    rss.write();

  },

  update: async ctx => {
    const { source } = ctx.request.query;

    try {
      // Return the last one which is the current model.
      ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].edit(ctx.params, ctx.request.body, source);
    } catch(error) {
      // TODO handle error update
      strapi.log.error(error);
      ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: error.message, field: error.field }] }] : error.message);
    }
  },

  updateSettings: async ctx => {
    const { schema } = ctx.request.body;
    const pluginStore = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'content-manager'
    });
    await pluginStore.set({ key: 'schema', value: schema });

    return ctx.body = { ok: true };
  },

  delete: async ctx => {
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].delete(ctx.params, ctx.request.query);
    let url = "mongodb://192.168.0.25:27017/app";
    let db = require("monk")(url);
    console.log("db_state", db._state);
    console.log("connecting....");
    let collection_news = db.get("novunu");
    let allNews = await collection_news.find({},{fields:{__v:0,date_publish:0,updatedAt:0}, sort: {createdAt: -1}});
    console.log(allNews);
    db.close();

    const allNewsProcessed = allNews.map(item => {
      console.log(item)
      return {
        name: `${item.name}`,
        description: `${item.description}`,
        content: `${item.content}`,
        type: `${item.type}`,
        image: `${item.image}`,
        createdAt: `${item.createdAt}`,
      }
    })
    const testData = {
      feedData: {
        title: "Rss chanell Armed Forces of Ukraine",
        description: `Join us`,
        urlHome: `http://localhost:3000`,
        icon: `icon.jpg`,
        company: `Збройні сили України`,
        language: `ua`,
        pubDate: Date.now(),
      },
      news: allNewsProcessed
    };
    const rss= new RSSCreator.RSSCreator(testData);
    rss.write();
  },

  deleteAll: async ctx => {
    ctx.body = await strapi.plugins['content-manager'].services['contentmanager'].deleteMany(ctx.params, ctx.request.query);
  }
};
