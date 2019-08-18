// rollup.config.js
import sass from 'rollup-plugin-sass';
import sucrase from 'rollup-plugin-sucrase';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: ['src/renderer.js', 'src/main.js'],
    output: {
        dir: 'build',
        format: 'cjs',
    },
    plugins: [
        /**
         * rewrite imports to node_modules/{lib_name}
         */
        resolve({
            preferBuiltins: false,
            dedupe: ['react', 'react-dom'],
            only: ['(!?electron)']
        }),
        /**
         * Tell rollup that these are in commonjs format 
         */
        commonjs({
            include: 'node_modules/**',  // Default: undefined
        }),
        /**
         * insert sass imports to the bundle
         */
        sass({
            insert: true
        }),
        /**
         * transform code from jsx to commonjs
         */
        sucrase({
            exclude: ['node_modules/**'],
            transforms: ['jsx']
        }),
    ],
    externals: [
        'fs',
        'path'
    ]
}