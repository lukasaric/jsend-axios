/* eslint-env jest */

import axios from 'axios';
import jsend from 'jsend';
import JSendInterceptor from '..';
import nock from 'nock';

const BASE_URL = 'https://example.com';

function responseInterceptor(client) {
  client.interceptors.response.use(res => JSendInterceptor(res), err => Promise.reject(err));
}

describe('JSend axios interceptor', () => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  });
  responseInterceptor(client);

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('Response with JSend status `success`', () => {
    it('Should return successful response with data and status', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, jsend.success('foo'));

      client.get('/test')
        .then(res => {
          expect(res.jsend.status).toBe('success');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `fail`', () => {
    it('Should return failed response with data and status', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, jsend.fail('foo'));

      client.get('/test')
        .catch(err => {
          expect(err.jsend.status).toBe('fail');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `error`', () => {
    it('Should return error response with status and message (code and data optional)', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, jsend.error({ message: 'Something went wrong!', code: 404 }));

      client.get('/test')
        .catch(err => {
          expect(err.jsend.status).toBe('error');
          done();
        }, done.fail);
    });
  });
});
