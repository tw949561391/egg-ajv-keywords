'use strict';
module.exports = {
  async validate(schema, value) {
    let params = null;
    if (value) {
      params = value;
    } else {
      params = Object.assign({}, this.params || {}, this.request.query || {}, this.request.body || {});
    }
    const res = await this.app.ajv.validate(schema, value || params);
    if (!res) {
      const e = new Error('invalid_param');
      e.data = {
        code: 'invalid_param',
        errors: this.app.ajv.errors,
      };
      throw e;
    }
    return params;
  },
};
