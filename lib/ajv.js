'use strict';
const Ajv = require('ajv');
const AjvSchema = require('ajv-merge-patch');
const join = require('path').join;
const AjvAsync = require('ajv-async');
const AjvKeywords = require('ajv-keywords');

module.exports = app => {
  app.coreLogger.info('[egg-ajv-keyword] satrt  init');
  const config = app.config.ajv || {};
  const keyword = config.schema || 'schema';
  const ajv = AjvAsync(new Ajv(config));
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
  app.loader.loadToApp(join(app.baseDir, `app/${keyword}`), keyword, {
    initializer(exp, { path, pathName }) {
      app.coreLogger.debug(`schema init success ${path}`);
      ajv.addSchema(Object.assign({ $id: pathName }, exp), pathName);
      return exp;
    },
  });
  app.beforeStart(function() {
    AjvSchema(ajv);
    AjvKeywords(ajv);
  });
  app.ajv = ajv;
};
