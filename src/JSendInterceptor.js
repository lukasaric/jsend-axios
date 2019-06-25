import JSend from 'jsend';
import JSendError from './JSendError';

const JSEND_FIELDS = ['status', 'code', 'data', 'message'];

export default function apply(axios) {
  return axios.interceptors.response.use(
    response => {
      if (!response.data) return response;
      if (!JSend.isValid(response.data)) return response;
      const { data, ...jsend } = pick(JSEND_FIELDS, response.data);
      if (jsend.status !== 'success') throw createError(response, { jsend, data });
      Object.assign(response, { jsend, data });
      return response;
    },
    err => {
      if (!err.response || !err.response.data) throw err;
      if (!JSend.isValid(err.response.data)) throw err;
      const { data, ...jsend } = pick(JSEND_FIELDS, err.response.data);
      if (jsend.status !== 'success') throw createError(err.response, { jsend, data });
      Object.assign(err, { jsend, data });
      throw err;
    });
}

export { JSendError };

function createError(response, { jsend, data }) {
  const options = { jsend, data, response };
  if (jsend.status === 'fail') {
    return new JSendError('Request failed', options);
  }
  return new JSendError(`Request returned an error: ${jsend.message}`, options);
}

function pick(props, obj) {
  return props.reduce((acc, key) => {
    if (!obj.hasOwnProperty(key)) return acc;
    return Object.assign(acc, { [key]: obj[key] });
  }, {});
}
