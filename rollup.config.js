import { builtinModules } from 'module';
import { dependencies } from './package.json';
import babel from 'rollup-plugin-babel';
import commonJs from 'rollup-plugin-commonjs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';

const baseConfig = {
  input: 'src/JSendInterceptor.js',
  external: builtinModules.concat(Object.keys(dependencies)),
  plugins: [
    resolve({ preferBuiltins: true }),
    commonJs(),
    babel()
  ]
};

const config = [{
  ...baseConfig,
  output: {
    format: 'esm',
    file: path.join(__dirname, 'dist/JSendIterceptor.esm.js')
  }
}, {
  ...baseConfig,
  output: {
    format: 'cjs',
    file: path.join(__dirname, 'dist/JSendIterceptor.js'),
    exports: 'named'
  }
}];

export default config;
