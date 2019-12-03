'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

const path = require('path');
const fs = require('fs');
const lodash = require('lodash');

module.exports = async cb => {
  // set plugin store
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'email'
  });

  strapi.plugins.email.config.providers = [];

  const loadProviders = (basePath, cb) => {
    fs.readdir(path.join(basePath, 'node_modules'), async (err, node_modules) => {
      // get all email providers
      const emails = lodash.filter(node_modules, (node_module) => {
        // DEPRECATED strapi-email-* will be remove in next version
        return lodash.startsWith(node_module, 'strapi-provider-email') || lodash.startsWith(node_module, 'strapi-email');
      });

      node_modules.filter((node_module) => {
        return node_module.startsWith('@');
      })
        .forEach((orga) => {
          const node_modules = fs.readdirSync(path.join(basePath, 'node_modules', orga));

          node_modules.forEach((node_module) => {
            // DEPRECATED strapi-email-* will be remove in next version
            if (lodash.startsWith(node_module, 'strapi-provider-email') || lodash.startsWith(node_module, 'strapi-email')) {
              emails.push(`${orga}/${node_module}`);
            }
          });
        });

      // mount all providers to get configs
      lodash.forEach(emails, (node_module) => {
        strapi.plugins.email.config.providers.push(
          require(path.join(`${basePath}/node_modules/${node_module}`))
        );
      });

      try {
        // if provider config not exist set one by default
        const config = await pluginStore.get({key: 'provider'});

        if (!config) {
          const provider = lodash.find(strapi.plugins.email.config.providers, {provider: 'sendmail'});

          const value = lodash.assign({}, provider, {
            // TODO: set other default settings here
          });

          await pluginStore.set({key: 'provider', value});
        }
      } catch (err) {
        strapi.log.error(`Can't load ${config.provider} email provider.`);
        strapi.log.warn(`Please install strapi-provider-email-${config.provider} --save in ${path.join(strapi.config.appPath, 'plugins', 'email')} folder.`);
        strapi.stop();
      }

      cb();
    });
  };

  // Load providers from the plugins' node_modules.
  loadProviders(path.join(strapi.config.appPath, 'plugins', 'email'), () => {
    // Load providers from the root node_modules.
    loadProviders(path.join(strapi.config.appPath), cb);
  });

};
