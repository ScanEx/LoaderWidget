import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-porter';

export default {
    input: pkg.module,
    output: { 
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        resolve({ dedupe: ['core-js'] }),
        commonjs(),
        css({dest: 'dist/scanex-loader-widget.css', minified: false}),
        babel({                
           extensions: ['.js', '.mjs'],
           exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
           include: ['src/**']
        }),
    ],
 };