import enhanceError from 'axios/lib/core/enhanceError';

class JSendError extends Error {
  constructor(message, { jsend, data, response }) {
    super(message);
    const { config, request } = response;
    const { toJSON, ...info } = enhanceError({}, config, null, request, response);
    Object.assign(this, info, {
      jsend,
      data,
      toJSON() {
        const json = toJSON.call(this);
        return Object.assign(json, { jsend, data });
      }
    });
  }

  get name() {
    return this.constructor.name;
  }

  get isJSendError() {
    return true;
  }
}

export default JSendError;
