import babel from 'rollup-plugin-babel';
import commonJs from 'rollup-plugin-commonjs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';

const baseConfig = {
  input: './src/JSendInterceptor.js',
  plugins: [
    resolve(),
    commonJs(),
    babel()
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
