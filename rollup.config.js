import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-porter';

export default {
    input: 'src/LoaderWidget.js',
    output: { 
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        commonjs(),
        css({minified: false, dest: 'dist/scanex-loader-widget.css'}),
        babel({                
           extensions: ['.js', '.mjs'],
           exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
           include: ['src/**']
        }),
    ],
 };