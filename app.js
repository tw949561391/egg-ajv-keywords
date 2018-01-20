'use strict';
const buildAjv = require('./lib/ajv');
module.exports = app => {
  buildAjv(app);
};
