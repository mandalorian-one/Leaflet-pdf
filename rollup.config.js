import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const external = ['leaflet', 'jspdf', 'changedpi'];

const esConfig = {
    input: 'src/js/Leaflet.ImagePdf.js',
    output: {
        file: 'dist/Leaflet.ImagePdf.esm.js',
        format: 'esm',
        inlineDynamicImports: true
    },
    external,
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
    ]
};

// Конфигурация для UMD модуля
const umdConfig = {
    input: 'src/js/Leaflet.ImagePdf.js',
    output: {
        file: 'dist/Leaflet.ImagePdf.umd.js',
        format: 'umd',
        name: 'Leaflet.ImagePdf',
        inlineDynamicImports: true
    },
    external,
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
    ]
};

const umdConfigMin = {
    input: 'src/js/Leaflet.ImagePdf.js',
    output: {
        file: 'dist/Leaflet.ImagePdf.umd.min.js',
        format: 'umd',
        name: 'Leaflet.ImagePdf',
        inlineDynamicImports: true,
        sourcemap: true
    },
    external,
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        terser({
            format: {
                comments: false
            }
        })
    ]
}
export default [esConfig, umdConfig, umdConfigMin];
