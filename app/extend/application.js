'use strict';
module.exports = {
  async validate(schema, value) {
    const res = await this.ajv.validate(schema, value);
    if (!res) {
      const e = new Error('invalid_param');
      e.data = {
        code: 'invalid_param',
        errors: this.ajv.errors,
      };
      throw e;
    }
    return value;
  },
};
