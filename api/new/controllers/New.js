'use strict';

/**
 * New.js controller
 *
 * @description: A set of functions called "actions" for managing `New`.
 */

module.exports = {

  /**
   * Retrieve new records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, {populate} = {}) => {
    let url = "mongodb://192.168.0.25:27017/strapi";
    let db = require("monk")(url);
    let collection = db.get("new",{sort:{createdAt:-1}});
    let docs = await collection.find({},{fields:{__v:0,_id:0,date_publish:0,updatedAt:0,content:0,}});
    docs= docs.sort().reverse();
    db.close();
    ctx.send(docs);
  },

  /**
   * Retrieve a new record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.new.fetch(ctx.params);
  },

  /**
   * Count new records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.new.count(ctx.query);
  },

  /**
   * Create a/an new record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.new.add(ctx.request.body);
  },

  /**
   * Update a/an new record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.new.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an new record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.new.remove(ctx.params);
  },
  slider:async (ctx)=>{
    let url = "mongodb://192.168.0.25:27017/app";
    let db = require("monk")(url);
    console.log("db_state", db._state);
    console.log("connecting....");
    ctx.url
    let collection_news = db.get("new");


    let slider = await collection_news.find({type:"slider"},{fields:{__v:0,date_publish:0,content: 0,updatedAt:0}, sort: {createdAt: -1}, limit: 5});

    let collection_files = db.get("upload_file");


    for (let i = 0;i < slider.length;i++){
      console.log(slider[i]._id);

      let img = await collection_files.findOne({related: {$elemMatch: {ref: slider[i]._id}}});

      slider[i].imgRef = img;
    }

    console.log(slider);

    db.close();
    ctx.send(slider);
  },
  primary:async (ctx)=>{
    let url = "mongodb://192.168.0.25:27017/app";
    let db = require("monk")(url);
    console.log("db_state", db._state);
    console.log("connecting....");
    let collection2 = db.get("new",{sort : {createdAt: -1}});
    let primary=await collection2.find({type:"primary"},{fields:{__v:0,_id:0,date_publish:0,content: 0,updatedAt:0},limit:3});
    db.close();
    ctx.send(primary);
  },
  secondary:async (ctx)=>{
    let url = "mongodb://192.168.0.25:27017/app";
    let db = require("monk")(url);
    console.log("db_state", db._state);
    console.log("connecting....");
    let collection3 = db.get("new",{sort:{createdAt:-1}});
    let secondary;
    console.log(ctx.url);
    try {
      let ar=parseInt(ctx.url.split("=")[1]);
      if(ar.isNaN())
      { secondary=await collection3.find({type:'secondary'},{fields:{__v:0,_id:0,date_publish:0,content: 0,updatedAt:0},limit:25});
        console.log("try"+25);}
      else{
        console.log("try"+ar);
        secondary=await collection3.find({type:'secondary'},{fields:{__v:0,_id:0,date_publish:0,content:0,updatedAt: 0},limit:ar});
      }
    }catch (e) {

      secondary=await collection3.find({type:'secondary'},{fields:{__v:0,_id:0,date_publish:0,content: 0,updatedAt:0},limit:25});
      console.log("catch"+25);
    }


    db.close();
    ctx.send(secondary);

  },
  result: async (ctx) => {


    const fetch = require('isomorphic-fetch');
    let result="";
    let slider="";
    let primary="";
    let secondary="";
    console.log(ctx.url);
    try {
      let ar = parseInt(ctx.url.split("=")[1]);
      console.log('try'+ar);
      if (ar<5)
      {ar=25;}
      await fetch('http://192.168.0.231:1337/slider')
        .then(res => res.text())
        .then(text => slider = text);
      await fetch('http://192.168.0.231:1337/primary')
        .then(res => res.text())
        .then(text => primary = text);
      await fetch('http://192.168.0.231:1337/secondary/?limit='+ar)
        .then(res => res.text())
        .then(text => secondary = text);
    }
    catch(e){
      console.log('catch25');
      await fetch('http://192.168.0.231:1337/slider')
        .then(res => res.json())
        .then(text => slider = text);
      await fetch('http://192.168.0.231:1337/primary')
        .then(res => res.json())
        .then(text => primary = text);
      await fetch('http://192.168.0.231:1337/secondary')
        .then(res => res.json())
        .then(text => secondary = text);
    }

    result=[...JSON.parse(slider), ...JSON.parse(secondary), ...JSON.parse(primary)];
    console.log(result);
    ctx.send(result);
  }

};
