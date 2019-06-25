/* eslint-env jest */

import axios from 'axios';
import JSend from 'jsend';
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
    it('Should return successful response with JSend status and data attached', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, JSend.success('foo'));

      client.get('/test')
        .then(res => {
          expect(res.jsend.status).toBe('success');
          expect(res.data).toBe('foo');
          done();
        }, done.fail);
    });
  });

  describe('Response with JSend status `fail`', () => {
    it('Should throw JSendError with status `fail`', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, JSend.fail('foo'));

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
    it('Should throw JSendError with status `error` and original error message', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, JSend.error({ message: 'Something went wrong!', code: 404 }));

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

  describe('Invalid JSend payload', () => {
    it('Should pass-through http response', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(200, { data: 'foo' });

      client.get('/test')
        .then(res => {
          expect(res).not.toHaveProperty('jsend');
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and JSend status `success`', () => {
    it('Should throw AxiosError with JSend status and data attached', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, JSend.success('foo'));

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
    it('Should throw JSendError with status `fail`', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, JSend.fail('foo'));

      client.get('/test')
        .catch(err => {
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('fail');
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and JSend status `error`', () => {
    it('Should throw JSendError with status `error` and original error message', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, JSend.error({ message: 'Something went wrong!', code: 400 }));

      client.get('/test')
        .catch(err => {
          expect(err).toBeInstanceOf(JSendError);
          expect(err.jsend.status).toBe('error');
          done();
        }, done.fail);
    });
  });

  describe('Response with http error status and invalid JSend payload', () => {
    it('Should pass-through http error', done => {
      nock(BASE_URL)
        .get('/test')
        .reply(400, { data: 'foo' });

      client.get('/test')
        .catch(err => {
          expect(err.isAxiosError).toBe(true);
          expect(err).not.toHaveProperty('jsend');
          done();
        }, done.fail);
    });
  });
});
