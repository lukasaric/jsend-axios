import babel from 'rollup-plugin-babel';
import { builtinModules } from 'module';
import commonJs from 'rollup-plugin-commonjs';
import path from 'path';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';

const baseConfig = {
  input: './src/JSendInterceptor.js',
  external: Object.keys(pkg.dependencies).concat(builtinModules),
  plugins: [
    resolve(),
    commonJs(),
    babel({ exclude: 'node_modules/**' })
  ]
};

/** @type {Array<import('rollup').RollupOptions>} */
const config = [{
  ...baseConfig,
  output: {
    format: 'esm',
    file: path.join(__dirname, 'dist/JSendInterceptor.esm.js')
  }
}, {
  ...baseConfig,
  output: {
    format: 'cjs',
    file: path.join(__dirname, 'dist/JSendInterceptor.js'),
    exports: 'named'
  }
}];

export default config;
