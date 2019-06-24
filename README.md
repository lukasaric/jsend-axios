# {{name}}
[![build status](https://badgen.net/travis/lukasaric/{{name}}/master)](https://travis-ci.com/lukasaric/{{name}}) [![install size](https://badgen.net/packagephobia/install/{{name}})](https://packagephobia.now.sh/result?p=jsend-axios) [![npm package version](https://badgen.net/npm/v/{{name}})](https://npm.im/{{name}}) [![github license](https://badgen.net/github/license/lukasaric/{{name}})](https://github.com/lukasaric/{{name}}/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

JSend interceptor provides custom client response handling using `axios.interceptor` for [jsend](https://www.npmjs.com/package/jsend) package.
It, also normalizes response by reassigning response `data` property even if `jsend` is not implemented yet.


## Run
```
npm install {{name}}
```

## Usage
```
import axios from 'axios';
import jsendAxios from '{{name}}';

const client = axios.create();

client.interceptors.response.use(res => JSendInterceptor(res), err => {
  Promise.reject(err);
});
```
