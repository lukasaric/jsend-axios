# jsend-axios
[![build status](https://badgen.net/travis/lukasaric/jsend-axios/master)](https://travis-ci.com/lukasaric/jsend-axios) [![install size](https://badgen.net/packagephobia/install/jsend-axios)](https://packagephobia.now.sh/result?p=jsend-axios) [![npm package version](https://badgen.net/npm/v/jsend-axios)](https://npm.im/jsend-axios) [![github license](https://badgen.net/github/license/lukasaric/jsend-axios)](https://github.com/lukasaric/jsend-axios/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

JSend interceptor provides custom client response handling using `axios.interceptor` for [jsend](https://www.npmjs.com/package/jsend) package.
It, also normalizes response by reassigning response `data` property even if `jsend` is not implemented yet.


## Run
```
npm install jsend-axios
```

## Usage
```
import axios from 'axios';
import JSendInterceptor from 'jsend-axios';

const client = axios.create();

client.interceptors.response.use(res => JSendInterceptor(res), err => {
  Promise.reject(err);
});
```
