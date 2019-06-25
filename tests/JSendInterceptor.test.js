/* eslint-env jest */

import axios from 'axios';
import jsend from 'jsend';
import JSendInterceptor, { JSendError } from '..';
import nock from 'nock';

const BASE_URL = 'https://example.com';

describe('JSend axios interceptor', () => {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  });
  JSendInterceptor(client);

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
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('fail');
          expect(err.message).toBe('Request failed');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `error`', () => {
    it('Should return error response with status and message (code and data optional)', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, jsend.error({ message: 'Something went wrong!', code: 404, data: false }));

      client.get('/test')
        .catch(err => {
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('error');
          expect(err.message).toBe('Request returned an error: Something went wrong!');
          done();
        }, done.fail);
    });
  });

  describe('Network error', () => {
    it('Should pass-through network error', done => {
      nock(BASE_URL)
        .get('/test')
        .replyWithError('Network error');

      client.get('/test')
        .catch(err => {
          expect(err.isAxiosError).toBe(true);
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and JSend status `success`', () => {
    it('Should throw error with `jsend` status and data', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, jsend.success('foo'));

      client.get('/test')
        .catch(err => {
          expect(err.isAxiosError).toBe(true);
          expect(err.jsend.status).toBe('success');
          expect(err.data).toBe('foo');
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and JSend status `fail`', () => {
    it('Should throw error with `jsend` status and data', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, jsend.fail('foo'));

      client.get('/test')
        .catch(err => {
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('fail');
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and JSend status `error`', () => {
    it('Should throw error with `jsend` status and message (code and data optional)', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, jsend.error({ message: 'Something went wrong!', code: 400, data: false }));

      client.get('/test')
        .catch(err => {
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('error');
          done();
        }, done.fail);
    });
  });
});
