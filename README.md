# jsend-axios

[![build status](https://badgen.net/travis/lukasaric/jsend-axios/master)](https://travis-ci.com/lukasaric/jsend-axios) [![codecov coverage](https://badgen.net/codecov/c/github/lukasaric/jsend-axios/master)](https://codecov.io/gh/lukasaric/jsend-axios) [![install size](https://badgen.net/packagephobia/install/jsend-axios)](https://packagephobia.now.sh/result?p=jsend-axios) [![npm package version](https://badgen.net/npm/v/jsend-axios)](https://npm.im/jsend-axios) [![github license](https://badgen.net/github/license/lukasaric/jsend-axios)](https://github.com/lukasaric/jsend-axios/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

<<<<<<< HEAD
JSend interceptor provides custom client response handling using [`axios#interceptor`](https://github.com/axios/axios#interceptors) for [`jsend`](https://www.npmjs.com/package/jsend) package.
It, also normalizes response by reassigning response `data` property.
=======
[JSend](https://github.com/omniti-labs/jsend#readme) interceptor provides custom client response handling using [`axios#interceptor`](https://github.com/axios/axios#interceptors) for [`jsend`](https://www.npmjs.com/package/jsend) Express middleware package.
>>>>>>> bdbd20ea9e569b889c2ecc551c9a4954cc53569b

## Installation :books:

```
npm install jsend-axios
```

## Usage

```js
import axios from 'axios';
import JSendInterceptor from 'jsend-axios';

const client = axios.create();
JSendInterceptor(client);
```
