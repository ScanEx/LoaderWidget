import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-porter';
import pkg from './package.json';

export default [
  {
    input: 'src/LoaderWidget.js',
    output: { 
        file: pkg.module,
        format: 'cjs',
    },
    plugins: [
        resolve({ jsnext: true, main: false, module: true, browser: false }),
        commonjs(),
        css({minified: false, dest: 'dist/scanex-loader-widget.css'}),
        babel(),
    ],
 },
 {
    input: 'src/LoaderWidget.js',
    output: { 
        file: pkg.main,
        format: 'esm',
    },
    plugins: [
        resolve({ jsnext: true, main: true, module: false, browser: false }),
        css({minified: false, dest: 'dist/scanex-loader-widget.css'}),
    ],
 },
];