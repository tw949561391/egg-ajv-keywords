'use strict';
const buildAjv = require('./lib/ajv');
module.exports = agent => {
  const useAgent = agent.config.ajv.agent;
  if (useAgent) buildAjv(agent);
};
