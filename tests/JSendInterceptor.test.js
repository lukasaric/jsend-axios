/* eslint-disable no-undef */
import axios from 'axios';
import JSendInterceptor from '../src/JSendInterceptor';
import nock from 'nock';

const BASE_URL = 'http://example.com';

const axiosConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
};

function responseInterceptor(client) {
  client.interceptors.response.use(res => JSendInterceptor(res), err => Promise.reject(err));
}

describe('JSend axios interceptor', () => {
  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  describe('Response with JSend status `success`', () => {
    it('Should return successful response with data and status', done => {
      const client = axios.create(axiosConfig);
      nock('http://example.com')
        .get('/test')
        .reply(200, { data: 'foo', status: 'success' });

      responseInterceptor(client);

      client.get('http://example.com/test')
        .then(res => {
          expect(res.jsend.status).toBe('success');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `fail`', () => {
    it('Should return failed response with data and status', done => {
      const client = axios.create(axiosConfig);
      nock('http://example.com')
        .get('/test')
        .reply(200, { data: 'foo', status: 'fail' });

      responseInterceptor(client);

      client.get('http://example.com/test')
        .catch(err => {
          expect(err.jsend.status).toBe('fail');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `error`', () => {
    it('Should return error response with status and message (code and data optional)', done => {
      const client = axios.create(axiosConfig);
      nock('http://example.com')
        .get('/test')
        .reply(200, { data: false, status: 'error', message: 'Something went wrong!', code: 404 });

      responseInterceptor(client);

      client.get('http://example.com/test')
        .catch(err => {
          expect(err.jsend.status).toBe('error');
          done();
        }, done.fail);
    });
  });
});
