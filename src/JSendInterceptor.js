import JSendError from './JSendError';

export function throwJSendError(response) {
  const { data, ...jsend } = response.data;
  Object.assign(response, { data, jsend });
  if (jsend.status === 'success') return response;
  if (jsend.status === 'fail') throw new JSendError('Request failed', response);
  throw new JSendError(`Request returned an error: ${jsend.message}`, response);
}

export default function apply(axios) {
  return axios.interceptors.response.use(
    res => throwJSendError(res),
    err => {
      if (!err.response || !err.response.data) throw err;
      if (err.response.data.status !== 'success') {
        return throwJSendError(err.response);
      }
      const { data, ...jsend } = err.response.data;
      Object.assign(err, { data, jsend });
      throw err;
    });
}

export { JSendError };
