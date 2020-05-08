import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-porter';

export default {
    input: 'src/LoaderWidget.js',
    output: { 
        file: pkg.module,
        format: 'cjs',
    },
    plugins: [
        resolve(),
        commonjs(),
        json(),
        css({minified: false, dest: 'dist/scanex-loader-widget.css'}),
        babel({                
           extensions: ['.js', '.mjs'],
           exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
           include: ['src/**']
        }),
    ],
 };